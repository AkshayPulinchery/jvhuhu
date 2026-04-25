from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ['username', 'email', 'is_staff', 'created_at']
    search_fields = ['username', 'email']
    # Add our custom fields to the edit form
    fieldsets = UserAdmin.fieldsets + (
        ('CuteMail', {'fields': ('public_key',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('CuteMail', {'fields': ('email', 'public_key')}),
    )
