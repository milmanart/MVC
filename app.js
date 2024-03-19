const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'student.html'));
});
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});