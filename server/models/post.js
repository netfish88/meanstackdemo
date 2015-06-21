/**
 * Created by DavidHong on 2015. 6. 20..
 */

var db = require('../db')
var Post = db.model('Post', {
    username: { type: String, required: true },
    body:     { type: String, required: true },
    date:     { type: String, required: true, default: Date.now }
})
module.exports = Post;