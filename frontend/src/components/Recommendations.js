import { useState, useEffect } from 'react';
import axios from 'axios';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recommendations/');
        setRecommendations(response.data);
        console.log('Fetched recommendations:', response.data); // Debug log
        setError(null);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to load recommendations. Please try again later.');
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Recommended Content</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {recommendations.length === 0 && !error && (
        <p className="text-gray-500">No recommendations available. Add ratings to get personalized suggestions!</p>
      )}
      <ul className="space-y-4">
        {recommendations.map((item) => (
          <li key={item.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>Genre: {item.genre}</p>
            <p>Platform: {item.platform}</p>
            <p>Type: {item.content_type === 'movie' ? 'Movie' : 'TV Show'}</p>
            <p>Director: {item.director}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;