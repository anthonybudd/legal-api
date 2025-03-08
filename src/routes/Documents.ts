import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/Passport';
import Document from './../models/Document';
import express from 'express';

export const app = express.Router();


/**
 * GET /api/v1/documents
 * 
 */
app.get('/documents', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Document.findAll()
    );
});


/**
 * GET /api/v1/documents/:documentID
 * 
 */
app.get('/documents/:documentID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Document.findByPk(req.params.documentID)
    );
});


/**
 * POST /api/v1/documents
 * 
 * Create Document
 */
app.post('/documents', [
    passport.authenticate('jwt', { session: false }),
    body('name').exists().isString(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    const document = await Document.create({
        name: data.name,
    });

    return res.json(document);
});


/**
 * POST /api/v1/documents/:documentID
 * 
 * Update Document
 */
app.post('/documents/:documentID', [
    passport.authenticate('jwt', { session: false }),
    body('name').exists(),
], async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    await Document.update(data, {
        where: {
            id: req.params.documentID,
        }
    });

    return res.json(await Document.findByPk(req.params.documentID));
});



/**
 * DELETE /api/v1/documents/:documentID
 * 
 * Delete Document
 */
app.delete('/documents/:documentID', [
    passport.authenticate('jwt', { session: false }),
], async (req: express.Request, res: express.Response) => {
    await Document.destroy({
        where: {
            id: req.params.documentID,
        }
    });

    return res.json({ id: req.params.documentID });
});
