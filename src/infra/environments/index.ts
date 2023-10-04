import * as dotenv from 'dotenv';

dotenv.config();

const PORT: number = +process.env.SERVER_PORT;

const GATEWAY_URL = process.env.GATEWAY_URL;
const AUTHORIZATION = process.env.AUTHORIZATION;

export { PORT, GATEWAY_URL, AUTHORIZATION };
