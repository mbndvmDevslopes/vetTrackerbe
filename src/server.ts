import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { nanoid } from 'nanoid';

import morgan from 'morgan';

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

type Dog = {
  id: string;
  name: string;
  breed: string;
  sex: string;
};
let dogs: Dog[] = [
  {
    id: nanoid(),

    sex: 'M',
    name: 'Clement',
    breed: 'poodle',
  },
  {
    id: nanoid(),

    sex: 'M',
    name: 'Saxon',
    breed: 'Poodle',
  },
];
//GET ALL DOGS
app.get('/dogs', (req, res) => {
  res.status(200).json({ dogs });
});

//CREATE DOG
app.post('/dogs', (req, res) => {
  const data = req.body;
  if (!data.name || !data.sex || !data.breed) {
    return res.status(400).json({ msg: 'Please provide name, sex and breed' });
  }

  const id = nanoid(5);
  const newDog: Dog = req.body;
  newDog.id = id;
  dogs.push(newDog);
  res.status(201).json({ msg: 'data received', newDog });
});

//GET SINGLE DOG
app.get('/dogs/:id', (req, res) => {
  const { id } = req.params;
  const dog = dogs.find((dog) => dog.id === id);
  if (!dog) {
    throw new Error('no job with that id');
    return res.status(404).json({ msg: `No dog found with ${id}` });
  }
  res.status(200).json({ dog });
});

//EDIT DOG
app.patch('/dogs/:id', (req, res) => {
  const data = req.body;
  if (!data.name || !data.sex || !data.breed) {
    return res.status(400).json({ msg: 'Please provide name, sex and breed' });
  }
  const { id } = req.params;
  const dog = dogs.find((dog) => dog.id === id);
  if (!dog) {
    return res.status(404).json({ msg: `No dog found with ${id}` });
  }
  dog.breed = data.breed;
  dog.name = data.name;
  dog.sex = data.sex;
  res.status(200).json({ msg: 'dog changed', dog });
});

//DELETE DOG
app.delete('/dogs/:id', (req, res) => {
  const { id } = req.params;
  const dog = dogs.find((dog) => dog.id === id);
  if (!dog) {
    return res.status(404).json({ msg: `No dog found with id of ${id}` });
  }
  const newDogs = dogs.filter((dog) => dog.id !== id);
  dogs = newDogs;
  res.status(200).json({ msg: 'dog deleted' });
});

//NOT FOUND ROUTE MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
  next();
});

const port = process.env.PORT || 5100;
app.listen(port, () => console.log(`Server running on port ${port}`));
