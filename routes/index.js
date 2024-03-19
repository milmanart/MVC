const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

router.post('/student', (req, res) => {
    const studentData = req.body;
    const studentId = studentData.code;


    fs.writeFile(`student_data/${studentId}.txt`, JSON.stringify(studentData), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Błąd podczas zapisywania danych studenta.');
            return;
        }
        console.log('Dane studenta zostały pomyślnie zapisane.');
    });


    res.render('student', { student: studentData });
});

module.exports = router;
