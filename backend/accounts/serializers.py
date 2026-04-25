from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    """Validates registration input and creates a new user."""
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'public_key']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        # create_user hashes the password — never store plain text
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            public_key=validated_data.get('public_key', ''),
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    """Safe user representation — no password, no private key."""

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'public_key', 'created_at']
        read_only_fields = fields


class PublicKeySerializer(serializers.ModelSerializer):
    """Only exposes public key — used by senders to encrypt outgoing emails."""

    class Meta:
        model = User
        fields = ['email', 'public_key']
        read_only_fields = fields
