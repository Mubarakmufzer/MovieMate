from rest_framework import serializers
from .models import Content, Rating, Review

class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Content
        fields = '__all__'
        extra_kwargs = {
            'episodes_watched': {'required': False, 'allow_null': True, 'default': 0},
            'total_episodes': {'required': False, 'allow_null': True, 'default': 0},
            'image': {'required': False, 'allow_null': True},
            'rating': {'required': False, 'allow_null': True},
            'review': {'required': False, 'allow_null': True},
        }
        

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'