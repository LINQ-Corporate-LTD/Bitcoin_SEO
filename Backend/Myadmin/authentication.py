"""
attendees/authentication.py

Optional: JWT Authentication class for protecting other API endpoints.
Use this as the authentication backend on views that require a valid token.

Usage on a protected view:
    from .authentication import JWTAuthentication
    from rest_framework.permissions import IsAuthenticated

    class SomeProtectedView(APIView):
        authentication_classes = [JWTAuthentication]
        permission_classes = [IsAuthenticated]
"""

import jwt
from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Attendee


class JWTAuthentication(BaseAuthentication):
    """
    Clients must pass the token in the Authorization header:
        Authorization: Bearer <token>
    """

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None  # No credentials — let other authenticators handle it

        parts = auth_header.split()

        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise AuthenticationFailed("Authorization header must be: Bearer <token>")

        token = parts[1]

        try:
            payload = jwt.decode(
                token,
                settings.JWT_SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM],
            )
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired. Please log in again.")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token.")

        try:
            attendee = Attendee.objects.get(id=payload["attendee_id"])
        except Attendee.DoesNotExist:
            raise AuthenticationFailed("Attendee not found.")

        return (attendee, token)  # (user, auth) tuple required by DRF