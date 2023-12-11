import * as Joi from 'joi';

export const joiConfig = {
    validationSchema: Joi.object({
        EXCHANGE_RATE_LIFETIME_MS: Joi.number().default(300000),
        EXCHANGE_RATE_BANK_URL: Joi.string().uri().required(),
    }),
};
