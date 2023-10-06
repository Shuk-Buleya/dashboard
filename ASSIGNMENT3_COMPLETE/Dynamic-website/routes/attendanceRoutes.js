const express = require('express');
const router = express.Router();
const connection = require('../db'); // Import your database connection module

router.use((req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
});
router.get('/', (req, res) => {
    // Retrieve events, volunteers, and associated user events from the database
    connection.query(`
        SELECT a.attendance_id, e.event_name, CONCAT(v.fname, ' ', v.sname) AS volunteer_name, a.role_id, r.role_name,
        DATE_FORMAT(a.check_in, "%H:%i:%s") AS check_in,
        DATE_FORMAT(a.check_out, "%H:%i:%s") AS check_out
        FROM attendance a
        LEFT JOIN events e ON a.event_id = e.event_id
        LEFT JOIN volunteer v ON a.volunteer_id = v.volunteer_id
        LEFT JOIN roles r ON a.role_id = r.role_id;
    `, (error, attendanceResults) => {
        if (error) {
            console.error(error);
            // Handle the error (e.g., log it) without rendering it in the view
            return res.status(500).render('error', { error: 'Error retrieving attendance records from the database.' });
        }

        // Retrieve total attendance count separately
        connection.query('SELECT COUNT(*) AS total_attendance FROM attendance', (error, countResults) => {
            if (error) {
                console.error(error);
                // Handle the error (e.g., log it) without rendering it in the view
                return res.status(500).render('error', { error: 'Error retrieving total attendance count from the database.' });
            }

            // Pass both attendance records and total attendance count to the template
            res.status(200).render('attendance', {
                attendance: attendanceResults,
                totalAttendanceCount: countResults[0].total_attendance
            });
        });
    });
});


module.exports = router;
