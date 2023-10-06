const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const connection = require('../db'); // Import your database connection module

router.use((req, res, next) => {
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }
    next();
});

router.get('/', (req, res) => {
    connection.query('SELECT * FROM volunteer', (error, volunteerResults) => {
        if (error) {
            console.error(error);
            return res.status(500).render('error', { error: 'Error retrieving volunteers from the database.' });
        }
        res.status(200).render('volunteer', { volunteer: volunteerResults }); // Render volunteer.ejs with volunteerResults data
    });
});

router.post('/create', (req, res) => {
    const { fname, sname, email, phone } = req.body;

    connection.query(
        'INSERT INTO volunteer (fname, sname, email, phone) VALUES (?, ?, ?, ?)',
        [fname, sname, email, phone],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).render('error', { error: 'Error creating volunteer.' });
            }
            res.redirect('/volunteer');
        }
    );
});

router.get("/email", (req, res) => {
    connection.query("SELECT * volunteer_id, fname, sname,email FROM volunteer", (error, volunteerResults) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .render("error", {
            error: "Error retrieving volunteers from the database.",
          });
      }
      res.status(200).render("volunteer", { volunteer: volunteerResults }); // Render volunteer.ejs with volunteerResults data
    });
  });




router.post("/email/send",(req,res) => {
    const { userEmail, subject, content } = req.body;
    let config = {
        service: 'gmail',
        auth: {
          user: 'buleyashukuran@gmail.com',
          pass: 'ogkw jewu foni idly',
        },
      };
    
      let transporter = nodemailer.createTransport(config);
    
      // Create a simple email body with subject and text content
      let message = {
        from: 'GROUP 3 <buleyashukuran@gmail.com>',
        to: userEmail,
        subject: subject,
        text: content,
      };
    
      transporter.sendMail(message).then(() => {
            res.redirect('/volunteer');
        })
        .catch((error) => {
          return res.status(500).json({ error });
        });
  })



router.put('/update', (req, res) => {
    const { volunteer_id, fname, sname, email, phone } = req.body;

    connection.query(
        'UPDATE volunteer SET fname=?, sname=?, email=?, phone=? WHERE volunteer_id=?',
        [fname, sname, email, phone, volunteer_id],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).render('error', { error: 'Error updating volunteer.' });
            }
            res.redirect('/volunteer');
        }
    );
});

router.delete('/delete', (req, res) => {
    const volunteerId = req.body.volunteer_id;

    connection.query('DELETE FROM volunteer WHERE volunteer_id = ?', [volunteerId], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).render('error', { error: 'Error deleting volunteer.' });
        }
        res.redirect('/volunteer');
    });
});

module.exports = router;
