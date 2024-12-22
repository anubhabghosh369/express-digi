import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body;
    const newTea = { id: nextId++, name, price };
    teaData.push(newTea);
    res.status(201).send(newTea);
});

// Home route
app.get("/", (req, res) => {
    res.send("Hello from Anubhab and his tea");
});

// Ice tea route
app.get("/ice-tea", (req, res) => {
    res.send("What ice tea would you prefer?");
});

// Twitter route
app.get("/twitter", (req, res) => {
    res.send("anu.com");
});

// Tea route
app.get("/tea", (req, res) => {
    res.send("Here is your tea!");
});

// Get all teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
});

// Get tea by id
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    res.status(200).send(tea);
});

// Update tea by id
app.put('/teas/:id', (req, res) => {
    const teaId = req.params.id;
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send('Tea not found');
    }
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
});

// Delete tea by id
app.delete('/teas/:id', (req, res) => {
    // Find the index of the tea with the given ID
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id));

    // If no tea is found, return 404
    if (index === -1) {
        return res.status(404).send('Tea not found');
    }

    // Remove the tea from the array
    teaData.splice(index, 1);

    // Respond with a success message
    res.status(204).send('Deleted');
});

app.listen(port, () => {
    console.log(`Server is running at port : ${port}...`);
});