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
  //ПЕРЕДЕЛАТЬ НА СВОЙСКИЙ
  let config = {
    showDelay: 100,
    style: {
      padding: '2px 20px',
      backgroundColor: '#000000',
      color: '#fff',
      fontSize: 12,
      opacity: 0.8,
      transform: 'translateY(10px)',
      transition: "0.3s",
    },
    hiddenStyle: {

    },
    visibleStyle: {
      transform: 'translateY(0px)',
      opacity: 1
    }
  }

  tooltip(config)


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
      $('.card_images').slick({
        dots: false,
        arrows: false,
        pauseOnDotsHover: false,
        pauseOnHover: false,
        pauseOnFocus: false
      })

      // function setProgress(index) {
      //   const calc = ((index + 1) / ($slider.slick('getSlick').slideCount)) * 100;

      //   $progressBar
      //     .css('background-size', `${calc}% 100%`)
      //     .attr('aria-valuenow', calc);

      //   $progressBarLabel.text(`${calc.toFixed(2)}% completed`);
      // }

      // const $slider = $('.slider');
      // const $progressBar = $('.progress');
      // const $progressBarLabel = $('.slider__label');

      // $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      //   setProgress(nextSlide);
      // });

      // $slider.slick({
      //   slidesToShow: 3,
      //   slidesToScroll: 1,
      //   speed: 400,
      // });

      // setProgress(0);


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
        // addtobasketDrops.forEach( function(elem, index){
        //   elem.classList.remove('active')
        // })
        // addtobasketSelects.forEach( function(elem, index){
        //   elem.classList.remove('active')
        // })

        this.parentNode.querySelector('.card_select-all').classList.toggle('active')
        addtobasketOptions.forEach(function (el) {
          el.addEventListener('click', function () {
            temp = this.parentNode.parentNode.querySelector('.card_select-value').innerHTML.replace(/\s/g, '');
            this.parentNode.parentNode.querySelector('input').value = this.innerHTML.replace(/\s/g, '');
            this.parentNode.parentNode.querySelector('.card_select-value').innerHTML = this.innerHTML
            this.innerHTML = temp
            console.log(temp)
            //innerHTML.replace(/\s/g, '');
          })
        })
      })
    })

  }

  initAddToBasket()

})