/**
 * Created by DavidHong on 2015. 6. 24..
 */

var gulp =      require('gulp')
var nodemon = require('gulp-nodemon')


gulp.task('dev:server', function () {
    nodemon({
        script: 'server.js',
        ext:    'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    })
})

