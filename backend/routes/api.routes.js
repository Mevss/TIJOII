import express from 'express';
import * as apiController from '../controllers/api.controller.js';

const router = express.Router();

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Wyszukiwanie książek lub filmów
 *     tags: [Search]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Fraza do wyszukania
 *       - name: source
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           enum: [openlibrary, tmdb]
 *         description: Źródło danych (openlibrary dla książek, tmdb dla filmów)
 *       - name: apiKey
 *         in: query
 *         schema:
 *           type: string
 *         description: Klucz API TMDB (opcjonalny, wymagany dla źródła tmdb)
 *     responses:
 *       200:
 *         description: Lista wyników wyszukiwania
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 source:
 *                   type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Brak wymaganych parametrów
 *       500:
 *         description: Błąd serwera
 */
router.get('/search', apiController.searchMedia);

/**
 * @swagger
 * /api/details/{source}/{id}:
 *   get:
 *     summary: Pobieranie szczegółów książki lub filmu
 *     tags: [Details]
 *     parameters:
 *       - name: source
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           enum: [openlibrary, tmdb]
 *         description: Źródło danych
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID książki lub filmu
 *       - name: apiKey
 *         in: query
 *         schema:
 *           type: string
 *         description: Klucz API TMDB (opcjonalny)
 *     responses:
 *       200:
 *         description: Szczegóły książki lub filmu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Nieprawidłowe źródło danych
 *       500:
 *         description: Błąd serwera
 */
router.get('/details/:source/:id', apiController.getMediaDetails);

/**
 * @swagger
 * /api/validate-tmdb-key:
 *   post:
 *     summary: Walidacja klucza API TMDB
 *     tags: [Validation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - apiKey
 *             properties:
 *               apiKey:
 *                 type: string
 *                 description: Klucz API TMDB do walidacji
 *     responses:
 *       200:
 *         description: Wynik walidacji klucza
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       400:
 *         description: Brak klucza API w żądaniu
 */
router.post('/validate-tmdb-key', apiController.validateTmdbKey);

export default router;
