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
            // console.log(pictureItems)
            // console.log(colorItems)
        })

        let colorWrap = document.querySelectorAll('.catalog_item-colors')
        colorWrap.forEach(function (el) {
            el.addEventListener('mouseout', function () {
               
            })
        })


        colorItems.forEach((color, index, arr) => {
            let curImg = pictureItems[index].querySelector('img')

            // color.addEventListener('mouseout', onMouseOut, true);

            color.addEventListener("mouseover", function(el) {
                console.log(this)
                pictureItems.forEach(function(el) {
                    if(getElementIndex(el) != 0) {
                        el.querySelector('img').style.visibility = "hidden"
                        el.querySelector('img').style.opacity = "0"
                    }
                })
                // console.log(curImg)
                console.log(arr)
                if(getElementIndex(color) != 0) {
                    curImg.style.visibility = "visible"
                    curImg.style.opacity = "1"
                }
            })
        })
    }

    imageChangeHandler()

})