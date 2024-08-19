import express, { response } from 'express'

const app = express()

const PORT = 3001


// Define routes here:

app.get('/', (req, res) => {
  res.send('<h1>This is Rahmis gambling app</h1>');
});

app.get('/home', (req, res) => {
    res.send('<h1>Hello World!</h1>');
  });
  

  app.get('/greetings/:username', (req, res) => {
 let username = req.params.username
  
    // Sending a response with the parameter
    res.send(`<h1>What a delight it is to see you once more, ${username}”</h1>`);
  });
  
  function messageOutput(number) {
    console.log(typeof number)
    if (isNaN(number)) {
      return 'You must specify a number'
    } 
    if (number) {
      const min = 0;
      const max = number; // The maximum number in the range
    
      // Generate a random number and round it down to the nearest whole number
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    
      // Log the random number to the console
      console.log(randomNumber);
      return `You rolled ${randomNumber}`
    }
  }
  
  app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
    const message = messageOutput(number);
    res.send(message);
  });


  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


function pickOne(collectibles, index) {

  if (index >= 0 && index < collectibles.length) {
    let item = collectibles[index];
    return `So you want ${item.name}, For $${item.price}, it can be yours!`;
  } else {
    return `This item is not yet in stock. Check back soon!`;
  }
}

app.get('/collectibles/:index', (req, res) => {
  const index = parseInt(req.params.index, 10); // Convert index from string to number
  const response = pickOne(collectibles, index);
  res.send(response);
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  const minPrice = parseFloat(req.query['min-price']);
  const maxPrice = parseFloat(req.query['max-price']);
  const type = req.query['type'];

  if (!isNaN(minPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  if (!isNaN(maxPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
  }

  res.json(filteredShoes);
});

app.listen(PORT, () =>{
    console.log(`Listening to PORT: localhost/${PORT}`)
})