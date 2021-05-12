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
    headerLinks.forEach( (el, i) => {
        el.addEventListener('mouseenter', () => {
            headerLinks.forEach( (elem, index) => {
                console.log(elem)
                elem.parentNode.lastElementChild.classList.remove('active')
            })
            header.classList.add('active')
            el.parentNode.lastElementChild.classList.add('active')
        })
        header.addEventListener('mouseleave', () => {
            header.classList.remove('active')
            el.parentNode.lastElementChild.classList.remove('active')
        })
    })

    let burger = document.querySelector('.header_mobile')
    burger.addEventListener('click', function() {
        this.classList.toggle('active')
    })

})