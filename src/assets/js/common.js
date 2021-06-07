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
    console.log(getComputedStyleProperty(document.querySelector('html'), "font-weight"))

    document.querySelector('body').classList.add('isMac')
    let all = document.querySelectorAll("*")
    all.forEach(function(el, index) {
        switch (getComputedStyleProperty(el, "font-weight")) {
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


