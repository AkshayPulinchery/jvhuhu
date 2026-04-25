from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model.
    Stores the user's public key for post-quantum encryption.
    NEVER store or accept a private key here.
    """
    # Make email unique so we can use it to log in
    email = models.EmailField(unique=True)

    # Public key submitted by the frontend during registration
    # This is used by senders to encrypt emails for this user
    public_key = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
