import * as dotenv from 'dotenv'

export const getEnv = () => {

    dotenv.config({ path: '.env.shared' });

    dotenv.config({
        override: true,
        path: `src/helper/env/.env.${process.env.ENV}`
    })

}