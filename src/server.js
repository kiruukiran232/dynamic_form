const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 5000;

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3300, // Your MySQL port number
  user: 'root',
  password: 'Kiran@232',
  database: 'entities',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});

app.use(bodyParser.json());

// POST handler for /api/entity
app.post('/api/entity', (req, res) => {
  const { name, email, mobileNumber, dateOfBirth } = req.body;
  const entity = { name, email, mobileNumber, dateOfBirth };
  connection.query('INSERT INTO entities SET ?', entity, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving entity');
    } else {
      res.status(200).send('Entity saved successfully');
    }
  });
});

// GET handler for /api/entity to retrieve data from the 'entities' table
app.get('/api/entity', (req, res) => {
  // Query to select all rows from the 'entities' table
  const query = 'SELECT * FROM entities';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error retrieving entities');
    } else {
      // Generate HTML table with retrieved entities
      let table = '<table style="border-collapse: collapse;">';
      table += '<tr><th style="border: 1px solid #dddddd; padding: 8px;">Name</th><th style="border: 1px solid #dddddd; padding: 8px;">Email</th><th style="border: 1px solid #dddddd; padding: 8px;">Mobile Number</th><th style="border: 1px solid #dddddd; padding: 8px;">Date of Birth</th></tr>';
      results.forEach(row => {
        table += `<tr><td style="border: 1px solid #dddddd; padding: 8px;">${row.name}</td><td style="border: 1px solid #dddddd; padding: 8px;">${row.email}</td><td style="border: 1px solid #dddddd; padding: 8px;">${row.mobileNumber}</td><td style="border: 1px solid #dddddd; padding: 8px;">${row.dateOfBirth}</td></tr>`;
      });
      table += '</table>';

      // Send the generated HTML table as response
      res.status(200).send(table);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
