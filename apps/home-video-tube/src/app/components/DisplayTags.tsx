import Chip from '@mui/material/Chip';


function DisplayTags(props: { tags: string[] }) {

  if (!props.tags || props.tags.length === 0) {
    return null;
  }

  return (
    <ul className="tag-list">
      {props.tags.map((tag, i) => (
        <li key={tag}>
          <Chip label={tag} variant="outlined" />
        </li>
      ))}
    </ul>
  );
}

export default DisplayTags;