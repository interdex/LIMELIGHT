import '../styles/animation.scss'
import '../styles/default.scss'
import '../styles/fonts.scss'
import '../styles/footer.sass'
import '../styles/vars.sass'
import '../styles/components/accordion.sass'
import '../styles/components/basket_popup.sass'
import '../styles/components/checkbox.sass'
import '../styles/components/header.sass'
import '../styles/components/search.sass'
import '../styles/components/subscribe.sass'
import '../styles/components/btn.sass'

var isMac = navigator.platform.toUpperCase().indexOf('WIN')>=0;

if (isMac) {
    console.log(getComputedStyle(document.querySelector('html')).fontWeight)

    document.querySelector('body').classList.add('isMac')
    let all = document.querySelectorAll("*")
    all.forEach(function(el, index) {
        switch (getComputedStyle(el).fontWeight) {
            case '900':
                el.style.fontWeight = '800'
                break;

            case '800':
                el.style.fontWeight = '700'
                break;

            case '700':
                el.style.fontWeight = '600'
                break;

            case '600':
                el.style.fontWeight = '500'
                break;

            case '500':
                el.style.fontWeight = '400'
                break;

            case '400':
                el.style.fontWeight = '300'
                break;
        }
    })
}