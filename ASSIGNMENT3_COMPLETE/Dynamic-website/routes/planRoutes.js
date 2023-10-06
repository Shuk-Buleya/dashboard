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
        SELECT ue.event_id, e.event_name, DATE_FORMAT(e.event_date, "%M %e, %Y") AS formatted_event_date, e.venue
        FROM user_events ue
        JOIN events e ON ue.event_id = e.event_id
    `, (error, eventResults) => {
        if (error) {
            console.error(error);
            // Handle the error (e.g., log it) without rendering it in the view
            return res.status(500).render('error', { error: 'Error retrieving events from the database.' });
        }

        res.status(200).render('plan', { events: eventResults });
    });
});

module.exports = router;
