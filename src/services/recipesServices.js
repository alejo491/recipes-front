import { baseUrl } from "../utils/config";


const getRecipes = (token) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    return fetch(`${baseUrl}/recipes/list`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

const getRecipe = (token, id) => {
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    return fetch(`${baseUrl}/recipes/${id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

const deleteRecipe = (token, id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };

    return fetch(`${baseUrl}/recipes/${id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

const createRecipe = (token, form) => {
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        body: form
    };

    return fetch(`${baseUrl}/recipes`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
}

const updateRecipe = (token, id, form) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`
        },
        body: form
    };

    return fetch(`${baseUrl}/recipes/${id}`, requestOptions)
        .then(handleResponse)
        .then(data => {
            return data;
        });
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
export const recipesService = {
    getRecipes,
    getRecipe,
    deleteRecipe,
    createRecipe,
    updateRecipe,
};