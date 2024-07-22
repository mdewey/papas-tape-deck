
function DisplayTags(props: { tags: string[] }) {
  if (!props.tags || props.tags.length === 0) {
    return null;
  }
  return (
    <ul className="tag-list">
      {props.tags.map((tag, i) => (
        <li key={tag}>
          {/* <Chip label={tag} variant="outlined" /> */}
          {tag}{i < props.tags.length - 1 ? ', ' : ''}
        </li>
      ))}
    </ul>
  );
}

export default DisplayTags;