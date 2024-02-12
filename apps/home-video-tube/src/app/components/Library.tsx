import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import MovieListItem from './MovieListItem';

function Library() {
  const movies = useAppSelector(state => state.allMovies);
  return (
    <ul className='library-list'>
      {movies.map(movie => (
        <MovieListItem key={movie.id} {...movie} />
      ))}
    </ul>
  );
}

export default Library;