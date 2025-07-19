import React, { useMemo } from 'react';

const MovieCard = React.memo(({ movie }) => {
  const {
    title,
    vote_average,
    release_date,
    original_language,
    poster_path,
  } = movie;

  const imageSrc = useMemo(
    () =>
      poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : 'no-movie.jpg',
    [poster_path]
  );

  const releaseYear = useMemo(
    () => (release_date ? release_date.split('-')[0] : 'N/A'),
    [release_date]
  );
  const formattedRating = useMemo(
    () => (vote_average ? vote_average.toFixed(1) : 'N/A'),
    [vote_average]
  );

  return (
    <div className='movie-card'>
      <img src={imageSrc} alt={title} />
      <div className='mt-4'>
        <h3>{title}</h3>

        <div className='content'>
          <div className='rating'>
            <img src='star.svg' alt='star' />
            <p>{formattedRating}</p>
          </div>

          <span>•</span>
          <p className='lang'>{original_language}</p>
          <span>•</span>
          <p className='year'>{releaseYear}</p>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
