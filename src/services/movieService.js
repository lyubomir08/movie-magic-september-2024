const Movie = require('../models/Movie');
const Cast = require('../models/Cast');

exports.getAll = () => Movie.find();

exports.search = (title, genre, year) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        query.genre = genre.toLowerCase();
    }

    if (year) {
        query.year = year;
    }

    return Movie.find(query);
};

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movieData) => Movie.create(movieData);

exports.edit = (movieId, movieData) => Movie.findByIdAndUpdate(movieId, movieData);

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);
    const cast = await Cast.findById(castId);

    // Validate if cast exists
    if (!cast) {
        throw new Error(`Cast with Id ${castId} does not exist`);
    }

    // Validate if cast is already added
    if (movie.casts.includes(castId)) {
        throw new Error(`Cast with Id ${castId} is already added to the movie`);
    }

    // Add cast to movie
    movie.casts.push(castId);
    await movie.save();

    return movie;

    // return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });

    // const movie = await this.getOne(movieId);
    // movie.casts.push(cast);
    // await movie.save();

    // This is optional and we don't need it in this case
    // const cast = await Cast.findById(castId);
    // cast.movies.push(movie);
    // await cast.save();

    // return movie;
};

exports.delete = (movieId) => Movie.findByIdAndDelete(movieId);