
from django.db import models
from django.conf import settings


class Email(models.Model):
    """
    Stores a single encrypted email.

    IMPORTANT — zero-knowledge rules:
      - subject_encrypted and body_encrypted are opaque blobs from the frontend.
      - encrypted_key is the per-email symmetric key wrapped with the receiver's public key.
      - The backend NEVER decrypts any of these fields.
      - The backend NEVER logs their contents.
    """
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='sent_emails',
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='received_emails',
    )

    # Encrypted blobs — treated as opaque strings by the backend
    subject_encrypted = models.TextField()
    body_encrypted = models.TextField()
    encrypted_key = models.TextField()  # symmetric key encrypted with receiver's public key

    is_read = models.BooleanField(default=False)
    expires_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.sender.email} → {self.receiver.email} ({self.created_at:%Y-%m-%d %H:%M})"
