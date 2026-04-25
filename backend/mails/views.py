from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from .models import Email
from .serializers import SendEmailSerializer, EmailSerializer

User = get_user_model()


class SendEmailView(APIView):
    """
    POST /api/mails/send/
    Store an encrypted email. The backend only saves the encrypted blobs —
    it never inspects subject_encrypted or body_encrypted.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SendEmailSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        receiver = User.objects.filter(email=data['receiver_email']).first()
        if not receiver:
            return Response(
                {'error': f"No user found with email '{data['receiver_email']}'."},
                status=status.HTTP_404_NOT_FOUND
            )

        email = Email.objects.create(
            sender=request.user,
            receiver=receiver,
            subject_encrypted=data['subject_encrypted'],
            body_encrypted=data['body_encrypted'],
            encrypted_key=data['encrypted_key'],
            expires_at=data.get('expires_at'),
        )
        return Response(EmailSerializer(email).data, status=status.HTTP_201_CREATED)


class InboxView(APIView):
    """
    GET /api/mails/inbox/
    Returns all emails received by the logged-in user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        emails = Email.objects.filter(receiver=request.user)
        return Response(EmailSerializer(emails, many=True).data)


class SentView(APIView):
    """
    GET /api/mails/sent/
    Returns all emails sent by the logged-in user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        emails = Email.objects.filter(sender=request.user)
        return Response(EmailSerializer(emails, many=True).data)


class EmailDetailView(APIView):
    """
    GET  /api/mails/<id>/   — fetch a single email
    DELETE /api/mails/<id>/ — delete it (sender or receiver)
    """
    permission_classes = [IsAuthenticated]

    def _get_authorized_email(self, pk, user):
        """Return the email if the user is sender or receiver, else 403."""
        email = get_object_or_404(Email, pk=pk)
        if email.sender != user and email.receiver != user:
            return None, Response(
                {'error': 'You do not have permission to access this email.'},
                status=status.HTTP_403_FORBIDDEN
            )
        return email, None

    def get(self, request, pk):
        email, err = self._get_authorized_email(pk, request.user)
        if err:
            return err
        return Response(EmailSerializer(email).data)

    def delete(self, request, pk):
        email, err = self._get_authorized_email(pk, request.user)
        if err:
            return err
        email.delete()
        return Response({'message': 'Email deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


class MarkReadView(APIView):
    """
    PATCH /api/mails/<id>/read/
    Only the receiver can mark an email as read.
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        email = get_object_or_404(Email, pk=pk)

        if email.receiver != request.user:
            return Response(
                {'error': 'Only the receiver can mark this email as read.'},
                status=status.HTTP_403_FORBIDDEN
            )

        email.is_read = True
        email.save(update_fields=['is_read'])
        return Response({'message': 'Marked as read.', 'is_read': True})
