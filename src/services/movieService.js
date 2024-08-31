const Movie = require('../models/Movie');

exports.getAll = () => Movie.find();

// TODO: Filter result in MongoDB
exports.search = (title, genre, year) => {
    let query = {};
    // let query2 = Movie.find();

    if (title) {
        query.title = new RegExp(title, 'i');
        // query2 = query2.find({ title: new RegExp(title, 'i') });
    }

    if (genre) {
        query.genre = genre.toLowerCase();
        // query2 = query2.find({ genre: new RegExp(genre, 'i') });
    }

    if (year) {
        query.year = year;
        // query2 = query2.find({ year });
    }

    return Movie.find(query);
    // return query2;
};

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movieData) => Movie.create(movieData);

exports.attach = (movieId, castId) => {
    return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
};