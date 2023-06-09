import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}`, debug: true });

const MYSQL_HOST = process.env.AZURE_SQL_SERVER || 'myusicserver.database.windows.net';
const MYSQL_DATABASE = process.env.AZURE_SQL_DATABASE || 'myusic';
const MYSQL_USER = process.env.AZURE_SQL_USER || 'myusic';
const MYSQL_PASS = process.env.AZURE_SQL_PASSWORD || 'Pass12345';

const MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    pass: MYSQL_PASS
};

const SERVER_HOSTNAME = process.env.AZURE_SQL_SERVER || 'myusicserver.database.windows.net';
const SERVER_PORT = 3000;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};

const config = {
    mysql: MYSQL,
    server: SERVER
};

export default config;