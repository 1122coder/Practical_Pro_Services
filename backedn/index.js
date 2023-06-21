const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))



// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1999',
  database: 'edu_app',
});


app.get('/', (req, res)=>{
  const sqlInsert= "INSERT INTO contacts(firstName, lastName, email, phone) VALUES('Kashif','Saeed', 'malik@gmail.com', '0312344552')";
  pool.query(sqlInsert, (err, result)=>{
    console.log("Table not modified",err );
    console.log("Table added", result);
    res.send("Inside table cpomtent");
  })
  
})
// Middleware to parse JSON
app.use(express.json());

// Define a route to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, phoneNumber } = req.body;

  // Create a new contact in the database
  pool.query(
    'INSERT INTO contacts (firstName, lastName, email, phone) VALUES (?, ?, ?,?)',
    [firstName, lastName ,email, phoneNumber],
    (error, results) => {
      if (error) {
        console.error('Error while saving contact:', error);
        res.status(500).json({ error: 'Failed to save contact' });
      } else {
        res.json({ message: 'Contact saved successfully' });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
