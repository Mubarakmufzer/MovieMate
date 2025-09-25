import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ContentList() {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState({ genre: '', platform: '', status: '' });
  const [sort, setSort] = useState('title');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/api/content/');
      setContent(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load content. Please check your connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await axios.delete(`http://localhost:8000/api/content/${id}/`);
        setContent(content.filter((item) => item.id !== id));
        alert('Content deleted successfully!');
      } catch (error) {
        console.error('Error deleting content:', error);
        setError('Failed to delete content. Please try again.');
      }
    }
  };

  const filteredContent = content
    .filter((item) => {
      return (
        (!filter.genre || item.genre.toLowerCase().includes(filter.genre.toLowerCase())) &&
        (!filter.platform || item.platform.toLowerCase().includes(filter.platform.toLowerCase())) &&
        (!filter.status || item.status === filter.status)
      );
    })
    .sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'genre') return a.genre.localeCompare(b.genre);
      if (sort === 'platform') return a.platform.localeCompare(b.platform);
      return 0;
    });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Content List</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-gray-500 mb-4">Loading...</p>}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          name="genre"
          value={filter.genre}
          onChange={handleFilterChange}
          placeholder="Filter by Genre"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="platform"
          value={filter.platform}
          onChange={handleFilterChange}
          placeholder="Filter by Platform"
          className="w-full p-2 border rounded"
        />
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Statuses</option>
          <option value="wishlist">Wishlist</option>
          <option value="watching">Watching</option>
          <option value="completed">Completed</option>
        </select>
        <select
          name="sort"
          value={sort}
          onChange={handleSortChange}
          className="w-full p-2 border rounded"
        >
          <option value="title">Sort by Title</option>
          <option value="genre">Sort by Genre</option>
          <option value="platform">Sort by Platform</option>
        </select>
        <button
          onClick={fetchContent}
          className="w-full bg-green-500 text-white p-2 rounded mt-2"
        >
          Refresh Content
        </button>
      </div>
      {filteredContent.length === 0 && !loading && !error && (
        <p className="text-gray-500">No content available. Add some via the Add Content page!</p>
      )}
      <ul className="space-y-4">
        {filteredContent.map((item) => (
          <li key={item.id} className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p>Director: {item.director}</p>
            <p>Genre: {item.genre}</p>
            <p>Platform: {item.platform}</p>
            <p>Type: {item.content_type}</p>
            <p>Status: {item.status}</p>
            {item.content_type === 'tv' && (
              <p>
                Progress: {item.episodes_watched}/{item.total_episodes} episodes
              </p>
            )}
            <div className="mt-2 space-x-2">
              <Link
                to={`/add/${item.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentList;
