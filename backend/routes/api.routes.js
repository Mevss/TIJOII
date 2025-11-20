import express from 'express';
import * as apiController from '../controllers/api.controller.js';

const router = express.Router();

router.get('/search', apiController.searchMedia);
router.get('/details/:source/:id', apiController.getMediaDetails);
router.post('/validate-tmdb-key', apiController.validateTmdbKey);

export default router;
