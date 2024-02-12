import { Search } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import MovieListItem from './MovieListItem';

function SearchMovies() {
  const searchTermFromStore = localStorage.getItem('searchTerm');
  const [searchTerm, setSearchTerm] =
    useState<string>(searchTermFromStore || '');
  const dispatch = useAppDispatch();
  const movies = useAppSelector(state => state.allMovies);
  const filteredMovies = useMemo(() => {
    if (!searchTerm) {
      return [...movies]
        .sort((a, b) => a.title.localeCompare(b.title));
    }
    return movies
      .filter(movie => {
        return movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.tags.some(t =>
            t.toLowerCase().includes(searchTerm.toLowerCase())) ||
          movie.videoTimeStamps.some(s =>
            s.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }).sort((a, b) => a.title.localeCompare(b.title));
  }, [movies, searchTerm]);

  useEffect(() => {
    // update redux store with search term
    localStorage.setItem('searchTerm', searchTerm);
  }, [dispatch, searchTerm]);
  return (
    <div className="search-page">
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1.5rem',
        width: '100%'
      }}>
        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField
          id="outlined-basic"
          label="Search for a memory"
          variant="outlined"
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ width: '75%' }}
          value={searchTerm}
        />
      </Box>


      <div className='library-list'>
        {filteredMovies.map((movie, i) => {
          return <MovieListItem key={i} {...movie} />;
        }
        )}
      </div>
    </div>
  );
}

export default SearchMovies;