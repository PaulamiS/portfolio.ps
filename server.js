// server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  const newEntry = { name, email, message, date: new Date().toISOString() };

  // Save to file (you can use a real database too)
  fs.readFile('contacts.json', 'utf8', (err, data) => {
    const contacts = data ? JSON.parse(data) : [];
    contacts.push(newEntry);
    fs.writeFile('contacts.json', JSON.stringify(contacts, null, 2), err => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to save contact.');
      }
      res.send('Contact saved successfully!');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
