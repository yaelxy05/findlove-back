const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/', require('./profilUser'));


module.exports = router;
