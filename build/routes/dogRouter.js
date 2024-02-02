import { Router } from 'express';
const router = Router();
import { getAllDogs, getDog, createDog, editDog, deleteDog, } from '../controllers/dogController.js';

router.route('/').get(getAllDogs).post(createDog);
router.route('/:id').get(getDog).patch(editDog).delete(deleteDog);
export default router;