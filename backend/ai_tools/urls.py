from django.urls import path

from .views import GenerateEmailView, RewriteEmailView, SummarizeEmailView, SpamCheckView

urlpatterns = [
    path('generate-email/', GenerateEmailView.as_view(), name='generate-email'),
    path('rewrite/', RewriteEmailView.as_view(), name='rewrite-email'),
    path('summarize/', SummarizeEmailView.as_view(), name='summarize-email'),
    path('spam-check/', SpamCheckView.as_view(), name='spam-check'),
]
