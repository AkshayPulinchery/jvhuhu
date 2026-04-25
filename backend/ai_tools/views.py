from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .services import generate_email, rewrite_email, summarize_email, spam_check


class GenerateEmailView(APIView):
    """
    POST /api/ai/generate-email/
    Body: { "prompt": "...", "tone": "formal" }
    Returns: { "subject": "...", "body": "..." }
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get('prompt', '').strip()
        tone = request.data.get('tone', 'professional').strip()

        if not prompt:
            return Response({'error': '"prompt" is required.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(generate_email(prompt, tone))


class RewriteEmailView(APIView):
    """
    POST /api/ai/rewrite/
    Body: { "text": "...", "tone": "professional" }
    Returns: { "rewritten": "..." }
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get('text', '').strip()
        tone = request.data.get('tone', 'professional').strip()

        if not text:
            return Response({'error': '"text" is required.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(rewrite_email(text, tone))


class SummarizeEmailView(APIView):
    """
    POST /api/ai/summarize/
    Body: { "text": "..." }
    Returns: { "summary": "..." }

    Note: The frontend decrypts the email first, then sends the plaintext here.
    This text is NOT stored anywhere — it is processed and discarded.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get('text', '').strip()

        if not text:
            return Response({'error': '"text" is required.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(summarize_email(text))


class SpamCheckView(APIView):
    """
    POST /api/ai/spam-check/
    Body: { "text": "..." }
    Returns: { "is_spam": bool, "confidence": 0-100, "reason": "..." }

    Note: Same as summarize — text is processed in memory and never stored.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        text = request.data.get('text', '').strip()

        if not text:
            return Response({'error': '"text" is required.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(spam_check(text))
