const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validation');

router.post('/', createMovieValidation, createMovie);
router.get('/', getMovies);
router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
