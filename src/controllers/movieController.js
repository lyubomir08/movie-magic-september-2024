const router = require('express').Router();

const movieService  = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (err) {
        console.log(err.message);
        res.redirect('/create');
    }
});

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    //TODO: Thats not perfect, use handlebars helpers
    movie.ratingStars = '&#x2605;'.repeat(movie.rating);

    res.render('details', { movie });
});

router.get('/movies/:movieId/attach', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const casts = await castService.getAll().lean();

    // TODO: Remove already added casts
    res.render('movie/attach', { ...movie, casts });
});

router.post('/movies/:movieId/attach', async (req, res) => {
    const castId = req.body.cast;

    await movieService.attach(req.params.movieId, castId);

    res.redirect(`/movies/${req.params.movieId}/attach`);
});

router.get('/movies/:movieId/edit', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();

    res.render('movie/edit', { movie });
});

module.exports = router;