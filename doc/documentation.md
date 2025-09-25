# MovieMate Documentation

## Overview
MovieMate is a web application built with ReactJS (frontend), Django (backend), and SQLite (database) to help users track and manage their movie and TV show collections.

## Features
- **Add Content**: Users can add movies or TV shows with details like title, director, genre, platform, and status.
- **Track Progress**: For TV shows, users can track episodes watched.
- **Rate and Review**: Users can rate content (1-10) and write reviews.
- **Filter/Sort**: Filter by genre, platform, or status; sort by title, genre, or platform.
- 

## Tech Stack
- **Frontend**: ReactJS, Tailwind CSS, React Router, Axios
- **Backend**: Django, Django REST Framework
- **Database**: SQLite
- **Version Control**: Git/GitHub

## API Endpoints
- `GET/POST /api/content/`: List or create content.
- `GET/PUT/DELETE /api/content/<id>/`: Retrieve, update, or delete content.
- `GET/POST /api/ratings/`: List or create ratings.
- `GET/POST /api/reviews/`: List or create reviews.


## Setup
See `README.md` for detailed setup instructions.

