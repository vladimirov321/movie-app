# Movie Explorer

A modern React application for discovering and exploring movies using The Movie Database (TMDB) API.

![Movie Explorer App](/hero.png)

## Features Implemented

- **Real-time Movie Search**: Search through thousands of movies with debounced input to optimize API requests
- **Dynamic Movie Discovery**: Browse popular movies when no search term is entered
- **Responsive Movie Cards**: Display movie details including:
  - Title
  - Rating (with star icon)
  - Original language
  - Release year
- **Smooth User Experience**:
  - Loading spinner during API requests
  - Error handling with user-friendly messages
  - Responsive design for various screen sizes

## Tech Stack

- **React 19** with hooks for state management
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for styling
- **TMDB API** for movie data
- **React Use** library for debounced search functionality

## Setup and Configuration

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the project root and add your TMDB API key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Potential Future Enhancements

- Movie details page
- Filter functionality (by genre, year, rating)
- User authentication and favorites list
- Pagination for search results
- Dark/Light theme toggle

