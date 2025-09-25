import { useState } from 'react';
import axios from 'axios';

function RatingReview({ contentId }) {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/ratings/', {
        content: contentId,
        score: parseInt(rating),
      });
      alert('Rating submitted!');
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/reviews/', {
        content: contentId,
        text: review,
      });
      alert('Review submitted!');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Rate & Review</h3>
      <div className="space-y-2">
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating (1-10)"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleRatingSubmit}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Submit Rating
        </button>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleReviewSubmit}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export default RatingReview;