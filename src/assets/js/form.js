document.addEventListener("DOMContentLoaded", function (event) {
    let form = document.querySelectorAll('form')

    form.forEach(function (el) {

        function validate(form) {
            let validate = false
            let inputs = form.querySelectorAll('input[type="text"]:not([name="index"]), input[type="password"]')
            let emailInput = form.querySelector('[name="email"]')
           
           

            inputs.forEach(function (input) {
                let errorHTML = input.parentNode.querySelector('.input_error')
                if(input.value.trim() !== ''){
                    validate = true
                    input.parentNode.classList.remove('error')
                    input.parentNode.parentNode.classList.remove('error')
                    errorHTML.classList.remove('active')
                } else {
                    validate = false
                    input.parentNode.classList.add('error')
                    input.parentNode.parentNode.classList.add('error')
                    errorHTML.classList.add('active')
                    errorHTML.innerHTML = "Поле обязательно для заполнения"
                }
            })


            function checkEmail(input) {
                let errorHTML = input.parentNode.querySelector('.input_error')
                console.log(errorHTML)
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(input.value.trim())) {
                    validate = true
                    input.parentNode.classList.remove('error')
                    errorHTML.classList.remove('active')
                }else {
                    validate = false
                    input.parentNode.classList.add('error')
                    errorHTML.classList.add('active')
                    errorHTML.innerHTML = "Неверный формат E-mail"
                }
            }

            checkEmail(emailInput) 

            return validate
            
        }

        el.addEventListener('submit', async function (e) {
            e.preventDefault()
            let formData = new FormData(this)
            let url = this.getAttribute('action')
            
            console.log(url)
            console.log(...formData)

            if( validate(this)) {
                let response = await fetch('/ajax/order', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: formData
                });
    
                let result = await response.json();
            }
         
        })

        let inputs = document.querySelectorAll('.order_input input, .order_textarea textarea, .input input')

        inputs.forEach(function (el) {
            el.addEventListener('focus', function () {
                let label = this.parentNode.parentNode.querySelector('label')
                
                if(label) {
                    label.classList.add('active')
                }
                this.parentNode.classList.add('focus')
            })
            el.addEventListener('blur', function () {
                let label = this.parentNode.parentNode.querySelector('label')
                if (this.value == false && label) {
                    label.classList.remove('active')
                }
                this.parentNode.classList.remove('focus')
            })
        })
    })


})