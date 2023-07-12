const router = require('express').Router();

router.use('/question/', require('./question'));
router.use('/testcase/', require('./testcase'));

module.exports = router;
