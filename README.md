# MovieMate

MovieMate is a web application designed to help you track and manage your movie and TV show watchlist, ratings, and reviews. Built with Django for the backend and React for the frontend, it offers a user-friendly interface to add, update, rate, and review

## Setup Steps

1. **Clone the Repository**
   - Run: `git clone https://github.com/Mubarakmufzer/MovieMate.git`
   - Navigate to the project directory: `cd moviemate`

2. **Install Dependencies**
   - Backend (Django): `pip install -r backend/requirements.txt`
   - Frontend (React): `cd frontend && npm install`

3. **Set Up Environment**
   - Create a `.env` file in the `backend` directory with:
   SECRET_KEY=your-secret-key
   DEBUG=True
   DATABASE_URL=sqlite:///db.sqlite3

- Generate a secret key: `python -c "import secrets; print(secrets.token_urlsafe(50))"`

4. **Apply Migrations**
- Run: `python manage.py migrate`

5. **Run the Application**
- Start the Django server: `python manage.py runserver` (from the `backend` directory)
- Start the React development server: `npm start` (from the `frontend` directory)
- Open `http://localhost:3000` in your browser

6. **Add Initial Data**
- Use `http://localhost:3000/add` to manually add movies or TV shows.
- Add ratings via the list page (`http://localhost:3000/list`) to enable recommendations.

## Feature List

- **Content Management**
- Add movies or TV shows with details like title, director, genre, platform, and status (wishlist, watching, completed).
- Update or delete existing content.
- Track TV show progress (episodes watched/total episodes).

- **Rating and Review System**
- Rate content on a 0-5 scale.
- Add and manage reviews for movies or TV shows.



- **User Interface**
- Responsive and clean design.
- Home page to view all content.
- Dedicated recommendations page.

- **API Support**
- RESTful API endpoints for managing content, ratings, reviews   