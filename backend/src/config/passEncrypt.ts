import bcrypt from "bcryptjs";
import { config } from '../config/config';
import CryptoJS from "crypto-js";


export default class PassEcrypt {

    Secret = config.encryptSecret;
    rounds = 3;



    async encrypt(pass: string) {
        return CryptoJS.AES.encrypt(pass, this.Secret).toString();
    }


    async decrypt(hash: string) {
        return CryptoJS.AES.decrypt(hash, this.Secret).toString(CryptoJS.enc.Utf8);
    }

}