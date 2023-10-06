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
    connection.query('SELECT event_id, event_name, DATE_FORMAT(event_date, "%M %e, %Y") AS formatted_event_date, venue, description, total_volunteers FROM events', (error, eventResults) => {
        if (error) {
            console.error(error);
            return res.status(500).render('error', { error: 'Error retrieving events from the database.' });
        }
        res.status(200).render('events', { events: eventResults }); // Render events.ejs with eventResults data
    });
});


// Route to handle event creation
router.post('/create', (req, res) => {
    const { event_name, event_date, venue, description, total_volunteers } = req.body;

    // Perform the insertion operation in your database
    connection.query(
        'INSERT INTO events (event_name, event_date, venue, description, total_volunteers) VALUES (?, ?, ?, ?, ?)',
        [event_name, event_date, venue, description, total_volunteers],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).render('error', { error: 'Error creating event.' });
            }
            // Redirect to a success page or back to the events list page after insertion
            res.redirect('/events');
        }
    );
});

router.put('/update', (req, res) => {
    const { event_id, event_name, event_date, venue, description, total_volunteers } = req.body;

    // Perform the update operation in your database
    connection.query(
        'UPDATE events SET event_name=?, event_date=?, venue=?, description=?, total_volunteers=? WHERE event_id=?',
        [event_name, event_date, venue, description, total_volunteers, event_id],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).render('error', { error: 'Error updating event.' });
            }
            // Redirect to a success page or back to the events list page after updating
            res.redirect('/events');
        }
    );
});

// Route to handle event deletion
router.delete('/delete', (req, res) => {
    const eventId = req.body.event_id;

    // Perform the delete operation in your database
    connection.query('DELETE FROM events WHERE event_id = ?', [eventId], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).render('error', { error: 'Error deleting event.' });
        }
        // Redirect to a success page or back to the events list page after deleting
        res.redirect('/events');
    });
});

module.exports = router;
