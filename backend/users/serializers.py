from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

# 🔹 Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user


# 🔹 Profile Serializer (sirf profile_pic)
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['profile_pic']


# 🔹 Combined User + Profile Serializer (GET ke liye)
class UserProfileDetailSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(
        source='profile.profile_pic',
        read_only=True
    )

    class Meta:
        model = User
        fields = ['username', 'email', 'profile_pic']
