var router = require('express').Router();
var four0four = require('./utils/404')();
// var data = require('./data');

// router.get('/people', getPeople);
// router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
    // res.status(200).send(data.people);
}
