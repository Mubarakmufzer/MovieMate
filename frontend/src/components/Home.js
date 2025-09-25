import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/api/content/');
        setContent(response.data);
        console.log('Fetched content:', response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load content. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MovieMate</h1>
      <p className="text-lg mb-4">Track and manage your movies and TV shows!</p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading content...</p>
      ) : content.length > 0 ? (
        <ul className="space-y-4">
          {content.map((item) => (
            <li key={item.id} className="p-4 bg-white rounded shadow text-left">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p>Type: {item.content_type}</p>
              <p>Genre: {item.genre}</p>
              <p>Platform: {item.platform}</p>
              {item.content_type === 'tv' && (
                <p>Progress: {item.episodes_watched}/{item.total_episodes} episodes</p>
              )}
              {item.rating && <p>Rating: {item.rating}/5</p>}
              {item.review && <p>Review: {item.review}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No content available. Add some via the Add Content page!</p>
      )}
    </div>
  );
}

export default Home;