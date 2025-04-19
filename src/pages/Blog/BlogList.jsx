import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBlogs } from '../../api/blogs';
import { Card, CardContent, Typography, Button, Container, Box } from '@mui/material';
import Pagination from '../../components/Pagination';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const { blogs, totalCount } = await getBlogs(page);
      setBlogs(blogs);
      setTotalCount(totalCount);
    };
    fetchBlogs();
  }, [page]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Blog Posts</Typography>
        {blogs.map((blog) => (
          <Card key={blog.id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                {blog.content.substring(0, 100)}...
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(`/blogs/${blog.id}`)}
              >
                Read More
              </Button>
            </CardContent>
          </Card>
        ))}
        <Pagination
          count={totalCount}
          page={page}
          onChange={(newPage) => setPage(newPage)}
        />
      </Box>
    </Container>
  );
};

export default BlogList;