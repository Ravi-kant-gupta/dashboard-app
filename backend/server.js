const express = require('express');
const mysql = require('mysql2');
// const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3307 ;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// EndPoint-- project.ct80wmq0it39.ap-south-1.rds.amazonaws.com
//- port 3306

const db = mysql.createConnection({
  host: 'project.ct80wmq0it39.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'raviKant1995',
  database: 'dashboarddb',
  port: 3306,
  connectTimeout: 30000
});

db.connect(err => {
  if (err) {
      console.error('Error connecting to the database:', err);
      return;
  }
  console.log('Connected to the database');

  // Execute the create table query
  // db.query(createTableQuery, (err, createResults) => {
  //     if (err) {
  //         console.error('Error creating table:', err);
  //         db.end();
  //         return;
  //     }
  //     console.log('Table created successfully:', createResults);
      // Execute the insert data query
      // db.query(insertQuery, (err, insertResults) => {
      //     if (err) {
      //         console.error('Error inserting data:', err);
      //     } else {
      //         console.log('Data inserted successfully:', insertResults);
      //     }
          // // Close the db
          // db.end();
      //});
  //});
});



// CRUD endpoints
// app.get('/get', (req, res) => {
//   db.query('SELECT * FROM dashboard_tbl', (err, results) => {
//     if (err){ throw err};
//     console.log(results);
//     res.send(results);
//   });
// });

app.get('/api/dashboard', (req, res) => {
  db.query('SELECT * FROM dashboard_tbl', (err, results) => {
    if (err) throw err;
    console.log(results)
    res.json(results);
  });
});

app.post('/api/dashboard', (req, res) => {
  const { menu_heading, menu_name, menu_under, enable_yn } = req.body;
  const menuid = uuidv4();
  db.query('INSERT INTO dashboard_tbl (menuid, menu_heading, menu_name, menu_under, enable_yn) VALUES (?, ?, ?, ?, ?)',
    [menuid, menu_heading, menu_name, menu_under, enable_yn], (err, results) => {
      if (err) throw err;
      res.json({ id: menuid });
    });
});
app.put('/api/dashboard/:id', (req, res) => {
  const { id } = req.params;
  const { menu_heading, menu_name, menu_under, enable_yn } = req.body;
  db.query('UPDATE dashboard_tbl SET menu_heading = ?, menu_name = ?, menu_under = ?, enable_yn = ? WHERE menuid = ?',
    [menu_heading, menu_name, menu_under, enable_yn, id], (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

app.delete('/api/dashboard/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM dashboard_tbl WHERE menuid = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add other CRUD endpoints...

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
