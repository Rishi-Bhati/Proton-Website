const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config(); // To use environment variables from a .env file

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

// Route to handle form submission
app.post('/api/submit', async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Send data to Web3Forms API
    const response = await axios.post('https://web3forms.com/api/submit', {
      name,
      email,
      message
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.WEB3FORMS_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Check response status and send appropriate message
    if (response.status === 200) {
      res.send('Form submitted successfully');
    } else {
      res.status(response.status).send('Failed to submit form');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).send('Error submitting form');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
