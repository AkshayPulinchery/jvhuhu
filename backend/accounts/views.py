from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from django.shortcuts import get_object_or_404

from .serializers import RegisterSerializer, UserSerializer, PublicKeySerializer

User = get_user_model()


class RegisterView(APIView):
    """
    POST /api/auth/register/
    Creates a new user and returns JWT tokens.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.save()

        # Issue tokens immediately so the frontend can log the user in right away
        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Account created successfully.',
            'user': UserSerializer(user).data,
            'tokens': {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    """
    POST /api/auth/login/
    Accepts email + password, returns JWT access and refresh tokens.
    """
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()

        if not email or not password:
            return Response(
                {'error': 'Both email and password are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Look up the user by email, then authenticate using username
        try:
            user_obj = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(request, username=user_obj.username, password=password)
        if user is None:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)
        return Response({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        })


class MeView(APIView):
    """
    GET /api/auth/me/
    Returns the currently logged-in user's profile.
    Requires: Authorization: Bearer <access_token>
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class PublicKeyView(APIView):
    """
    GET /api/users/public-key/<email>/
    Returns a user's public key so the sender can encrypt an email for them.
    No authentication required — public keys are meant to be public.
    """
    permission_classes = [AllowAny]

    def get(self, request, email):
        user = get_object_or_404(User, email=email)
        return Response(PublicKeySerializer(user).data)
