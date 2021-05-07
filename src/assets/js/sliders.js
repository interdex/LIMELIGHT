import $ from 'jquery'
import slick from 'slick-carousel'

document.addEventListener("DOMContentLoaded", function(event) { 
    $('.inst_slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        speed: 500,
        fade: false,
        cssEase: 'ease-in-out',
        // autoplay: true,
        // autoplaySpeed: 1000,
        pauseOnDotsHover: false,
        pauseOnFocus: false,
        pauseOnHover: false
    });
});