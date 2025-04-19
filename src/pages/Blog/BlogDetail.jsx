import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getBlogById, deleteBlog } from '../../api/blogs';
import { Typography, Button, Container, Box, Card, CardContent } from '@mui/material';

const BlogDetail = () => {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await getBlogById(id);
      setBlog(blog);
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    await deleteBlog(id, token);
    navigate('/');
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>{blog.title}</Typography>
            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {blog.content}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 2 }}>
              Posted by: {blog.author}
            </Typography>
            {user && user.id === blog.userId && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate(`/blogs/${blog.id}/edit`)}
                  sx={{ mr: 2 }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
export default BlogDetail;