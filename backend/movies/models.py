# Create your models here.
from django.db import models

class Content(models.Model):
    CONTENT_TYPE_CHOICES = [
        ('movie', 'Movie'),
        ('tv', 'TV Show'),
    ]
    STATUS_CHOICES = [
        ('watching', 'Watching'),
        ('completed', 'Completed'),
        ('wishlist', 'Wishlist'),
    ]
    
    title = models.CharField(max_length=200)
    director = models.CharField(max_length=100)
    genre = models.CharField(max_length=50)
    platform = models.CharField(max_length=50)
    content_type = models.CharField(max_length=10, choices=CONTENT_TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    total_episodes = models.IntegerField(null=True, blank=True)  # For TV shows
    episodes_watched = models.IntegerField(default=0)  # For TV shows
    rating = models.FloatField(null=True, blank=True, help_text="Rating out of 5")  # New field
    review = models.TextField(null=True, blank=True)    
    def __str__(self):
        return self.title

class Rating(models.Model):
    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='ratings')
    score = models.IntegerField()  # 1-10
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.content.title} - {self.score}/10"

class Review(models.Model):
    content = models.ForeignKey(Content, on_delete=models.CASCADE, related_name='reviews')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review for {self.content.title}"