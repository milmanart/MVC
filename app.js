const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.post('/student', (req, res) => {
    const studentData = req.body;
    const studentId = studentData.code;

    fs.writeFile(`student_data/${studentId}.txt`, JSON.stringify(studentData), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('<h1>Błąd podczas zapisywania danych studenta.</h1>');
            return;
        }
        console.log('Dane studenta zostały pomyślnie zapisane.');
    });

    res.sendFile(path.join(__dirname, 'views', 'student.html'));
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'student.html'));
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});
