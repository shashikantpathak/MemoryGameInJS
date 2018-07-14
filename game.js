let image = document.getElementsByClassName("image");
let images = [...image]
console.log(images);



let matchedimage = document.getElementsByClassName("match");

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



function startGame() {
    images = shuffle(images);
    for (var i = 0; i < images.length; i++) {
        patterns.innerHTML = "";
        [].forEach.call(images, function(item) {
            patterns.appendChild(item);
        });
        images[i].classList.remove("show", "open", "match", "disabled");
    }

    move = 0;
    counter.innerHTML = move;

    for (var i = 0; i < stars.length; i++) {
        stars[i].style.color = "Black";
        stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = " 0:0:0s";
    clearInterval(interval);
}

var displayimage = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};






var openimages = [];

function imageOpen() {
    openimages.push(this);
    var len = openimages.length;
    if (len == 2) {

        moveCounter();


        if (openimages[0].type === openimages[1].type) {
            matched();
        } else {
            unmatched();
        }

    }
};






function matched() {
    openimages[0].classList.add("match", "disabled");
    openimages[1].classList.add("match", "disabled");
    openimages[0].classList.remove("show", "open", "no-event");
    openimages[1].classList.remove("show", "open", "no-event");
    openimages = [];
}



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


function disable() {
    Array.prototype.filter.call(images, function(image) {
        image.classList.add("disabled");
    });
}




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


function endmodal() {
    endicon.addEventListener("click", function(e) {
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain() {
    modal.classList.remove("show");
    startGame();
}

const stars = document.querySelectorAll(".fa-star");

let starslist = document.querySelectorAll(".stars");


for (var i = 0; i < images.length; i++) {
    image = images[i];
    image.addEventListener("click", displayimage);
    image.addEventListener("click", imageOpen);
    image.addEventListener("click", congratulations);
};



function PlaySound() {
    debugger
    var sound = document.getElementById("audio");
    sound.play()
}




startGame()