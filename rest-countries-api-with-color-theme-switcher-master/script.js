// Variables 
const switchBtn = document.querySelector('.header__btn')
const cardsDiv = document.querySelector('.cards')
const selectMenu = document.querySelector('.dropdown')
const inputResearch = document.querySelector('.research')
let allCountries, ctrl = 0

// Dark / Light Theme
document.body.setAttribute('data-theme', localStorage.getItem('data-theme'))

switchBtn.addEventListener('click', () => {
    if (document.body.getAttribute('data-theme') === 'dark') {
        document.body.setAttribute('data-theme', 'light')    
    } else {
        document.body.setAttribute('data-theme', 'dark')    
    }

    localStorage.setItem('data-theme', document.body.getAttribute('data-theme'))
})

// Display the first eight cards
const displayHTML = country => {
    const cardDiv = document.createElement('div')
    cardDiv.classList.add('card') 

    const img = document.createElement('img') 
    img.classList.add('card__image')
    img.src = country.flags.svg

    const cardContentDiv = document.createElement('div')
    cardContentDiv.classList.add('card__content')
    
    const h1 = document.createElement('h1') 
    h1.classList.add('title') 
    h1.textContent = country.name.common
    
    const descDiv = document.createElement('div')
    descDiv.classList.add('desc')

    const pOne = document.createElement('p')
    pOne.innerHTML = `Population: <span>${Number(country.population).toLocaleString()}</span>`
    const pTwo = document.createElement('p')
    pTwo.innerHTML = `Region: <span>${country.region}</span>`
    const pThree = document.createElement('p')
    pThree.innerHTML = `Capital: <span>${country.capital}</span>`

    descDiv.append(pOne, pTwo, pThree)
    cardContentDiv.append(h1, descDiv)
    cardDiv.append(img, cardContentDiv)

    cardsDiv.appendChild(cardDiv)
}

// Filter 
selectMenu.addEventListener('change', () => {
    const cards = document.querySelectorAll('.card')
    const selectedOption = selectMenu.options[selectMenu.selectedIndex].text

    if (selectedOption === 'Filter by Region') {
        cards.forEach(card => {
            card.style.display = 'block'
            card.style.pointerEvents = 'all'
        })

        return
    }


    for (const card of cards) {
        const region = card.children[1].children[1].children[1].childNodes[1].textContent

        card.style.display = 'none'
        card.style.pointerEvents = 'none'

        if (region === selectedOption) {
            card.style.display = 'block'
            card.style.pointerEvents = 'all'
        }
    }
})

// Searching countries
inputResearch.addEventListener('input', () => {
    const cards = document.querySelectorAll('.card')
    const userText = inputResearch.value.toLowerCase()

    allCountries.forEach(country => {
        if (userText === country.name.common.toLowerCase() || userText === country.name.official.toLowerCase()) {
            ctrl++

            for (const card of cards) {        
                card.style.display = 'none'
                card.style.pointerEvents = 'none'
            }

            
            displayHTML(country)
            cardInformation()
        } else if ((userText === ' ' || userText === '') && ctrl > 0) {
            ctrl = 0

            cardsDiv.removeChild(cardsDiv.children[cardsDiv.children.length - 1])

            for (const card of cards) {        
                card.style.display = 'block'
                card.style.pointerEvents = 'all'
            }
        }  
    })
})

// Card informations
const cardCreation = country => {
    const main = document.querySelector('main')
    main.classList.add('active')

    const section = document.createElement('section')

    const button = document.createElement('button')
    button.classList.add('section__btn')
    button.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> Back`

    const sectionContainerDiv = document.createElement('div')
    sectionContainerDiv.classList.add('section__container')

    const a = document.createElement('a')
    a.setAttribute('href', country.maps.googleMaps)
    a.setAttribute('target', '_blank')

    const flagImage = document.createElement('img')
    flagImage.classList.add('information-image')
    flagImage.src = country.flags.svg

    a.appendChild(flagImage)

    const sectionContentDiv = document.createElement('div')
    sectionContentDiv.classList.add('section__content')
    
    const h1 = document.createElement('h1')
    h1.classList.add('title')
    h1.textContent = country.name.common

    const cardInformationDiv = document.createElement('div')
    cardInformationDiv.classList.add('card-information')

    const nativeName = document.createElement('p')
    nativeName.innerHTML = `Official Name: <span>${Object.values(country.name.nativeName)[0].official}</span>`
    
    const population = document.createElement('p')
    population.innerHTML = `Population: <span>${Number(country.population).toLocaleString()}</span>`

    const capital = document.createElement('p')
    capital.innerHTML = `Capital: <span>${country.capital}</span>`
    
    const continent = document.createElement('p') 
    continent.innerHTML = `Region: <span>${country.continents}</span>`

    const subRegion = document.createElement('p')
    subRegion.innerHTML = `Sub Region: <span>${country.subregion}</span>`

    const tld = document.createElement('p')
    tld.innerHTML = `Top Level Domain: <span>${country.tld.join(', ')}</span>`

    const currencies = document.createElement('p')
    currencies.innerHTML = `Currencies: <span>${Object.values(country.currencies)[0].name}</span>`

    const languages = document.createElement('p')
    languages.innerHTML = `Languages: <span>${Object.values(country.languages).join(', ')}</span>`

    cardInformationDiv.append(nativeName, population, capital, continent, subRegion, tld, currencies, languages)
    
    const sectionWrapperDiv = document.createElement('div')
    sectionWrapperDiv.classList.add('section__wrapper')
    
    const h3 = document.createElement('h3')
    h3.classList.add('border__title')
    h3.textContent = 'Border Countries: '

    const borderCountriesDiv = document.createElement('div')
    borderCountriesDiv.classList.add('border-countries')
    
    if (!country.borders) {
        const p = document.createElement('p')
        p.classList.add('countries')
        p.textContent = 'There are no border countries here'
        borderCountriesDiv.appendChild(p)
    } else {
        for (const border of country.borders) {
            const p = document.createElement('p')
            p.classList.add('countries')
            p.textContent = border
    
            borderCountriesDiv.appendChild(p)
        }
    }

    sectionWrapperDiv.append(h3, borderCountriesDiv)

    sectionContentDiv.append(h1, cardInformationDiv, sectionWrapperDiv)

    sectionContainerDiv.append(a, sectionContentDiv)

    section.append(button, sectionContainerDiv)
    
    document.body.appendChild(section)

    button.addEventListener('click', () => {
        main.classList.remove('active')
        document.body.removeChild(section)
        
        if (document.body.children.length > 3) {
            main.classList.add('active')
        }
    })
}

const cardInformation = () => {
    const cards = document.querySelectorAll('.card')

    cards.forEach(card => {
        card.addEventListener('click', () => {
            allCountries.forEach(country => {
                if (country.name.common === card.children[1].children[0].textContent || country.name.official === card.children[1].children[0].textContent) {
                    cardCreation(country)
                }            
            })
        })
    })
}

// Calling the api
fetch('https://restcountries.com/v3.1/all')
.then(response => response.json())
.then(data => {
    allCountries = data

    let ar = []

    for (let i = 0; ar.length - 1 != 7; i++) {
        let x = Math.floor(Math.random() * data.length - 1)

        if (ar[i] !== x) {
            ar.push(x) 
            displayHTML(data[x])
        }
    }

    cardInformation()
})
.catch(console.log)