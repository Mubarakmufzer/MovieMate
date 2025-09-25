import { useState, useEffect } from 'react';
import axios from 'axios';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/recommendations/');
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended Content</h2>
      <ul className="space-y-4">
        {recommendations.map((item) => (
          <li key={item.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>Genre: {item.genre}</p>
            <p>Platform: {item.platform}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;