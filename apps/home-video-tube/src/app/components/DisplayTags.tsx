
function DisplayTags(props: { tags: string[] }) {
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