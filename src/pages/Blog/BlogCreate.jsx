import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createBlog } from '../../api/blogs';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const BlogCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      content,
      userId: user.id,
      author: user.name,
      createdAt: new Date().toISOString()
    };
    await createBlog(newBlog, token);
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Create New Blog</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            label="Content"
            fullWidth
            margin="normal"
            multiline
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Publish
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BlogCreate;