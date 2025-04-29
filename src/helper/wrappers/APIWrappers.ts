import axios from 'axios';
import endpoints from '../APIConstants/endpoints';
import { log } from 'console';
import { getEnv } from '../env/env';
require('dotenv').config({ override: true })
getEnv();

export default class ApiHelper {
    static async get(endpoint: string, headers = {}) {
        log("Headers are :: ", headers);
        log("endpoint is :: ", endpoint);
        log("endpoint is :: ", apiClient.toString());
        return await apiClient.get(endpoint, { headers });
    }

    static async post(endpoint: string, data = {}, headers = {}) {
        return await axios.post(endpoint, data, { headers });
    }

    static async put(endpoint: string, data = {}, headers = {}) {
        return await axios.put(endpoint, data, { headers });
    }

    static async delete(endpoint: string, headers = {}) {
        return await axios.delete(endpoint, { headers });
    }
}


export const apiClient = axios.create({
    baseURL: process.env.API_Base_Url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AccessToken}`,

    },
});

