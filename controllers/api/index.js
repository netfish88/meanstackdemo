/**
 * Created by DavidHong on 2015. 6. 23..
 */

var router = require('express').Router()

router.use(require('./posts'));
router.use(require('./sessions'));
router.use(require('./users'));
//router.use(require('./register'));

module.exports = router;
