import * as React from 'react';
import { Box, Modal } from '@mui/material';
import { MovieForm } from './components';
import MoviesService from './services/movies-service';
import SwiperMovie from './components/swiper';
import MenuAppBar from './components/navbar';

const App = () => {
  const [movies, setMovies] = React.useState([]);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [movieCardBeingEdited, setMovieCardBeingEdited] = React.useState(null);

  const closeModal = () => {
    setModalOpen(false);
    setMovieCardBeingEdited(null);
  };

  const fetchAllMovies = async () => {
    const fetchedMovies = await MoviesService.fetchAll();
    setMovies(fetchedMovies);
  };

  const createMovieCard = async (movieProps) => {
    await MoviesService.create(movieProps);
    await fetchAllMovies();
    closeModal();
  };

  const editMovieCard = (id) => {
    const foundMovies = movies.find((c) => c.id === id);
    setMovieCardBeingEdited(foundMovies);
    setModalOpen(true);
  };

  const updateMovieCard = async (movieProps) => {
    await MoviesService.update(movieCardBeingEdited.id, movieProps);
    await fetchAllMovies();
    closeModal();
  };

  const removeMovieCard = async (id) => {
    await MoviesService.remove(id);
    fetchAllMovies();
  };

  React.useEffect(() => {
    fetchAllMovies();
  }, []);

  return (
    <Box sx={{
      gap: { xs: 4, xxl: 0 },
    }}
    >
      <MenuAppBar openModal={() => setModalOpen(true)} />
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        >
          <MovieForm
            onSubmit={movieCardBeingEdited ? updateMovieCard : createMovieCard}
            formTitle={movieCardBeingEdited ? 'Movie Card Edit' : 'Add New Movie Card'}
            submitText={movieCardBeingEdited ? 'Update' : 'Create'}
            color={movieCardBeingEdited ? 'warning' : 'success'}
            initValues={movieCardBeingEdited}
          />
        </Box>
      </Modal>
      <SwiperMovie
        movies={movies}
        removeMovieCard={removeMovieCard}
        editMovieCard={editMovieCard}
      />
    </Box>
  );
};
export default App;
