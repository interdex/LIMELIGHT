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

function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDOM(node, func);
        node = node.nextSibling;
    }
}

function textContent(node) {
    if (typeof node.textContent !== "undefined" && node.textContent !== null) {
        return node.textContent;
    }

    var text = ""

    walkTheDOM(node, function (current) {
        if (current.nodeType === 3) {
            text += current.nodeValue;
        }
    });

    return text;
}

function camelCase(string) {
    return string.replace(/-([a-z])/g, function (matched) {
        return matched[1].toUpperCase()
    });
}

function getComputedStyleProperty(element, property) {
    if (!window.getComputedStyle) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
            return document.defaultView.getComputedStyle(element).getPropertyValue(property);
        } else {
            var camelCased = camelCase(property);

            if (element.currentStyle) {
                return element.currentStyle[camelCased];
            } else {
                return element.style[camelCased];
            }
        }
    } else {
        return window.getComputedStyle(element).getPropertyValue(property);
    }
}

var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

if (isMac) {

    document.querySelector('body').classList.add('isMac')
    let all = document.querySelectorAll("*")
    all.forEach(function(el, index) {
        switch (getComputedStyleProperty(el, "font-size")) {
            case '30px':
                el.style.fontSize = '28px'
                break;
            case '28px':
                el.style.fontSize = '26px'
                break;
            case '26px':
                el.style.fontSize = '24px'
                break;
            case '25px':
                el.style.fontSize = '23px'
                break;
            case '24px':
                el.style.fontSize = '22px'
                break;
            case '22px':
                el.style.fontSize = '20px'
                break;
            case '20px':
                el.style.fontSize = '18px'
                break;
            case '18px':
                el.style.fontSize = '16px'
                break;
            case '17px':
                el.style.fontSize = '15px'
                break;
            case '16px':
                el.style.fontSize = '14px'
                break;
            case '15px':
                el.style.fontSize = '13px'
                break;
            case '14px':
                el.style.fontSize = '12px'
                break;
            case '13px':
                el.style.fontSize = '11px'
                break;
            case '12px':
                el.style.fontSize = '10px'
                break;
            case '11px':
                el.style.fontSize = '9px'
                break;
            case '10px':
                el.style.fontSize = '9px'
                break;
            case '9px':
                el.style.fontSize = '8px'
                break;
            }

        switch (getComputedStyleProperty(el, "font-weight")) {
            case 'bolder':
                el.style.fontWeight = '800'
                break;

            case '900':
                el.style.fontWeight = '800'
                break;

            case '800':
                el.style.fontWeight = '700'
                break;

            case '700':
                el.style.fontWeight = '600'
                break;

            case 'bold':
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
                
            case 'normal':
                el.style.fontWeight = '300'
                break;
        }
    })
}


