import { config } from 'dotenv';

config();

const { CNB_ENDPOINT: cnbEndpoint } = process.env;

export const externalConfig = {
    cnbEndpoint: cnbEndpoint ?? '',
};
