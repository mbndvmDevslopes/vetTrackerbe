import { nanoid } from 'nanoid';
let dogs = [
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
export const getAllDogs = async (req, res) => {
    res.status(200).json({ dogs });
};
export const createDog = async (req, res) => {
    const data = req.body;
    if (!data.name || !data.sex || !data.breed) {
        return res.status(400).json({ msg: 'Please provide name, sex and breed' });
    }
    const id = nanoid(5);
    const newDog = req.body;
    newDog.id = id;
    dogs.push(newDog);
    res.status(201).json({ msg: 'data received', newDog });
};
export const getDog = async (req, res) => {
    const { id } = req.params;
    const dog = dogs.find((dog) => dog.id === id);
    if (!dog) {
        throw new Error('no job with that id');
        return res.status(404).json({ msg: `No dog found with ${id}` });
    }
    res.status(200).json({ dog });
};
export const editDog = async (req, res) => {
    const data = req.body;
    if (!data.sex || !data.breed) {
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
};
export const deleteDog = async (req, res) => {
    const { id } = req.params;
    const dog = dogs.find((dog) => dog.id === id);
    if (!dog) {
        return res.status(404).json({ msg: `No dog found with id of ${id}` });
    }
    const newDogs = dogs.filter((dog) => dog.id !== id);
    dogs = newDogs;
    res.status(200).json({ msg: 'dog deleted' });
};
//# sourceMappingURL=dogController.js.map