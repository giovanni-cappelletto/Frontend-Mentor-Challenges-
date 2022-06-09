// Variables
const openMenuBtn = document.querySelector('.open-btn')
const closeMenuBtn = document.querySelector('.close-btn')
const nav = document.querySelector('nav')

// Code 
openMenuBtn.addEventListener('click', () => {
    nav.classList.add('active')
})

closeMenuBtn.addEventListener('click', () => {
    nav.classList.remove('active')
})

if (window.innerWidth >= 600 && window.innerWidth < 1050) {
    const span = document.querySelectorAll('span[data-visible="true"')

    span.forEach(element => {
        element.setAttribute('data-visible', 'false')
    })
}