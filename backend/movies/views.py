from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Content, Rating, Review
from .serializers import ContentSerializer, RatingSerializer, ReviewSerializer
from django.db.models import Avg

class ContentListCreateView(generics.ListCreateAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer

class ContentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer

class RatingListCreateView(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

@api_view(['GET'])
def recommendations(request):
    # Get genres with highest average ratings
    top_genres = Rating.objects.values('content__genre').annotate(avg_score=Avg('score')).order_by('-avg_score')[:3]
    top_genre_list = [g['content__genre'] for g in top_genres]
    # Recommend content in those genres, excluding already watched
    recommended = Content.objects.filter(genre__in=top_genre_list, status='wishlist')
    serializer = ContentSerializer(recommended, many=True)
    return Response(serializer.data)