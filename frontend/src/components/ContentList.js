import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RatingReview from './RatingReview';

function ContentList() {
  const [content, setContent] = useState([]);
  const [filter, setFilter] = useState({ genre: '', platform: '', status: '' });
  const [sort, setSort] = useState('title');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/content/');
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/content/${id}/`);
      setContent(content.filter((item) => item.id !== id));
      alert('Content deleted!');
    } catch (error) {
      console.error('Error deleting content:', error);
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
    <div>
      <h2 className="text-2xl font-bold mb-4">Content List</h2>
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
      </div>
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
            <RatingReview contentId={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentList;