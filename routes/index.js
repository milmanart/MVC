const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.post('/student', (req, res) => {
    const studentData = req.body;
    const studentId = studentData.code;

    fs.writeFile(`student_data/${studentId}.json`, JSON.stringify(studentData), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('<h1>Błąd podczas zapisywania danych studenta.</h1>');
            return;
        }
        res.redirect(`/student/${studentId}`);
    });
});

app.get('/student/:id', (req, res) => {
    const studentId = req.params.id;

    fs.readFile(`student_data/${studentId}.json`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('<h1>Błąd podczas odczytywania danych studenta.</h1>');
            return;
        }
        const student = JSON.parse(data);
        res.render('student', { student });
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});
