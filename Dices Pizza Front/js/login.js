'use strict'

import { loginValidation } from './fetchs/admFetch.js';

const login = async (e) => {
    e.preventDefault()
    const json = {
        usuario : document.querySelector('#usuario').value,
        senha : document.querySelector('#senha').value
    }
    const id = await loginValidation(json)
    console.log(typeof(id));
    if (typeof(id) == 'number') {
        localStorage.setItem('admId', id)
        location.replace('./pages/dashboard.html')
    }
    else {
        alert('Usuário e/ou Senha incorretos')
    }

}

document.querySelector('#login').addEventListener('submit', login)