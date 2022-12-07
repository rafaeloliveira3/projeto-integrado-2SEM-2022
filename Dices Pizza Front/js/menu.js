'use strict'
const menu = document.querySelector('.menu-burguer-container')

const menuAction = () => {
    menu.classList.toggle ('show')
}

menu.addEventListener('click', menuAction)