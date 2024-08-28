const router = require('express').Router();

const movieService  = require('../services/movieService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', (req, res) => {
    const newMovie = req.body;

    movieService.create(newMovie);

    res.redirect('/');
});

router.get('/movies/:movieId', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getOne(movieId);

    //TODO: Thats not perfect, use handlebars helpers
    movie.ratingStars = '&#x2605;'.repeat(movie.rating);

    res.render('details', { movie });
});

module.exports = router;