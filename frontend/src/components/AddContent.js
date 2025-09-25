import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AddContent() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    genre: '',
    platform: '',
    content_type: 'movie',
    status: 'wishlist',
    total_episodes: '',
    episodes_watched: 0,
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/content/${id}/`)
        .then(response => setFormData(response.data))
        .catch(error => console.error('Error fetching content:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8000/api/content/${id}/`, formData);
        alert('Content updated successfully!');
      } else {
        await axios.post('http://localhost:8000/api/content/', formData);
        alert('Content added successfully!');
      }
    } catch (error) {
      console.error('Error saving content:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Update' : 'Add'} Movie/TV Show</h2>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
          placeholder="Director"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          placeholder="Platform"
          className="w-full p-2 border rounded"
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
            />
            <input
              type="number"
              name="episodes_watched"
              value={formData.episodes_watched}
              onChange={handleChange}
              placeholder="Episodes Watched"
              className="w-full p-2 border rounded"
            />
          </>
        )}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {id ? 'Update' : 'Add'} Content
        </button>
      </div>
    </div>
  );
}

export default AddContent;