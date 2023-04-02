const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String },
        image: {
            type: String,
            required: true
        },
        label: {
            type: String,
            enum: ['High', 'Medium', 'Low'],
            default: 'Low'
        },
        star: {
            type: Number,
            default: 0
        }
        // image: { type: String },
        // videoId: { type: String, required: true },
        // level: { type: String },
        // slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
);

mongoose.plugin(slug);

// Add plugins
Post.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post);
