/*
 * 
 * mnTouch, build tool
 * by Alessandro Bellini - ilmente
 * MIT
 *
 */

'use strict';

const fs = require('fs');
const path = require('path');
const uglify = require('uglify-js');
const cwd = process.cwd();

function comments(node, comment) {
    return comment.type === 'comment2';
}

let expanded = uglify.minify(path.join(cwd, './src/mn-touch.js'), {
    mangle: false,
    compress: false,
    output: {
        indent_level: 4,
        space_colon: true,
        beautify: true,
        comments: comments,
        semicolons: true
    }
});

let compressed = uglify.minify(path.join(cwd, './src/mn-touch.js'), {
    mangle: true,
    compress: true,
    outSourceMap: './mn-touch.min.js.map',
    output: {
        comments: comments
    }
});

try {
    fs.writeFileSync(path.join(cwd, './dist/mn-touch.js'), expanded.code);
    fs.writeFileSync(path.join(cwd, './dist/mn-touch.min.js'), compressed.code);
    fs.writeFileSync(path.join(cwd, './dist/mn-touch.min.js.map'), compressed.map);
    console.log('mn-touch builded successfully');
} catch (err) {
    console.log('error building mn-touch:', err);
}
