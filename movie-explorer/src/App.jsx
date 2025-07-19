import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingMovies } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const handleSearchTermChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const fetchMovies = useCallback(async (query = '') => {
    setLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) throw new Error('Failed to fetch movies');

      const data = await response.json();
      const results = data.results || [];

      if (data.Response === 'False' || results.length === 0) {
        setErrorMessage(data.Error || 'No movies found');
        setMovieList([]);
      } else {
        setMovieList(results);
        if (query) await updateSearchCount(query, results[0]);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTrendingMovies = useCallback(async () => {
    setLoading(true);
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error loading trending movies: ${error}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchMovies]);

  useEffect(() => {
    loadTrendingMovies();
  }, [loadTrendingMovies]);

  const trendingList = useMemo(
    () => trendingMovies.map((movie, index) => (
      <li key={movie.$id} className="trending-item">
        <p>{index + 1}</p>
        <img src={movie.poster_url} alt={movie.title} />
      </li>
    )),
    [trendingMovies]
  );

  const allMoviesList = useMemo(
    () => movieList.map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    )),
    [movieList]
  );

  return (
    <main>
      <div className='pattern' />

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={handleSearchTermChange}
          />
        </header>

        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>{trendingList}</ul>
          </section>
        )}

        <section className='all-movies'>
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>{allMoviesList}</ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
