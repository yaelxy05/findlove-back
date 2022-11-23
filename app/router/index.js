const router = require('express').Router();

router.use('/api/users', require('./users'));
router.use('/api', require('./profilUser'));
router.use('/api', require('./chat'));
router.use('/api', require('./message'));

module.exports = router;
