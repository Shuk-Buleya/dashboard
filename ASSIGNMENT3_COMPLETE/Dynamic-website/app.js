const express = require('express');
const methodOverride = require('method-override');
const pdf = require('html-pdf');
const path = require('path');
const app = express();



const connection = require('./db'); // Import your database connection module
const planRoutes = require('./routes/planRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const volunterRoutes = require('./routes/volunteerRoutes');
const userEventsRoutes = require('./routes/userEventsRoutes');
const attendancRoutes = require('./routes/attendanceRoutes');
const reportRoutes = require('./routes/reportRoutes');
//const reportRoutes = require('/routes/reportRoutes');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));


app.use('/plan', planRoutes);
app.use('/events', eventsRoutes);
app.use('/volunteer', volunterRoutes);
app.use('/userEvents', userEventsRoutes);
app.use('/attendance', attendancRoutes);
app.use('/reportchart',reportRoutes)
//app.use('/report', reportRoutes);


app.get('/', (req, res) => {
    res.render('index');
});
    
app.get("/reportchart", (req, res) => {
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
