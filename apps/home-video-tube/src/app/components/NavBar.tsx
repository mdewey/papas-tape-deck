import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const routes = [{ text: "Home", path: "/" }];


export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home Videos
          </Typography>
          <Box sx={{ display: 'block' }}>
            {routes.map((item, i) => {
              return (
                <Button
                  key={i}
                  sx={{ color: '#fff' }}
                  href={item.path}
                >
                  {item.text}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
