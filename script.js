let sliderElement = document.querySelector('#slider');
let sliderImgElement = document.querySelector('#slider > img');
let mousedownID = -1;
let dragOffset = 0;
let lastPosition;
let images = [];
let prloadedImgElements = [];
let activeImage = 0;

for(i=0; i<61; i++) {
	images.push(`./images/nuts_${i}.png`);
}
console.log(images);

function mousedown(event) {
	mousedownID = 1;
	lastPosition = event.screenX;
}
function mouseup(event) {
	mousedownID=-1;
}
function mousemove(event) {
	if(mousedownID==1)
		ondrag(event.screenX);
}

// count up or down in img array
function ondrag(currentPosition) {
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
function replaceImgElement(newImgElement) {
	// sliderElement.replaceChild(newImgElement, sliderElement.querySelector('img'));
	sliderElement.querySelector('img').src = newImgElement.src;
}

// loop with delay
function slowLoop( count, interval, callback ) {
	var i = 0;
	next();
	function next() {
		if( callback( i ) !== false ) {
			if( ++i < count ) {
				setTimeout( next, interval );
			}
		}
	}
}

// preload img elements in array
function preloadImages(srcs) {
    function loadImage(src) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.onerror = img.onabort = function() {
                reject(src);
            };
            img.src = src;
        });
    }
    var promises = [];
    for (var i = 0; i < srcs.length; i++) {
        promises.push(loadImage(srcs[i]));
    }
    return Promise.all(promises);
}


preloadImages(images).then(function(imgs) {
	// all images are loaded now and in the array imgs
	preloadedImgElements = imgs;	
	
	slowLoop( preloadedImgElements.length, 25, function( i ) {
		console.log( i );
		replaceImgElement(preloadedImgElements[i])		
	});

	sliderElement.addEventListener("mousemove", mousemove);
	sliderElement.addEventListener("mousedown", mousedown);
	sliderElement.addEventListener("mouseup", mouseup);
	document.body.addEventListener("mouseup", mouseup);
	document.body.addEventListener("mousemove", mousemove);

}, function(errImg) {
    // at least one image failed to load
});