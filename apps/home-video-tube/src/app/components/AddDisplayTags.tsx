import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';


interface AddDisplayTagsProps {
  // Define your props here
  id: string;
}

const AddDisplayTags: React.FC<AddDisplayTagsProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  // Component logic goes here
  const [newTag, setNewTag] = useState<string>('');

  const mutation = useMutation(
    {
      mutationFn: (newTag: string) => {
        return axios
          .post(
            `${process.env["NX_METADATA_API_URL"]}api/v2/Tapes/${id}/tag`,
            { tag: newTag });
      },
      onSuccess: () => {
        console.log('tag added');
        dispatch({
          type: 'ADD_TAPE_TAG_LIST',
          payload: { id, tags: [newTag] }
        });
      },
    });

  const onSubmit = (e: { preventDefault: () => void; }) => {
    console.log('submitting');
    e.preventDefault();
    if (!newTag) {
      return;
    }
    mutation.mutate(newTag);
  };

  return (
    <div className='add-tag-container'>
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