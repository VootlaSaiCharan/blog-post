import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBlogById, updateBlog } from '../../api/blogs';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const BlogEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await getBlogById(id);
      setTitle(blog.title);
      setContent(blog.content);
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBlog = { title, content };
    await updateBlog(id, updatedBlog, token);
    navigate(`/blogs/${id}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Edit Blog</Typography>
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
            Update
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BlogEdit;