import '../common'
import '../header'
import '../../styles/pages/search.sass'
import '../../styles/components/breadcrumbs.sass'

document.addEventListener("DOMContentLoaded", function (event) {

    function filterFunction() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
          txtValue = a[i].textContent || a[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
          } else {
            a[i].style.display = "none";
          }
        }
      }

      
    class Search {

        constructor(input) {
          // вызывает сеттер
          this.input = input;
        }

        init() {
            this.input.addEventListener('keyup', async function (e) {
                let response = await fetch('/ajax/search.json');
                let result = await response.json();
                let resultContainer  = this.parentNode.parentNode.querySelector('.search_result')
                let items = ""
                let nofound = false
                let searchValue;
                resultContainer.innerHTML = "";
                resultContainer.classList.add('active')
                nofound = false
                Object.keys(result).forEach((key) =>{
                    let element = result[key]
                    searchValue = this.value
                    if(element.name.toUpperCase().indexOf(this.value.toUpperCase()) > -1) {
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
                    } else {
                        nofound = true
                    }
                });

                if(!nofound) {
                    resultContainer.innerHTML = `
                    <div class="search_result-items">
                        ${items}
                    </div>
                    <a href="#" class="search_result-all">СМОТРЕТЬ ВСЕ</a>
                    `
                } else {
                    resultContainer.innerHTML = `
                    <div class="search_result-notfound">Ваш поиск по запросу "${searchValue}" не дал никаких результатов. \<br/>
                    Измените условия поиска и попробуйте еще раз.</div>
                    `
                }

            })

            this.input.addEventListener('blur', function (event) {
                this.parentNode.parentNode.querySelector('.search_result').classList.remove('active')
            })
        }
      
      }
      


    let search = new Search(document.querySelector('.search_input input'))
    search.init()
    console.log(search)
})