import bcrypt from "bcryptjs";
import { config } from '../config/config';


export default class passEcrypt {

    Secret = config.encryptSecret;
    rounds = 3;



    async encrypt(pass: string) {
        return await bcrypt.hash(pass, this.rounds);
    }


    async decrypt(pass: string, hash: string) {
        return bcrypt.compare(pass, hash);
    }

}