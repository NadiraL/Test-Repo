// var express = require('express');
// const app = express();
// app.use(express.json());
 
// app.get('/', function (req, res) {
//     console.log("GET Request Received");
//     res.send(`
// <h2 style= "font-family: Malgun Gothic; color: blue; "> Welcome to Edureka's Express.js Tutorial!/h2>`);
// })
 
// app.post('/addcourse', function (req, res) {
//     console.log("POST Request Received");
//     res.send(`
// <h2 style="font-family: Malgun Gothic; color: green; ">A course new Course is Added!</h2>
 
// `);
// })
// app.delete('/delete', function (req, res) {
//     console.log("DELETE Request Received");
//     res.send(`
// <h2 style="font-family: Malgun Gothic; color: darkred;">A Course has been Deleted!!</h2>
 
//  `);
// })
// app.get('/course', function (req, res) {
//     console.log("GET Request received for /course URI");
//     res.send(`
// <h2 style="font-family: Malgun Gothic; color:blue;">This is an Available Course!</h2>
 
// `);
// })
 
// //PORT ENVIRONMENT VARIABLE
// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listening on port ${port}..`));

// 

const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());
 
const books = [
{title: 'Desperate Characters', id: 1},
{title: 'The Count of Monte Cristo', id: 2},
{title: 'The Three Musketeers', id: 3},
{title: 'Moby Dick', id: 4}
]
 
//READ Request Handlers
app.get('/', (req, res) => {
res.send('This is the home page');
});
 
app.get('/api/books', (req,res)=> {
res.send(books);
});
 
app.get('/api/books/:id', (req, res) => {
    console.log(req.params)
const book = books.find(c => c.id === parseInt(req.params.id));
console.log(book);
if (!book) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
res.send(book);
});
 
//CREATE Request Handler
app.post('/api/books', (req, res)=> {
 
const { error } = validateBook(req.body);
if (error){
res.status(400).send(error.details[0].message)
return;
}

const book = {
id: books.length + 1,
title: req.body.title
};

books.push(book);
res.send(book);
});
 
//UPDATE Request Handler
app.put('/api/books/:id', (req, res) => {
const book = books.find(c=> c.id === parseInt(req.params.id));
if (!book) res.status(404).send(`<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>`);
 
const { error } = validateBook(req.body);
if (error){
res.status(400).send(error.details[0].message);
return;
}
 
book.title = req.body.title;
res.send(book);
});
 
//DELETE Request Handler
app.delete('/api/books/:id', (req, res) => {
 
const book = books.find( c=> c.id === parseInt(req.params.id));
if(!book) res.status(404).send(`<h2 style="font-family: Malgun Gothic; color: darkred;"> Not Found!! </h2>`);
 
const index = books.indexOf(book);
books.splice(index,1);
 
res.send(book);
});
 
function validateBook(book) {
const schema = {
title: Joi.string().min(3).required()
};
 
return Joi.validate(book, schema);
 
}
 
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
