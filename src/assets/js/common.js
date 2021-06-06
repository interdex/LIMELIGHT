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

var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

if (isMac) {
    document.querySelector('body').classList.add('isMac')
}