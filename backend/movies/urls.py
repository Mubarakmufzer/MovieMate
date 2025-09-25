from django.urls import path
from .views import ContentListCreateView, ContentDetailView, RatingListCreateView, ReviewListCreateView

urlpatterns = [
    path('content/', ContentListCreateView.as_view(), name='content-list-create'),
    path('content/<int:pk>/', ContentDetailView.as_view(), name='content-detail'),
    path('ratings/', RatingListCreateView.as_view(), name='rating-list-create'),
    path('reviews/', ReviewListCreateView.as_view(), name='review-list-create'),

]