import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>Welcome to the Blog App</Typography>
        <Typography variant="body1" paragraph>
          Read and share interesting blog posts with the community.
        </Typography>
        <Button
          variant="contained"
          
          component={Link}
          to="/blogs"
          size="large"
          sx={{ mt: 2 , background : "#073354"}}
        >
          View Blogs
        </Button>
      </Box>
    </Container>
  );
};

export default Home;