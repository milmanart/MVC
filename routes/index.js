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

    const studentText = `Numer albumu: ${studentData.code}\nImię: ${studentData.name}\nNazwisko: ${studentData.lastname}\nPłeć: ${studentData.gender}\nWiek: ${studentData.age}\nKierunek studiów: ${studentData.studyField}`;

    fs.writeFile(`student_data/${studentId}.txt`, studentText, (err) => {
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

    fs.readFile(`student_data/${studentId}.txt`, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('<h1>Błąd podczas odczytywania danych studenta.</h1>');
            return;
        }

        const studentLines = data.split('\n');
        const student = {
            code: studentLines[0].split(': ')[1],
            name: studentLines[1].split(': ')[1],
            lastname: studentLines[2].split(': ')[1],
            gender: studentLines[3].split(': ')[1],
            age: studentLines[4].split(': ')[1],
            studyField: studentLines[5].split(': ')[1]
        };
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
