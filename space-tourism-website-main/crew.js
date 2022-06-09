// Variables 
const dotList = document.querySelectorAll('.dot')
const crewImg = document.querySelector('.person')
const title = document.querySelector('.title')
const desc = document.querySelector('.desc')

// Main function
const displayHTMLContent = (data) => {
    dotList.forEach(dot => {
        dot.addEventListener('click', () => {
            for (const dot of dotList) {
                dot.classList.remove('focused')
            }    
    
            dot.classList.add('focused')



            const person = data[Number(dot.classList[1][dot.classList[1].length - 1])]

            crewImg.src = person.images.png
            title.textContent = person.name 
            title.setAttribute('data-content', person.role)
            desc.textContent = person.bio
        })    
    })    
}

// Fetching informations
fetch('data.json')
.then(response => response.json())
.then(data => data['crew'])
.then(displayHTMLContent)