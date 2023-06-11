import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

const server = process.env.AZURE_SQL_SERVER;
const database = process.env.AZURE_SQL_DATABASE;
const port = parseInt(process.env.AZURE_SQL_PORT);
const user = process.env.AZURE_SQL_USER;
const password = process.env.AZURE_SQL_PASSWORD;
const encryptSecret = process.env.ENCRYPT_SECRET;
export const config = {
    server,
    port,
    database,
    user,
    password,
    encryptSecret,

    options: {
        encrypt: true
    },
};