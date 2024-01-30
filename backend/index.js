const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs').promises;

const PORT = 5000;
const PRODUCTS_FILE_PATH = './products.json';

app.use(express.json());
app.use(cors());

app.get('/api/products', async (req, res) => {
  try {
    const data = await getDataFromFile();
    res.json(data);
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/products', async (req, res) => {
  const { email, password } = req.body;

  // Perform validation (you might want to add more checks)
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const data = await getDataFromFile();

    // Create a new user object
    const newUser = {
      Email: email,
      Password: password,
    };

    // Add the new user to the existing data
    data.push(newUser);

    // Save the updated data back to the products.json file
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(data, null, 2));

    // Respond with the new user data
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error handling signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

async function getDataFromFile() {
  const content = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
  return JSON.parse(content);
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

