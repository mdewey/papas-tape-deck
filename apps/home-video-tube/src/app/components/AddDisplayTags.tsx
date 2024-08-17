import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import DisplayTags from './DisplayTags';


interface AddDisplayTagsProps {
  // Define your props here
  id: string;
  tags: string[];
}

const AddDisplayTags: React.FC<AddDisplayTagsProps> = ({ id, tags }) => {
  const dispatch = useAppDispatch();
  // Component logic goes here
  const [newTag, setNewTag] = useState<string>('');
  const [tagList, setTagList] = useState<string[]>(tags);

  const mutation = useMutation(
    {
      mutationFn: (newTag: string) => {
        return axios
          .post(
            `${process.env["NX_METADATA_API_URL"]}api/v2/Tapes/${id}/tag`,
            { tag: newTag });
      },
      onSuccess: () => {
        setTagList([...tagList, newTag]);
        setNewTag('');
        dispatch({
          type: 'ADD_TAPE_TAG_LIST',
          payload: { id, tags: [newTag] }
        });
      },
    });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!newTag) {
      return;
    }
    mutation.mutate(newTag);
  };

  return (
    <div className='add-tag-container'>
      <DisplayTags tags={tagList} />
      <form onSubmit={onSubmit}>
        <TextField
          id="filled-basic"
          label="Add a new tag"
          variant="filled"
          value={newTag}
          onChange={e => setNewTag(e.target.value)}
        />
        <Button variant="contained" type='submit'>Add</Button>
      </form>

    </div>
  );
};

export default AddDisplayTags;