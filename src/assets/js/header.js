document.addEventListener("DOMContentLoaded", function(event) {
    let header = document.querySelector('header')
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        st = window.pageYOffset || document.documentElement.scrollTop; 
        if (st > lastScrollTop){
            // downscroll code
            if( window.scrollY > window.innerHeight ) {
                header.classList.remove('fixed')
                header.classList.add('sticky')
            } else if( window.innerHeight - window.scrollY >= 1 && window.innerHeight - window.scrollY <= 200 )  {
                // header.classList.add('fixed')
                // header.classList.remove('sticky')
            } else {
                header.classList.remove('fixed')
                header.classList.remove('sticky')
            }
        } else {
            // upscroll code
            if( window.scrollY > window.innerHeight ) {
            } else if( window.innerHeight - window.scrollY >= 1 && window.innerHeight - window.scrollY <= window.innerHeight - 20 )  {
                header.classList.add('fixed')
                header.classList.remove('sticky')
            } else {
                header.classList.remove('fixed')
                header.classList.remove('sticky')
            }
        }
        lastScrollTop = st <= 0 ? 0 : st
    })

    let headerLinks = document.querySelectorAll('.header_nav >ul >li > a')

    function headerHoverActive() {
        header.classList.add('active')
        header.classList.remove('fixed')
    }
    function headerHoverDisabled() {
        header.classList.remove('active')
        header.classList.remove('fixed')
    }
    headerLinks.forEach( (el, i) => {
        el.addEventListener('mouseenter', () => {
            headerLinks.forEach( (elem, index) => {
                elem.parentNode.lastElementChild.classList.remove('active')
            })
            headerHoverActive()
            el.parentNode.lastElementChild.classList.add('active')
        })
        header.addEventListener('mouseleave', () => {
            headerHoverDisabled()
            el.parentNode.lastElementChild.classList.remove('active')
            headerBasketPopup.classList.remove('active')
        })
    })

    let burger = document.querySelector('.header_mobile')
    burger.addEventListener('click', function() {
        this.classList.toggle('active')
    })
    
    //HEADER BASKET
    let headerBasket = document.querySelectorAll('.header_basket')
    let headerBasketPopup = document.querySelector('.basket_popup')
    headerBasket.forEach(function(el) {
        el.addEventListener('mouseover', function() {
            headerHoverActive()
            headerBasketPopup.classList.add('active')
        })
    })

    //HEADER SEARCH
    let headerSearchBtn = document.querySelectorAll('.header_search')
    let searchPopupInput = document.querySelector('.search_popup input')
    let searchPopup = document.querySelector('.search_popup')
    let searchPopupClose = document.querySelector('.search_popup-close')

    headerSearchBtn.forEach(function(el) {
        el.addEventListener('click', function() {
            searchPopup.classList.add('active')
            setTimeout(() => {
                searchPopupInput.focus()
            }, 100);
        })
    })
    searchPopupClose.addEventListener('click', function() {
        searchPopup.classList.remove('active')
    })
    
})