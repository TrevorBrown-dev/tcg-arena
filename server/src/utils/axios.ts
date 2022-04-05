import axios from 'axios';

export const compiler = axios.create({
    baseURL: 'http://compiler:6969',
});
