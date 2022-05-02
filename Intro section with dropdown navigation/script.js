const openMenuBtn = document.querySelector('.open') 
const closeMenuBtn = document.querySelector('.close')
const navLinksWithDataSet = document.querySelectorAll('.nav-links[data-arrow="down"]')
const dropdownMenus = document.querySelectorAll('.dropdown')
const nav = document.querySelector('nav')

openMenuBtn.addEventListener('click', () => {
    nav.classList.add('active')
    document.body.setAttribute('data-before', 'true')
})

closeMenuBtn.addEventListener('click', () => {
    nav.classList.remove('active')
    document.body.setAttribute('data-before', 'false')
})

navLinksWithDataSet.forEach(navLink => {
    navLink.addEventListener('click', () => {

        if (navLink.getAttribute('data-arrow') === 'down') {
            navLink.setAttribute('data-arrow', 'up')
        } else {
            navLink.setAttribute('data-arrow', 'down')
        }

        dropdownMenus.forEach(dropdown => {
            if (dropdown.parentElement === navLink.parentElement) {
                dropdown.classList.toggle('active')
            }
        })
    })
})

window.addEventListener('touchstart', ({ target }) => {
    if (target.tagName === 'BODY') {
        nav.classList.remove('active')
        document.body.setAttribute('data-before', 'false')
    }
})