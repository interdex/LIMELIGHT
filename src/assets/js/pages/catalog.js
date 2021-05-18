import '../header'
import '../common.js'
import '../../styles/pages/catalog.sass'
document.addEventListener("DOMContentLoaded", function (event) {
    let items = document.querySelectorAll('.catalog_item')
    let pictureItems = []
    let colorItems = []

    function getElementIndex(elem) {
        elem = elem.tagName ? elem : document.querySelector(elem)
        return [].indexOf.call(elem.parentNode.children, elem)
    }


    function onMouseOut(event) {
        //this is the original element the event handler was assigned to
        var e = event.toElement || event.relatedTarget;
        if (e.parentNode == this || e == this) {
            return;
        }
        console.log('MouseOut');
        // handle mouse event here!
    }



    document.getElementById('parent')

    function imageChangeHandler() {
        items.forEach(function (elem, idx) {
            let images = elem.children[0].children[0].children

            if (images.length > 1) {
                colorItems.push(...elem.children[1].querySelectorAll('a'))
                pictureItems.push(...images)
            }
        })

        let colorWrap = document.querySelectorAll('.catalog_item-colors')
        colorWrap.forEach(function (el) {
            el.addEventListener('mouseout', function () {
                console.log('mouseout')
            })
        })


        colorItems.forEach((color, index, arr) => {
            let curImg = pictureItems[index].querySelector('img')

            color.addEventListener('mouseout', onMouseOut, true);

            // color.addEventListener("mouseout", ()=> {
            //     if(getElementIndex(color) != 0) {
            //         curImg.style.visibility = "hidden"
            //         curImg.style.opacity = "0"
            //     }
            // })
        })
    }

    imageChangeHandler()

})