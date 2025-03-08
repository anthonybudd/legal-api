import { NextFunction, Request, Response } from "express";

export default (field: string) => async (req: Request, res: Response, next: NextFunction) => {

    if (!req.files || !req.files[field]) {
        return res.status(422).json({
            errors: {
                [field]: {
                    location: "body",
                    param: field,
                    msg: "You must provide a PDF file"
                }
            }
        });
    }

    const file = req.files[field];

    if (Array.isArray(file)) {
        return res.status(422).json({
            errors: {
                [field]: {
                    location: "body",
                    param: field,
                    msg: "You must provide a single PDF file"
                }
            }
        });
    }

    if (file.mimetype !== 'application/pdf') {
        return res.status(422).json({
            errors: {
                [field]: {
                    location: "body",
                    param: field,
                    msg: "File must be a PDF"
                }
            }
        });
    }

    return next();
};