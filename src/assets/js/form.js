document.addEventListener("DOMContentLoaded", function (event) {
    let form = document.querySelector('.js-order-form')

    form.addEventListener('submit', async function (e) {
        let formData = new FormData(this)
        e.preventDefault()
        
        console.log(...formData)
        let response = await fetch('/ajax/order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: formData
          });
          
        let result = await response.json();
    })

    let inputs = document.querySelectorAll('.order_input input, .order_textarea textarea')

    inputs.forEach(function (el){
        el.addEventListener('focus', function () {
            this.parentNode.parentNode.querySelector('label').classList.add('active')
        })
        el.addEventListener('blur', function () {
            if(this.value == false) {
                this.parentNode.parentNode.querySelector('label').classList.remove('active')
            }
        })
    })
})