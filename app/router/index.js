const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/', require('./profilUser'));
router.use('/', require('./chat'));
router.use('/', require('./message'));

module.exports = router;
