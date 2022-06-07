// Variables 
// ---------- Mobile Menu 
const openBtn = document.querySelector('.open-btn')
const closeBtn = document.querySelector('.close-btn')
const nav = document.querySelector('.nav-links')

// ---------- Shopping Cart  
const cartIcon = document.querySelector('.cart-icon')
const cart = document.querySelector('.cart')

// ---------- Counter 
const number = document.querySelector('.number')
const minusBtn = document.querySelector('.minus-btn')
const plusBtn = document.querySelector('.plus-btn')
let counter = 0

// ---------- Img Gallery
const mainImg = document.querySelector('.main-img')
const thumnailImgs = document.querySelectorAll('main .thumb')
const previousBtn = document.querySelector('.previous')
const nextBtn = document.querySelector('.next')
let imgPosition = 1

// ---------- Adding Elements To The Shopping Cart 
const addToCartBtn = document.querySelector('.btn-add-to')
const elementPrice = document.querySelector('.price')
const items = document.querySelector('.elements')
const products = document.querySelector('.products')
const purchaseBtn = document.createElement('div') 
purchaseBtn.classList.add('purchase-btn')
purchaseBtn.textContent = 'Checkout'

// ---------- Zoom-in
const section = document.querySelector('section ')

// Coding 
// ---------- Mobile Menu 
openBtn.addEventListener('click', () => {
    document.body.setAttribute('data-menu', 'open')
    nav.classList.add('active')

    window.addEventListener('touchstart', ({ target: { nodeName } }) => {
        if (nodeName === 'HEADER' || nodeName === 'BODY') {
            document.body.removeAttribute('data-menu')
            nav.classList.remove('active')
        }
    })
})

closeBtn.addEventListener('click', () => {
    document.body.removeAttribute('data-menu')
    nav.classList.remove('active')
})

// ---------- Shopping Cart  
cartIcon.addEventListener('click', () => {
    cart.classList.toggle('active')
})

// ---------- Counter 
plusBtn.addEventListener('click', () => {
    counter++
    number.textContent = counter
})

minusBtn.addEventListener('click', () => {
    if (counter > 0) counter--
    number.textContent = counter
})

// ---------- Img Gallery Desktop
thumnailImgs.forEach(img => {
    img.addEventListener('click', (e) => {
        const src = img.getAttribute('src').replace("-thumbnail", "")
        
        mainImg.src = src
    })
})

// ---------- Img Gallery Mobile
previousBtn.addEventListener('click', () => {
    imgPosition > 1 ? imgPosition-- : imgPosition = 4

    mainImg.src = `./images/image-product-${imgPosition}.jpg`
})

nextBtn.addEventListener('click', () => {
    imgPosition < 4 ? imgPosition++ : imgPosition = 1

    mainImg.src = `./images/image-product-${imgPosition}.jpg`
})

// ---------- Adding Elements To The Shopping Cart 
addToCartBtn.addEventListener('click', () => {
    if (counter === 0) return 
    
    // HTML Structure
    if (products.children[0].tagName === 'P') {
        products.removeChild(document.querySelector('.void'))
    }

    const li = document.createElement('li') 

    const img = document.createElement('img')
    img.classList.add('elem-img')
    img.setAttribute('alt', 'Element image')
    img.src = mainImg.src

    const infoContainer = document.createElement('div')
    infoContainer.classList.add('info-container')
    
    const title = document.createElement('p') 
    title.classList.add('title')
    title.textContent = 'Autumn Limited Edition...'

    const desc = document.createElement('p')
    desc.classList.add('desc')
    desc.innerHTML = `<span class="price">${elementPrice.textContent}</span> x 
                      <span class="times">${counter}</span> 
                      <span class="total-price">$${counter * Number(elementPrice.textContent.slice(1))}</span>`

    infoContainer.append(title, desc)

    const deleteBtn = document.createElement('img')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.setAttribute('alt', 'Delete btn')
    deleteBtn.src = './images/icon-delete.svg'

    li.append(img, infoContainer, deleteBtn)

    items.appendChild(li)

    
    if (items.childElementCount === 1) {
        products.appendChild(purchaseBtn)
    }

    counter = 0
    number.textContent = counter

    deleteBtn.addEventListener('click', () => {
      items.removeChild(li)  
      
      if (items.childElementCount === 0) {
            products.removeChild(purchaseBtn)

            const voidParagraph = document.createElement('p')
            voidParagraph.classList.add('void')
            voidParagraph.textContent = 'Your cart is empty.'
          
            products.insertBefore(voidParagraph, items)
      }
    })
})

// ---------- Zoom-in
if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    mainImg.addEventListener('click', () => {
        section.classList.add('active')
        document.body.setAttribute('data-menu', 'open')

        const sectionMainImg = document.querySelector('section .main-img')
        const sectionPreviousBtn = document.querySelector('section .previous')
        const sectionNextBtn = document.querySelector('section .next')
        const sectionThumbnailImg = document.querySelectorAll('section .thumb')
        const closeSectionBtn = document.querySelector('section .close-btn')


        sectionMainImg.src = mainImg.src
        
        sectionPreviousBtn.addEventListener('click', () => {
            imgPosition > 1 ? imgPosition-- : imgPosition = 4
        
            sectionMainImg.src = `./images/image-product-${imgPosition}.jpg`
        })
        
        sectionNextBtn.addEventListener('click', () => {
            imgPosition < 4 ? imgPosition++ : imgPosition = 1
        
            sectionMainImg.src = `./images/image-product-${imgPosition}.jpg`
        })       
        
        sectionThumbnailImg.forEach(img => {
            img.addEventListener('click', (e) => {
                const src = img.getAttribute('src').replace("-thumbnail", "")
                
                sectionMainImg.src = src
            })
        })
    
        closeSectionBtn.addEventListener('click', () => {
            section.classList.remove('active')
            document.body.removeAttribute('data-menu')
        })
    })
}