const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const connection = require('../db');

router.get("/reportchart", (req, res) => {
    connection.query("SELECT event_name,total_volunteers FROM events", (error, eventResults) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .render("error", {
            error: "Error retrieving data from the database.",
          });
      }
      res.status(200).render("report", { reports: eventResults }); // Render volunteer.ejs with volunteerResults data
    });
  });

  module.exports = router;
