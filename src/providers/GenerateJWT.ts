import { UserModel } from './../models/User';
import { SignOptions, sign } from 'jsonwebtoken';
import * as fs from 'fs';

export default (user: UserModel, signOptions: SignOptions) => {

    const u = user.toJSON() as any; // AB: not great.

    const payload = {
        id: u.id,
        email: u.email,
        groupID: u.groups[0].id,
    };

    signOptions.algorithm = 'RS512';

    return sign(
        payload,
        fs.readFileSync(process.env.PRIVATE_KEY_PATH || '/app/private.pem', 'utf8'),
        signOptions
    );
};
