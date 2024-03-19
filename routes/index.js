const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

router.post('/student', (req, res) => {
    const studentData = req.body;

    // Zapis danych do pliku .txt
    const studentId = studentData.code;
    fs.writeFile(path.join(__dirname, '..', 'student_data', `${studentId}.txt`), JSON.stringify(studentData), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Błąd podczas zapisywania danych studenta.');
            return;
        }
        console.log('Dane studenta zostały pomyślnie zapisane w pliku.');
    });

    // Przekierowanie na stronę student.html z przekazanymi danymi
    res.render('student', { student: studentData });
});

module.exports = router;
