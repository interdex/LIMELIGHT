document.addEventListener("DOMContentLoaded", function (event) {
    let header = document.querySelector('header')
    let headerSubNav = document.querySelectorAll('.header_subnav')
    let lastScrollTop = 0;
    let headerHover = false;

    // HEADER STICKY SCROLL
    window.addEventListener('scroll', () => {
        st = window.pageYOffset || document.documentElement.scrollTop;
        if (!header.classList.contains('active')) {
            if (st > lastScrollTop) {
                // downscroll code
                if (window.scrollY > window.innerHeight) {
                    header.classList.remove('fixed')
                    header.classList.add('sticky')
                } else if (window.innerHeight - window.scrollY >= 1 && window.innerHeight - window.scrollY <= 200) {
                    // header.classList.add('fixed')
                    // header.classList.remove('sticky')
                } else {
                    header.classList.remove('fixed')
                    header.classList.remove('sticky')
                }
            } else {
                // upscroll code
                if (window.scrollY > window.innerHeight) {
                } else if (window.innerHeight - window.scrollY >= 1 && window.innerHeight - window.scrollY <= window.innerHeight - 20) {
                    header.classList.add('fixed')
                    header.classList.remove('sticky')
                } else {
                    header.classList.remove('fixed')
                    header.classList.remove('sticky')
                }
            }
            lastScrollTop = st <= 0 ? 0 : st
        }
    })

    // HEADER SUB_LINKS

    let headerLinks = document.querySelectorAll('.header_nav >ul >li > a')

    function headerHoverActive() {
        header.classList.add('active')
        header.classList.remove('fixed')
        headerHover = true
    }
    function headerHoverDisabled() {
        header.classList.remove('active')
        header.classList.remove('fixed')
        headerHover = false
    }
    headerLinks.forEach((el, i) => {
        el.addEventListener('mouseenter', () => {
            headerLinks.forEach((elem, index) => {
                elem.parentNode.lastElementChild.classList.remove('active')
            })
            headerHoverActive()
            el.parentNode.lastElementChild.classList.add('active')
            header.classList.add('transition')
            headerBasketPopup.classList.remove('active')

        })
        header.addEventListener('mouseleave', () => {
            headerHoverDisabled()
            el.parentNode.lastElementChild.classList.remove('active')
            if (window.screen.availWidth >= 768) {
                headerBasketPopup.classList.remove('active')
            }
            header.classList.remove('transition')
        })
    })

    let burger = document.querySelector('.header_mobile')
    burger.addEventListener('click', function () {
        this.classList.toggle('active')
        document.querySelector(".header_nav-mobile").classList.toggle('active')
    })

    //HEADER BASKET POPUP

    //Detect if otherNode is contained by refNode
    function isParent(refNode, otherNode) {
        var parent = otherNode.parentNode;
        do {
            if (refNode == parent) {
                return true;
            } else {
                parent = parent.parentNode;
            }
        } while (parent);
        return false;
    }

    let headerBasket = document.querySelectorAll('.header_basket')
    let headerBasketPopup = document.querySelector('.basket_popup')
    headerBasket.forEach(function (el) {
        if (window.screen.availWidth >= 768) {
            el.addEventListener('mouseover', function () {
                headerHoverActive()
                headerBasketPopup.classList.add('active')
                header.classList.add('transition')
                headerSubNav.forEach(function (el) {
                    el.classList.remove('active')
                })
            })
        } else {
            el.addEventListener('click', function () {
                header.classList.toggle('active')
                header.classList.remove('fixed')
                headerBasketPopup.classList.toggle('active')
                header.classList.add('transition')
                headerSubNav.forEach(function (el) {
                    el.classList.remove('active')
                })
            })
        }

    })
    if (window.screen.availWidth >= 768) {
        // headerBasketPopup.addEventListener('mouseout', function (ev) {
        //     if (!isParent(this, ev.relatedTarget) && ev.target == this) {
        //         //Event handling code here
        //         headerBasketPopup.classList.remove('active')
        //     }
        // }, false)
    }

//HEADER SEARCH POPUP
let headerSearchBtn = document.querySelectorAll('.header_search')
let searchPopupInput = document.querySelector('.search_popup input')
let searchPopup = document.querySelector('.search_popup')
let searchPopupClose = document.querySelector('.search_popup-close')

headerSearchBtn.forEach(function (el) {
    el.addEventListener('click', function () {
        console.log(this)
        searchPopup.classList.add('active')
        setTimeout(() => {
            searchPopupInput.focus()
        }, 100);
    })
})
searchPopupClose.addEventListener('click', function () {
    searchPopup.classList.remove('active')
})

})