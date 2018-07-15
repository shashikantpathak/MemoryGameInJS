let image = document.getElementsByClassName("image");
// copy the image to new array using ES6
let images = [...image]
console.log(images);

// get image by classname

let matchedimage = document.getElementsByClassName("match");
// define the shuffle method to shuffle the image items
function shuffle(array) {
    var ctr = array.length;
    var temp;
    var index;
    while (ctr !== 0) {
        index = Math.floor(Math.random() * ctr);
        ctr -= 1;;
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
};


const patterns = document.getElementById("image-patterns");

// start the game

function startGame() {
    images = shuffle(images);
    for (var i = 0; i < images.length; i++) {
        patterns.innerHTML = "";
        [].forEach.call(images, function(item) {
            patterns.appendChild(item);
        });
        images[i].classList.remove("show", "open", "match", "disabled");
    }
// set the moves
    move = 0;
    counter.innerHTML = move;

    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "Black";
        stars[i].style.visibility = "visible";
    }
// set the timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = " 0:0:0s";
    clearInterval(interval);
}
// write the display image function to view images on click
var displayimage = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};






var openimages = [];
// check if images matched in pair
function imageOpen() {
    openimages.push(this);
    var len = openimages.length;
    if (len == 2) {
// call the counter function
        moveCounter();


        if (openimages[0].type === openimages[1].type) {
            matched();
        } else {
            unmatched();
        }

    }
};




// check if images are matched and set the state of images

function matched() {
    openimages[0].classList.add("match", "disabled");
    openimages[1].classList.add("match", "disabled");
    openimages[0].classList.remove("show", "open", "no-event");
    openimages[1].classList.remove("show", "open", "no-event");
    openimages = [];
}


// check if the images are not matched and set the image states
function unmatched() {

    openimages[0].classList.add("unmatched");
    openimages[1].classList.add("unmatched");

    disable();


    setTimeout(function() {
        openimages[0].classList.remove("show", "open", "no-event", "unmatched");
        openimages[1].classList.remove("show", "open", "no-event", "unmatched");

        enable();
        openimages = [];
    }, 1100);

}

// disbale on click once image pair is found
function disable() {
    Array.prototype.filter.call(images, function(image) {
        image.classList.add("disabled");
    });
}

// enable the  on click event if image pair is not matched


function enable() {
    Array.prototype.filter.call(images, function(image) {
        image.classList.remove("disabled");

        for (var i = 0; i < matchedimage.length; i++) {
            matchedimage[i].classList.add("disabled");
        }
    });
};


let move = 0;
let counter = document.querySelector(".moves");
// define the method for counting steps
function moveCounter() {
    move++;
    counter.innerHTML = move;
    if (move == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    if (move > 8 && move < 10) {
        for (var i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else {
        if (move > 11) {
            for (var i = 0; i < 3; i++) {
                if (i > 0) {
                    stars[i].style.visibility = "collapse";
                }
            }
        }
    }

}
// define the timer
var second = 0;
var minute = 0;
var hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = hour + ":" + minute + ":" + second + "s";
        second++;
        if (second == 60) {
            minute++;
            second = 0;

        }
        if (minute == 60) {
            hour++;
            minute = 0;

        }
    }, 1000);
}

let endicon = document.querySelector(".end");
let modal = document.getElementById("model_view");
// open up the congratulatory message once the game is completed and display the status 
function congratulations() {
    if (matchedimage.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;

        modal.classList.add("show");
        var starRating = document.querySelector(".stars").innerHTML;
        document.getElementById("totalMove").innerHTML = move;
        document.getElementById("totalTime").innerHTML = finalTime;
        document.getElementById("starRating").innerHTML = starRating;
        endmodal();
    };
}
// exit the congratulatory display on click close button

function endmodal() {
    endicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}
//  start the game again
function playAgain() {
    modal.classList.remove("show");
    startGame();
}

const stars = document.querySelectorAll(".fa-star");

let starslist = document.querySelectorAll(".stars");

// lopp for different stages of game
for (var i = 0; i < images.length; i++) {
    image = images[i];
    image.addEventListener("click", displayimage);
    image.addEventListener("click", imageOpen);
    image.addEventListener("click", congratulations);
};

// play sound on click

function PlaySound() {
    debugger
    var sound = document.getElementById("audio");
    sound.play()
}

startGame()
