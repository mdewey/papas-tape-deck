import { Tape } from '../../store';
import DisplayTags from './DisplayTags';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function TapeListItem(tape: Tape) {
  const imageUrl =
    `${process.env["NX_METADATA_API_URL"]}api/v2/Movies/${tape.id}/image`;
  return (
    <Card sx={{
      width: {
        xs: '100%',
        sm: '100%',
        md: '48%',
        lg: '48%',
        xl: '31%'
      }
    }} className="movie-card">
      <CardMedia
        component="img"
        alt={tape.title}
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Link to={`/movie/${tape.id}`}>{tape.title}</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary" component={"div"}>
          <h3>{tape.length.split('.')[0]}</h3>
          <DisplayTags tags={tape.tags} />
        </Typography>
      </CardContent>
    </ Card>
  );
}

