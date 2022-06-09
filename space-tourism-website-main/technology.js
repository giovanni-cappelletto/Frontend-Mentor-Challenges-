// Variables 
const list = document.querySelectorAll('.list span')
const image = document.querySelector('.image')
const title = document.querySelector('.title')
const desc = document.querySelector('.desc')

// Main function
const displayHTMLContent = (data) => {
    list.forEach(span => {
        span.addEventListener('click', () => {
            for (const span of list) {
                span.classList.remove('focused')
            }    
    
            span.classList.add('focused')


            const technologyData = data[Number(span.textContent) - 1]

            if (window.innerWidth < 1350) {
                image.style.backgroundImage = `url(${technologyData.images.landscape})`
            } else {
                image.style.backgroundImage = `url(${technologyData.images.portrait})`
            }
            
            title.textContent = technologyData.name 
            desc.textContent = technologyData.description
        })    
    })    
}

// Fetching informations
fetch('data.json')
.then(response => response.json())
.then(data => data['technology'])
.then(displayHTMLContent)