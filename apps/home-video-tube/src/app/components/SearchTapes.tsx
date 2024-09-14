import { Search } from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { useMemo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import TapeListItem from './TapeListItem';

function SearchTapes() {
  const searchTermFromStore = localStorage.getItem('searchTerm');
  const [searchTerm, setSearchTerm] =
    useState<string>(searchTermFromStore || '');
  const dispatch = useAppDispatch();
  const tapes = useAppSelector(state => state.allTapes);
  const filteredTapes = useMemo(() => {
    if (!searchTerm) {
      return [...tapes]
        .sort((a, b) => a.title.localeCompare(b.title));
    }
    return tapes
      .filter(tape => {
        return tape.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tape.tags?.some(t =>
            t.toLowerCase().includes(searchTerm.toLowerCase())) ||
          tape.audioTimeStamps?.some(s =>
            s.description.toLowerCase().includes(searchTerm.toLowerCase()));
      }).sort((a, b) => a.title.localeCompare(b.title));
  }, [tapes, searchTerm]);

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
          label="Search for a tape"
          variant="outlined"
          onChange={e => setSearchTerm(e.target.value)}
          sx={{ width: '75%' }}
          value={searchTerm}
        />
      </Box>
      <div className='library-list'>
        {filteredTapes.length === 0 &&
          <div className='no-tapes'>
            No tapes found. Try searching for something else.
          </div>
        }
        {filteredTapes.map((tape, i) => {
          return <TapeListItem key={i} {...tape} />;
        }
        )}
      </div>
      <div>
        <div className="footer">
          loaded a total of {tapes.length} tapes
        </div>
      </div>
    </div>
  );
}

export default SearchTapes;