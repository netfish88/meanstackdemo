/**
 * Created by DavidHong on 2015. 6. 23..
 */

var router = require('express').Router()

router.use('/api', require('./api'))
router.use('/', require('./static'))


module.exports = router;
