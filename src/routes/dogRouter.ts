import { Router } from 'express';

const router = Router();

import {
  getAllDogs,
  getDog,
  createDog,
  editDog,
  deleteDog,
} from '../controllers/dogController.js';

/* router.get('/', getAllDogs);
router.get('/', getDog);
router.patch('/', editDog);
router.post('/', createDog);
router.delete('/', deleteDog); */
router.route('/').get(getAllDogs).post(createDog);
router.route('/:id').get(getDog).patch(editDog).delete(deleteDog);

export default router;
