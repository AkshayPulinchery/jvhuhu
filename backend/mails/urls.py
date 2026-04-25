from django.urls import path

from .views import SendEmailView, InboxView, SentView, EmailDetailView, MarkReadView

urlpatterns = [
    path('send/', SendEmailView.as_view(), name='send-email'),
    path('inbox/', InboxView.as_view(), name='inbox'),
    path('sent/', SentView.as_view(), name='sent'),
    path('<int:pk>/', EmailDetailView.as_view(), name='email-detail'),
    path('<int:pk>/read/', MarkReadView.as_view(), name='mark-read'),
]
