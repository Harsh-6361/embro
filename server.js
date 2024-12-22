const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get the list of image files
app.get('/api/images', (req, res) => {
    const imagesDir = path.join(__dirname, 'images');
    fs.readdir(imagesDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter image files (jpg, jpeg, png, gif)
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        const imagePaths = images.map(image => `/images/${image}`);
        res.json(imagePaths);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
