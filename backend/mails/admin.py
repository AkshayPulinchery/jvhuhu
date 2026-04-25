from django.contrib import admin

from .models import Email


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    list_display = ['sender', 'receiver', 'is_read', 'expires_at', 'created_at']
    list_filter = ['is_read']
    search_fields = ['sender__email', 'receiver__email']
    readonly_fields = ['sender', 'receiver', 'created_at']
    # subject_encrypted and body_encrypted are intentionally excluded from list_display
    # to avoid accidentally displaying encrypted blobs in the admin UI
