import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import TapeListItem from './TapeListItem';

function Library() {
  const movies = useAppSelector(state => state.allTapes);
  return (
    <ul className='library-list'>
      {movies.map(movie => (
        <TapeListItem key={movie.id} {...movie} />
      ))}
    </ul>
  );
}

export default Library;