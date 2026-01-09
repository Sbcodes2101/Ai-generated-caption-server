const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    image:String,
    caption:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users' // refer to users collection
    }
})

const PostModel = mongoose.model('post',postSchema);

module.exports = PostModel;