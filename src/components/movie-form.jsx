import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  MenuItem,
} from '@mui/material';
import MoviesService from '../services/movies-service';

const MovieForm = ({
  onSubmit,
  formTitle,
  submitText,
  color,
  initValues,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [title, setTitle] = React.useState(initValues?.title ?? '');
  const [category, setCategory] = React.useState(initValues?.categoryId ?? '');
  const [price, setPrice] = React.useState(initValues?.price ?? '');
  const [img, setImg] = React.useState(initValues?.img ?? '');
  const [description, setDescription] = React.useState(initValues?.description ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      categoryId: category,
      price: Number(price),
      img,
      description,
    });
  };

  React.useEffect(() => {
    (async () => {
      const fethedCategories = await MoviesService.fetchCategories();
      setCategories(fethedCategories);
    })();
  }, []);

  return (
    <Paper component="form" sx={{ p: 3, minWidth: { xs: '250px', sm: '400px' } }} onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 2 }}>{formTitle}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Title"
          fullWidth
          variant="filled"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Category"
          fullWidth
          select
          variant="filled"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map(({ id, title: categoryTitle }) => (
            <MenuItem key={id} value={id}>{categoryTitle}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Price €"
          type="number"
          fullWidth
          variant="filled"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <TextField
          label="Photo path"
          fullWidth
          variant="filled"
          value={img}
          onChange={(event) => setImg(event.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          variant="filled"
          multiline
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color={color}
            size="large"
          >
            {submitText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default MovieForm;
