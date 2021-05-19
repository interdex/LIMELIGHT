import '../common.js'
import '../form.js'
import '../../styles/pages/order.sass'


document.addEventListener("DOMContentLoaded", function (event) {
    let orderInfoBtn = document.querySelector('.order_mobile-left')

    orderInfoBtn.addEventListener("click",function (event) {
        this.querySelector('span').classList.toggle('active')
        this.parentNode.parentNode.querySelector('.order_mobile-content').classList.toggle('active')
    })

    let selects = document.querySelectorAll(".select_current-value")
    let options = document.querySelectorAll('.select_all span')
    let optionsContainer = document.querySelectorAll('.select_all')

        
    selects.forEach(function (el){
        el.addEventListener("click",function (event) {
            let temp = this.innerHTML
            this.parentNode.parentNode.querySelector('.select_all').classList.toggle('active')
            options.forEach(function (el){
                el.addEventListener("click", function (event) {
                    optionsContainer.forEach(function (el) {
                        el.classList.remove('active')
                    })
                    let newValue = this.querySelector('.select_all-option')
                    console.log(this)
                    console.log(newValue)
                    temp = this.parentNode.parentNode.querySelector('.select_current-value').innerHTML
                    this.parentNode.parentNode.querySelector('.select_current-value').innerHTML = this.innerHTML
                    this.parentNode.parentNode.querySelector('input').value = newValue
                    console.log(this.innerHTML)
                    this.innerHTML = temp

                    
                })
            })
        })
    })
})