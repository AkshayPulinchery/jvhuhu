"""
CuteMail URL Configuration
==========================
All API routes are under /api/.

Auth & users:   /api/auth/...  and  /api/users/...  (accounts app)
Mails:          /api/mails/...                       (mails app)
AI tools:       /api/ai/...                          (ai_tools app)
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # accounts app handles both /api/auth/ and /api/users/ routes
    path('api/', include('accounts.urls')),

    path('api/mails/', include('mails.urls')),
    path('api/ai/', include('ai_tools.urls')),
]
