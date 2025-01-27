// Create web server
// Create a node.js web server that listens for requests on port 8080, reads the comments.json file, and returns the comments in JSON format.

// Use the following command to start the server:
// node comments.js

// The comments.json file contains an array of comments. Each comment object has the following properties:

// id - a unique identifier for the comment
// name - the name of the person who wrote the comment
// message - the comment message
// The server should respond to the following requests:

// GET /comments - return all comments
// GET /comments/:id - return a single comment by id
// POST /comments - add a new comment
// PUT /comments/:id - update a comment by id
// DELETE /comments/:id - delete a comment by id
// The server should return a 404 status code for any requests that do not match the above paths.

// The server should return a 200 status code for successful requests, and a 400 status code for requests that contain invalid data.

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);
    const method = req.method;

    if (reqUrl.pathname === '/comments') {
        if (method === 'GET') {
            fs.readFile('comments.json', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal server error' }));
                } else {
                    const comments = JSON.parse(data);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end