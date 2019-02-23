import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

export const APPLICATION_PATH = `http://pw85.pl/insuranceapi/public/index.php`;

const API_ROOT = `${APPLICATION_PATH}/api`;

const responseBody = response => response.body;

let token = null;

const tokenPlugin = secured => {
    return (request) => {

        if (token && secured) {
            request.set('Authorization', `Bearer ${token}`);
        }
    };
};

export const requests = {
        get: (url, secured = false) => {
            return superagent.get(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody);
        },
        post: (url, body = null, secured = true) => {
            return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin(secured)).then(responseBody)
        },

        delete: (url, secured = true) => {
            return superagent.del(`${API_ROOT}${url}`).use(tokenPlugin(secured)).then(responseBody)
        },

        setToken: (newJwtToken) => token = newJwtToken
    }
;
