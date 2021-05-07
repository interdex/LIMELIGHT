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
})