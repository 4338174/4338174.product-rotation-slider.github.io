"use strict";
// class ImageSequenceSlider extends Element {
// 	private sliderElement: Element;
// 	constructor() {
// 		this.id = 'slider';
// 		if (document.querySelector('#slider') !== null) {
// 		} 
// 	}
// }
var sliderElement = document.querySelector('#slider');
// let sliderImgElement = document.querySelector('#slider > img');
var mouseDownId = -1;
var dragOffset = 0;
var lastPosition;
var images = [];
var preloadedImgElements = [];
var activeImage = 0;
for (var i = 0; i < 61; i++) {
    images.push("./images/small/nuts_" + i + ".png");
}
console.log(images);
function mouseDown(event) {
    mouseDownId = 1;
    lastPosition = event.screenX;
}
function mouseup() {
    mouseDownId = -1;
}
function mouseMove(event) {
    if (mouseDownId == 1)
        onDrag(event.screenX);
}
function touchStart(event) {
    mouseDownId = 1;
    lastPosition = event.touches[0].screenX;
}
function touchEnd(_event) {
    mouseDownId = -1;
}
function touchMove(event) {
    if (mouseDownId == 1)
        onDrag(event.touches[0].screenX);
}
// count up or down in img array
function onDrag(currentPosition) {
    if (currentPosition + dragOffset < lastPosition) {
        console.log('left');
        lastPosition = currentPosition;
        if (activeImage != images.length - 1)
            activeImage = activeImage + 1;
        else
            activeImage = 0;
        console.log(images[activeImage]);
        replaceImgElement(preloadedImgElements[activeImage]);
    }
    if (currentPosition - dragOffset > lastPosition) {
        console.log('right');
        lastPosition = currentPosition;
        if (activeImage != 0)
            activeImage = activeImage - 1;
        else
            activeImage = images.length - 1;
        console.log(images[activeImage]);
        replaceImgElement(preloadedImgElements[activeImage]);
    }
}
// replace img element src
function replaceImgElement(newImgElement) {
    if (sliderElement === null) {
        throw new Error('sliderElement does not exist.');
    }
    var img = sliderElement.querySelector('img');
    if (img === null) {
        throw new Error('No image found.');
    }
    sliderElement.replaceChild(newImgElement, img);
    // sliderElement.querySelector('img').src = newImgElement.src;
}
// preload img elements in array
function preloadImages(srcs) {
    var promises = srcs.map(function (src) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = img.onabort = function () {
                reject(src);
            };
            img.src = src;
        });
    });
    return Promise.all(promises);
}
preloadImages(images).then(function (imgs) {
    if (sliderElement === null) {
        throw new Error('sliderElement does not exist.');
    }
    // all images are loaded now and in the array imgs
    preloadedImgElements = imgs;
    var _loop_1 = function (i) {
        setTimeout(function () { return replaceImgElement(preloadedImgElements[i]); }, i * 25);
    };
    for (var i = 0; i < preloadedImgElements.length; i++) {
        _loop_1(i);
    }
    sliderElement.addEventListener("mousemove", mouseMove);
    sliderElement.addEventListener("mousedown", mouseDown);
    sliderElement.addEventListener("mouseup", mouseup);
    document.body.addEventListener("mouseup", mouseup);
    document.body.addEventListener("mousemove", mouseMove);
    sliderElement.addEventListener('touchstart', touchStart);
    sliderElement.addEventListener('touchend', touchEnd);
    sliderElement.addEventListener('touchmove', touchMove);
    document.body.addEventListener("touchstart", touchStart);
    document.body.addEventListener("touchend", touchEnd);
}, function (errImg) {
    // at least one image failed to load
    console.log(errImg);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSw4Q0FBOEM7QUFFOUMsbUNBQW1DO0FBRW5DLG1CQUFtQjtBQUNuQix3QkFBd0I7QUFHeEIsc0RBQXNEO0FBRXRELE9BQU87QUFDUCxLQUFLO0FBQ0wsSUFBSTtBQUVKLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdEQsa0VBQWtFO0FBRWxFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNuQixJQUFJLFlBQW9CLENBQUM7QUFDekIsSUFBSSxNQUFNLEdBQWEsRUFBRSxDQUFDO0FBQzFCLElBQUksb0JBQW9CLEdBQWMsRUFBRSxDQUFDO0FBQ3pDLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztBQUVwQixLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXVCLENBQUMsU0FBTSxDQUFDLENBQUM7Q0FDNUM7QUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXBCLFNBQVMsU0FBUyxDQUFDLEtBQVk7SUFDOUIsV0FBVyxHQUFHLENBQUMsQ0FBQztJQUNoQixZQUFZLEdBQUksS0FBb0IsQ0FBQyxPQUFPLENBQUM7QUFDOUMsQ0FBQztBQUNELFNBQVMsT0FBTztJQUNmLFdBQVcsR0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixDQUFDO0FBQ0QsU0FBUyxTQUFTLENBQUMsS0FBWTtJQUM5QixJQUFHLFdBQVcsSUFBRSxDQUFDO1FBQ2pCLE1BQU0sQ0FBRSxLQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxL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