import '../common'
import '../header'
import '../../styles/pages/search.sass'
import '../../styles/components/breadcrumbs.sass'

document.addEventListener("DOMContentLoaded", function (event) {

    class Search {

        constructor(input) {
          // вызывает сеттер
          this.input = input;
          
        }

        init() {
            let submitHandler =  this.submitHandler.bind(this)

            this.input.addEventListener('keyup', async function (e) {
                let searchHTML = document.querySelector('.search_title')
                let response = await fetch('/ajax/search.json');
                let result = await response.json();
                let resultContainer  = this.parentNode.parentNode.querySelector('.search_result')
                let items = ""
                let nofound = false
                let searchValue;
                searchHTML.innerHTML = "ПОИСК ПО САЙТУ"
                resultContainer.innerHTML = "";
                resultContainer.classList.add('active')
                nofound = false
                Object.keys(result).forEach((key) =>{
                    let element = result[key]
                    searchValue = this.value
                    console.log(element.name.toUpperCase().indexOf(this.value.toUpperCase()))
                    if(element.name.toUpperCase().indexOf(this.value.toUpperCase()) > -1) {
                        console.log(element.name)
                        items += `
                            <a href="${element.link}" class="search_result-item">
                                <div class="search_result-img">
                                    <img src="${element.img}">
                                </div>
                                <div class="search_result-descr">
                                    <div class="search_result-name">
                                        ${element.name} 
                                    </div>
                                    <div class="search_result-price">
                                        ${element.price}
                                    </div>
                                </div>
                            </a>
                        `
                    } 
                });

                if(items) {
                    resultContainer.innerHTML = `
                    <div class="search_result-items">
                        ${items}
                    </div>
                    <a href="#" class="search_result-all">СМОТРЕТЬ ВСЕ</a>
                    `
                } else {
                    resultContainer.innerHTML = `
                    <div class="search_result-notfound hidden">Ваш поиск по запросу "${searchValue}" не дал никаких результатов. \<br/>
                    Измените условия поиска и попробуйте еще раз.</div>
                    `
                    submitHandler()
                }

            })

            this.input.addEventListener('blur', function (event) {
                this.parentNode.parentNode.querySelector('.search_result').classList.remove('active')
            })
        }

        submitHandler() {
            console.log(this)
            let form = this.input.parentNode.parentNode
            let errorContainer = form.querySelector('.search_result')
            let error = form.querySelector('.search_result-notfound')
            let searchHTML = document.querySelector('.search_title')
            console.log(error)
            form.addEventListener('submit', function (event) {
                event.preventDefault()
                errorContainer.classList.add('active')
                error.classList.remove('hidden')
                searchHTML.innerHTML = "К СОЖАЛЕНИЮ, ПОИСК НЕ ДАЛ РЕЗУЛЬТАТОВ!"
            })

        }
      
      }
      


    let search = new Search(document.querySelector('.search_input input'))
    let searchPopup = new Search(document.querySelector('.search_popup-input input'))
    search.init()
    searchPopup.init()

   
    console.log(searchPopup)
})