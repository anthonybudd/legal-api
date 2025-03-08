import { body, validationResult, matchedData } from 'express-validator';
import passport from './../providers/Passport';
import Document from './../models/Document';
import middleware from './middleware';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';

export const app = express.Router();


/**
 * POST /api/v1/upload
 * 
 * Upload a Document
 */
app.post('/upload', [
    passport.authenticate('jwt', { session: false }),
    body('groupID').optional().isString(),
    body('name').optional().isString(),
], async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });
    const data = matchedData(req);

    if (!req.files || !req.files['file']) {
        return res.status(422).json({
            errors: {
                file: {
                    location: "body",
                    param: "file",
                    msg: "You must provide a PDF file"
                }
            }
        });
    }

    const file = req.files['file'];

    if (Array.isArray(file)) {
        return res.status(422).json({
            errors: {
                file: {
                    location: "body",
                    param: "file",
                    msg: "You must provide a single PDF file"
                }
            }
        });
    }

    if (file.mimetype !== 'application/pdf') {
        return res.status(422).json({
            errors: {
                file: {
                    location: "body",
                    param: "file",
                    msg: "File must be a PDF"
                }
            }
        });
    }

    const id = uuidv4();
    const document = await Document.create({
        id,
        groupID: req.body.groupID || req.user.groupID,
        name: data.name || file.name,
        filePath: `s3://${process.env.BUCKET_NAME}/${id}.pdf`,
        size: file.size,
        mimeType: file.mimetype,
    });


    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    s3.upload({
        Bucket: process.env.BUCKET_NAME || '',
        Key: `${id}.pdf`,
        Body: file.data,
    }, (err: Error | null) => {
        if (err) return next(err);
    });


    return res.json(document);
});


/**
 * GET /api/v1/documents
 * 
 */
app.get('/documents', [
    passport.authenticate('jwt', { session: false })
], async (req: express.Request, res: express.Response) => {
    return res.json(
        await Document.findAll({
            where: {
                groupID: req.user.groupID
            }
        })
    );
});


/**
 * GET /api/v1/documents/:documentID
 * 
 */
app.get('/documents/:documentID', [
    passport.authenticate('jwt', { session: false }),
    middleware.canAccessDocument,
], async (req: express.Request, res: express.Response) => {
    const document = await Document.findByPk(req.params.documentID, {
        rejectOnEmpty: true
    });

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    });

    const s3Stream = s3.getObject({
        Bucket: process.env.BUCKET_NAME || '',
        Key: `${document.id}.pdf`
    }).createReadStream();

    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${document.name}"`);

    s3Stream.pipe(res);
});



/**
 * DELETE /api/v1/documents/:documentID
 * 
 * Delete Document
 */
app.delete('/documents/:documentID', [
    passport.authenticate('jwt', { session: false }),
    middleware.hasRole('Admin'),
], async (req: express.Request, res: express.Response) => {
    await Document.destroy({
        where: {
            id: req.params.documentID,
        }
    });

    return res.json({ id: req.params.documentID });
});
