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

app.get('/student', (req, res) => {
    fs.readFile('student_data/44050чё.txt', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('<h1>Błąd podczas odczytywania danych studenta.</h1>');
            return;
        }
        const student = parseStudentData(data);
        console.log('Dane studenta:', student);
        res.render('student', { student });
    });
});

app.post('/student', (req, res) => {
    const studentData = req.body;
    const studentId = studentData.code;

    const studentTextData = stringifyStudentData(studentData);

    fs.writeFile(`student_data/${studentId}.txt`, studentTextData, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('<h1>Błąd podczas zapisywania danych studenta.</h1>');
            return;
        }
        console.log('Dane studenta zostały pomyślnie zapisane.');
    });

    res.sendFile(path.join(__dirname, 'views', 'student.html'));
});

app.use((req, res) => {
    res.status(404).send('<h1>404 Nie znaleziono</h1>');
});

function parseStudentData(data) {
    const lines = data.split('\n');
    const student = {
        code: lines[0],
        name: lines[1],
        lastname: lines[2],
        gender: lines[3],
        age: lines[4],
        studyField: lines[5]
    };
    return student;
}

function stringifyStudentData(studentData) {
    return `${studentData.code}\n${studentData.name}\n${studentData.lastname}\n${studentData.gender}\n${studentData.age}\n${studentData.studyField}`;
}
