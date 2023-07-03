var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { config } from '../config/config';
import CryptoJS from "crypto-js";
export default class passEcrypt {
    constructor() {
        this.Secret = config.encryptSecret;
        this.rounds = 3;
    }
    encrypt(pass) {
        return __awaiter(this, void 0, void 0, function* () {
            return CryptoJS.AES.encrypt(pass, this.Secret).toString();
        });
    }
    decrypt(hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return CryptoJS.AES.decrypt(hash, this.Secret).toString(CryptoJS.enc.Utf8);
        });
    }
}
//# sourceMappingURL=passEncrypt.js.map