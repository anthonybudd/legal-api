import { NextFunction, Request, Response } from "express";
import Document from './../../models/Document';
import GroupUser from './../../models/GroupUser';

export default async (req: Request, res: Response, next: NextFunction) => {
    let documentID = (req.params.documentID || req.body.documentID);

    const document = await Document.findByPk(documentID, {
        rejectOnEmpty: true,
    });

    const groupUsers = await GroupUser.findOne({
        where: {
            userID: req.user.id,
            groupID: document.groupID,
        },
    });

    if (groupUsers) {
        return next();
    }

    return res.status(401).json({
        msg: `You do not have access to document ${documentID}`,
        code: 65196,
    });
};
