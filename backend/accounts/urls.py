from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, LoginView, MeView, PublicKeyView

urlpatterns = [
    # Auth endpoints — mounted at /api/
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/me/', MeView.as_view(), name='me'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Public key lookup — mounted at /api/
    path('users/public-key/<str:email>/', PublicKeyView.as_view(), name='public-key'),
]
