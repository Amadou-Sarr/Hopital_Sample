import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};




export function signin(singinRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(singinRequest)
    });
}

export function changepass(changePassword) {
    return request({
        url: API_BASE_URL + "/auth/changepass",
        method: 'POST',
        body: JSON.stringify(changePassword)
    });
}


export function createUser(CreateUtilisateur) {
    return request({
        url: API_BASE_URL + "/utilisateur/admin/create",
        method: 'POST',
        body: JSON.stringify(CreateUtilisateur)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}


export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/auth/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/auth/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/utilisateur/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/utilisateur/" + username,
        method: 'GET'
    });
}
