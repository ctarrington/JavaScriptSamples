import express from 'express';
import bodyParser from 'body-parser'

const PORT = 3001;
const app = express();
app.use(bodyParser.json());

let count = 0;
const cars = <any>[];

app.get('/cars', (req, res) => res.send(cars));
app.post('/cars', (req, res) => {
    const car = { ...req.body, id: count++ };
    cars.push(car);
    res.send(cars);
});

app.put('/cars/:id', (req, res) => {
    const id = req.params.id;
    const car = { ...req.body, id };
    const index = cars.findIndex((c: any) => '' + c.id === id);

    if (index >= 0) {
        cars[index] = car;
        res.send(cars);
    } else {
        res.status(404).end();
    }
});

app.delete('/cars/:id', (req, res) => {
    const id = req.params.id;
    const index = cars.findIndex((c: any) => '' + c.id === id);

    if (index >= 0) {
        cars.splice(index, 1);
        res.send(cars);
    } else {
        res.status(404).end();
    }
});


app.get('/', (req, res) => res.send(`<h1>cars api listening on port ${PORT}!</h1>
GET /cars</p>
POST /cars with JSON body</p>
PUT /cars/123 with JSON body</p>
DELETE /cars/123
`));


app.listen(PORT, () => console.log(`
cars api listening on port ${PORT}!
    GET /cars
    POST /cars with JSON body
    PUT /cars/123 with JSON body
    DELETE /cars/123
    `));
