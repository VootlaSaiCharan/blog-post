import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ count, page, onChange }) => {
  return (
    <Stack spacing={2} sx={{ mt: 4, alignItems: 'center' }}>
      <MuiPagination
        count={Math.ceil(count / 5)}
        page={page}
        onChange={(e, value) => onChange(value)}
        color="primary"
      />
    </Stack>
  );
};

export default Pagination;