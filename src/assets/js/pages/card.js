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
        var calc = ((1) / (slick.slideCount)) * 100;
        $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);
      });
      $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var calc = ((nextSlide + 1) / (slick.slideCount)) * 100;

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
  function getElementIndex(elem) {
    elem = elem.tagName ? elem : document.querySelector(elem) // можно добавить еще проверок
    return [].indexOf.call(elem.parentNode.children, elem)
  }

  function initAddToBasket() {
    let addtobasketForm = document.querySelector('.addtobasket')
    let addtobasketSelects = document.querySelectorAll('.card_select-current')
    let addtobasketDrops = document.querySelectorAll('.card_select-all')
    let temp = ""

    Array.from(addtobasketDrops).forEach(function (elOption) {
      elOption.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.querySelector('.card_select-value').innerHTML = e.target.textContent
        e.target.parentNode.parentNode.querySelector('input').value = e.target.textContent
        e.target.parentNode.parentNode.querySelector('.card_select-current').classList.remove('active')
        e.target.parentNode.parentNode.querySelector('.card_select-all').classList.remove('active')
        e.target.innerHTML = temp
      });
    });

    addtobasketSelects.forEach(function (el) {
      el.addEventListener('click', function () {
        let cp = this.parentNode
        addtobasketDrops.forEach(function (elem, index) {
          if (getElementIndex(cp) != index) {
            elem.classList.remove('active')
          }
        })
        addtobasketSelects.forEach(function (elem, index) {
          if (getElementIndex(cp) != index) {
            elem.classList.remove('active')
          }
        })

        this.classList.toggle('active')
        this.parentNode.querySelector('.card_select-all').classList.toggle('active')
        temp = this.querySelector('.card_select-value').innerHTML.replace(/\s/g, '');

      })
    })


    let footerMobile = document.querySelector('.footer-mobile')

    window.addEventListener('scroll', () => {
      sidebarScrollDown()
      sidebarScrollTop()
      if (window.screen.availWidth <= 768) {
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


  // SCROLL SIDEBAR TO DOWN

  function sidebarScrollDown() {
    let also = document.querySelector('.also')
    let sidebar = document.querySelector('.card_right')
    if (also && elementInViewport2(also)) {
      sidebar.scrollTop = Math.ceil(sidebar.scrollHeight - sidebar.clientHeight)
    }
  }

  function sidebarScrollTop() {
    let header = document.querySelector('.header')
    let sidebar = document.querySelector('.card_right')
    if (header && elementInViewport2(header)) {
      sidebar.scrollTop = 0
    }
  }



})