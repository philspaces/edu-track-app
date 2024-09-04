import axios from 'axios';

const API_BASE_URL = 'https://e3k1u4orz1.execute-api.ap-southeast-2.amazonaws.com/prod/auth';

// TODO store&retrieve accessToken from localStorage
const apiRequest = async (endpoint, method, data) => {
    try {
        const response = await axios({
            method: 'POST',
            url: API_BASE_URL,
            data: {
                ...data,
                operation: endpoint
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const signUp = async (username, password, email) => {
    if (!username || !password) {
        throw new Error('username and password are required.');
    }
    return await apiRequest('signup', 'POST', {username, password, email});
};

export const verifyAccount = async (username, code) => {
    if (!username || !code) {
        throw new Error('username and password are required.');
    }
    return await apiRequest('signup', 'POST', {username, code});
};

export const login = async (username, password) => {
    if (!username || !password) {
        throw new Error('username and password are required.');
    }
    return await apiRequest('login', 'POST', {username, password});
};

export const logout = async (accessToken) => {
    return await apiRequest('logout', 'POST', accessToken);
};

export const getUser = async (accessToken) => {
    return await apiRequest('getUser', 'POST', accessToken);
};