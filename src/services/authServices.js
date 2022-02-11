import { baseUrl } from "../utils/config";


const login = (user, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user , password })
    };

    return fetch(`${baseUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(userData => {
            localStorage.setItem('user', JSON.stringify(userData));

            return userData;
        });
}

const register = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${baseUrl}/auth/signup`, requestOptions).then(handleResponse);
}


const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }
            
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
export const authService = {
    login,
    register
};