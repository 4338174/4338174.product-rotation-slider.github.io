import {Promise} from "es6-promise";
// class ImageSequenceSlider extends Element {

// 	private sliderElement: Element;
	
// 	constructor() {
// 		this.id = 'slider';


// 		if (document.querySelector('#slider') !== null) {

// 		} 
// 	}
// }

let sliderElement = document.querySelector('#slider');
// let sliderImgElement = document.querySelector('#slider > img');

let mouseDownId = -1;
let dragOffset = 50;
let lastPosition: number;
let images: string[] = [];
let preloadedImgElements: Element[] = [];
let activeImage = 0;

for(let i=0; i<61; i++) {
	images.push(`./images/small/nuts_${i}.png`);
}
console.log(images);

function mouseDown(event: Event) {
	mouseDownId = 1;
	lastPosition = (event as MouseEvent).screenX;
}
function mouseup() {
	mouseDownId=-1;
}
function mouseMove(event: Event) {
	if(mouseDownId==1)
	onDrag((event as MouseEvent).screenX);
}

function touchStart(event: Event) {
	mouseDownId = 1;
	lastPosition = (event as TouchEvent).touches[0].screenX;
}
function touchEnd(_event: Event) {
	mouseDownId=-1;
}
function touchMove(event: Event) {
	if(mouseDownId==1)
	onDrag((event as TouchEvent).touches[0].screenX);
}

// count up or down in img array
function onDrag(currentPosition: number) {
	if(currentPosition + dragOffset < lastPosition) {
		console.log('left');
		lastPosition = currentPosition;
		if(activeImage != images.length-1)
			activeImage = activeImage + 1;
		else
			activeImage = 0;

		console.log(images[activeImage]);		
		replaceImgElement(preloadedImgElements[activeImage]);		
	}
	if(currentPosition - dragOffset > lastPosition) {
		console.log('right');
		lastPosition = currentPosition;
		if(activeImage != 0)
			activeImage = activeImage - 1;
		else
			activeImage = images.length - 1;

		console.log(images[activeImage]);
		replaceImgElement(preloadedImgElements[activeImage]);
	}
}

// replace img element src
function replaceImgElement(newImgElement: Element) {
	if (sliderElement === null) {
		throw new Error('sliderElement does not exist.');
	}
	const img = sliderElement.querySelector('img');
	if (img === null) {
		throw new Error('No image found.');
	}
	sliderElement.replaceChild(newImgElement, img);
	// sliderElement.querySelector('img').src = newImgElement.src;
}

// preload img elements in array
function preloadImages(srcs: string[]): Promise<HTMLImageElement[]> {
    var promises = srcs.map<Promise<HTMLImageElement>>((src) => {
		return new Promise<HTMLImageElement>(function(resolve, reject) {
			var img = new Image();
			img.onload = function() {
				resolve(img);
			};
			img.onerror = img.onabort = function() {
				reject(src);
			};
			img.src = src;
		});
	});
    return Promise.all(promises);
}


preloadImages(images).then((imgs: Element[]) => {
	if (sliderElement === null) {
		throw new Error('sliderElement does not exist.');
	}
	// all images are loaded now and in the array imgs
	preloadedImgElements = imgs;	

	for(let i = 0; i < preloadedImgElements.length; i++) {
		setTimeout(() => replaceImgElement(preloadedImgElements[i]), i * 25);
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
	
}, function(errImg) {
	// at least one image failed to load
	console.log(errImg);
	
});