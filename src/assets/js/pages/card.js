import '../common.js'
import '../header.js'
import '../../styles/pages/card.sass'
import '../../styles/components/also.sass'

import fslightbox from 'fslightbox'
import tooltip from 'tooltip'
import $ from 'jquery'
import slick from 'slick-carousel'

document.addEventListener("DOMContentLoaded", function (event) {

  // TOOLTIP 

  class Tooltip {

    constructor(color) {
      // вызывает сеттер
      this.color = color;
    }

    init() {
      let tooltip = document.createElement('div')
      tooltip.classList.add('tooltip')
      tooltip.innerHTML = this.color.dataset.tooltip
      this.color.appendChild(tooltip)
      this.hoverHandler()
    }

    hoverHandler() {
      this.color.addEventListener('mouseenter', function () {
        this.querySelector('.tooltip').classList.add('active')
      })
      this.color.addEventListener('mouseout', function () {
        this.querySelector('.tooltip').classList.remove('active')
      })
    }

  }

  let tooltips = []
  document.querySelectorAll('.js-tooltip').forEach(function (el) {
    tooltips.push(new Tooltip(el).init())
  })


  // ACCORDION

  let accordion = document.querySelectorAll('[name="accordion"]')
  let isChecked = [];

  accordion.forEach((el, index) => {
    isChecked.push(el.checked)
    el.addEventListener("click", (e) => {
      if (isChecked[index]) {
        el.checked = false
      }
      isChecked[index] = el.checked
      isChecked.forEach((elem, inx) => {
        if (inx != index) {
          isChecked[inx] = false
        }
      })
    })
  })

  //MOBILE SLIDER 
  function initCardSlider() {
    if (window.screen.availWidth <= 768) {


      var $slider = $('.card_images');
      var $progressBar = $('.card_progress');

      $slider.on('init', function (event, slick, currentSlide, nextSlide) {
        console.log('init')
        var calc = ((1) / (slick.slideCount )) * 100;
          $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);
        });
      $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var calc = ((nextSlide+1) / (slick.slideCount )) * 100;

        $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);

      });

      $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 400,
        dots: false,
        arrows: false,
        pauseOnDotsHover: false,
        pauseOnHover: false,
        pauseOnFocus: false,
      });

    }
  }

  initCardSlider()

  //ADD TO BASKET
  function initAddToBasket() {
    let addtobasketForm = document.querySelector('.addtobasket')
    let addtobasketSelects = document.querySelectorAll('.card_select-current')
    let addtobasketDrops = document.querySelectorAll('.card_select-all')
    let addtobasketOptions = document.querySelectorAll('.card_select-all span')

    addtobasketSelects.forEach(function (el) {
      el.addEventListener('click', function () {
        this.classList.toggle('active')
        let temp = el.querySelector('.card_select-value').innerHTML.replace(/\s/g, '');

     

        this.parentNode.querySelector('.card_select-all').classList.toggle('active')
        addtobasketOptions.forEach(function (el) {
          el.addEventListener('click', function () {
            temp = this.parentNode.parentNode.querySelector('.card_select-value').innerHTML.replace(/\s/g, '');
            this.parentNode.parentNode.querySelector('input').value = this.innerHTML.replace(/\s/g, '');
            this.parentNode.parentNode.querySelector('.card_select-value').innerHTML = this.innerHTML
            this.innerHTML = temp
            //innerHTML.replace(/\s/g, '');
              el.parentNode.parentNode.querySelector('.card_select-current').click()
              // addtobasketDrops.forEach( function(elem, index){
              //   elem.classList.remove('active')
              // })
              // addtobasketSelects.forEach( function(elem, index){
              //   elem.classList.remove('active')
              // })
          })
        })
       
        
      })
    })

    let footerMobile = document.querySelector('.footer-mobile')

    window.addEventListener('scroll', () => {
      if(window.screen.availWidth <= 768) {
        if (elementInViewport2(footerMobile)) {
          addtobasketForm.style.display = 'none';
        } else {
          addtobasketForm.style.display = 'flex';
        }
      }
      
    })


  }

  initAddToBasket()


  function elementInViewport2(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    );
  }



})