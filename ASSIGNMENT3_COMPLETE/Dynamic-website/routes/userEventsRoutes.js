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
    connection.query('SELECT event_id, event_name, DATE_FORMAT(event_date, "%M %e, %Y") AS formatted_event_date, venue, total_volunteers FROM events', (error, eventResults) => {
        if (error) {
            console.error(error);
            return res.status(500).render('error', { error: 'Error retrieving events from the database.' });
        }

        const formattedEvents = eventResults.map((event, index) => {
            return {
                ...event,
                eventNumber: index + 1
            };
        });
        res.status(200).render('userEvents', { events: formattedEvents });
    });
});


router.post('/create', (req, res) => {
    const { eventId } = req.body;
    
    // Perform the insertion operation in your database
    connection.query(
        'INSERT INTO user_events (event_id) VALUES (?)',
        [eventId],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Error volunteering for the event.' });
            }
            // Volunteer successfully added to the user_events table
            res.redirect('/plan');
        }
    );
});

router.delete('/delete', (req, res) => {
    const { eventId } = req.body;
    
    // Perform the delete operation in your database
    connection.query('DELETE FROM user_events WHERE event_id = ?', [eventId], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error canceling volunteering for the event.' });
        }
        // Volunteer successfully removed from the user_events table
        res.redirect('/userEvents');
    });
});
module.exports = router;
