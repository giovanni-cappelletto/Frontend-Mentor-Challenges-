// Variables 
const planetList = document.querySelectorAll('.planet-list li')
const planetImg = document.querySelector('.planet')
const title = document.querySelector('.title')
const desc = document.querySelector('.desc')
const distance = document.querySelector('.distance')
const time = document.querySelector('.time')

// Main function
const displayHTMLContent = (data) => {
    planetList.forEach(planet => {
        planet.addEventListener('click', () => {
            for (const userPlanet of planetList) {
                userPlanet.children[0].classList.remove('focused')
            }    
    
            planet.children[0].classList.add('focused')

            for (const planetData of data) {
                if (planetData.name.toUpperCase() === planet.innerText.toUpperCase()) {
                    planetImg.src = planetData.images.png
                    title.textContent = planetData.name 
                    desc.textContent = planetData.description
                    distance.textContent = planetData.distance.toUpperCase()
                    time.textContent = planetData.travel.toUpperCase()
                }
            }
        })    
    })    
}

// Fetching informations
fetch('data.json')
.then(response => response.json())
.then(data => data['destinations'])
.then(displayHTMLContent)