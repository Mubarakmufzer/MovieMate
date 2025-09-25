import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    platform: '',
    content_type: 'movie',
    status: 'wishlist',
    total_episodes: '',
    episodes_watched: 0,
    rating: '',  // Added back
    review: '',  // Added back
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/content/${id}/`)
        .then((response) => setFormData(response.data))
        .catch((error) => console.error('Error fetching content:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting formData:', formData);

    let submitData = { ...formData };

    // Validate required fields
    const requiredFields = ['title', 'director', 'genre', 'platform'];
    const missingFields = requiredFields.filter(field => !submitData[field].trim());
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Validate and adjust data based on content_type
    if (submitData.content_type === 'tv') {
      const totalEpisodes = parseInt(submitData.total_episodes, 10) || 0;
      const episodesWatched = parseInt(submitData.episodes_watched, 10) || 0;
      if (totalEpisodes <= 0) {
        alert('Total episodes must be a positive number for TV shows.');
        return;
      }
      if (episodesWatched > totalEpisodes) {
        alert('Episodes watched cannot exceed total episodes.');
        return;
      }
      submitData.total_episodes = totalEpisodes;
      submitData.episodes_watched = episodesWatched;
    } else if (submitData.content_type === 'movie') {
      delete submitData.total_episodes;
      delete submitData.episodes_watched;
    }

    // Validate rating
    if (submitData.rating !== '' && (parseFloat(submitData.rating) < 0 || parseFloat(submitData.rating) > 5)) {
      alert('Rating must be between 0 and 5.');
      return;
    }
    submitData.rating = submitData.rating !== '' ? parseFloat(submitData.rating) : null;

    try {
      const url = id ? `http://localhost:8000/api/content/${id}/` : `http://localhost:8000/api/content/`;
      const method = id ? 'put' : 'post';
      const response = await axios[method](url, submitData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Server response:', response.data);
      alert(id ? 'Content updated!' : 'Content added!');
      navigate('/list');
    } catch (error) {
      console.error('Error saving content:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      alert(`Failed to save content. Status: ${error.response?.status || 'Unknown'}. Check console for details.`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Update' : 'Add'} Movie/TV Show</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Director"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          placeholder="Platform"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="content_type"
          value={formData.content_type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="wishlist">Wishlist</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
        </select>
        {formData.content_type === 'tv' && (
          <>
            <input
              type="number"
              name="total_episodes"
              value={formData.total_episodes}
              onChange={handleChange}
              placeholder="Total Episodes"
              className="w-full p-2 border rounded"
              min="1"
              required
            />
            <input
              type="number"
              name="episodes_watched"
              value={formData.episodes_watched}
              onChange={handleChange}
              placeholder="Episodes Watched"
              className="w-full p-2 border rounded"
              min="0"
            />
          </>
        )}
        <input
          type="number"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (0-5)"
          className="w-full p-2 border rounded"
          step="0.1"
          min="0"
          max="5"
        />
        <textarea
          name="review"
          value={formData.review}
          onChange={handleChange}
          placeholder="Review"
          className="w-full p-2 border rounded"
          rows="4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {id ? 'Update' : 'Add'} Content
        </button>
      </form>
    </div>
  );
}

export default AddContent;