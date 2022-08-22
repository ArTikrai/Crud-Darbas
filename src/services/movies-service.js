const serverAddress = 'http://localhost:8000';

const formatMovies = ({
  id,
  title,
  description,
  price,
  img,
  categoryId,
  category,
}) => ({
  id,
  title,
  description,
  price,
  img,
  categoryId,
  category: category.title,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/movies?_expand=category`);
  const movies = await response.json();

  return movies.map(formatMovies);
};

const create = async (movieProps) => {
  const response = await fetch(`${serverAddress}/movies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieProps),
  });

  const movie = await response.json();

  return movie;
};

const update = async (id, movieProps) => {
  const response = await fetch(`${serverAddress}/movies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieProps),
  });

  const movie = await response.json();

  return movie;
};

const remove = async (id) => {
  await fetch(`${serverAddress}/movies/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const fetchCategories = async () => {
  const response = await fetch(`${serverAddress}/categories`);
  const categories = await response.json();

  return categories;
};

const MoviesService = {
  fetchAll,
  create,
  update,
  remove,
  fetchCategories,
};

export default MoviesService;
