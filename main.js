let confetti = [];
let launch = false;

function setup() { 
    createCanvas(800, 400);
    textAlign(CENTER, CENTER);
} 
  
function draw() {
    background(220);
    textSize(60);
    let countdownFinished = countdown(10, 'Launch!', 60); // Increase delay to slow down countdown
    displayDateTime();

    if (countdownFinished && !launch) {
        launch = true;
        for (let i = 0; i < 100; i++) {
            confetti.push(new Confetti());
        }
    }

    if (launch) {
        for (let i = confetti.length - 1; i >= 0; i--) {
            confetti[i].update();
            confetti[i].show();
            if (confetti[i].isOffScreen()) {
                confetti.splice(i, 1);
            }
        }
    }
}

function displayDateTime() {
    const now = new Date();
    const datetimeString = now.toLocaleString();
    textSize(20);
    fill(0); // Set text color to black
    text(datetimeString, width / 2, height / 2 + 50); // Display below the countdown
}

function countdown(number, message, delay) {
    var currentNumber = number - parseInt(frameCount / delay, 10);
    var currentMessage;
    if (currentNumber < 0) {
        currentMessage = message;
        text(currentMessage, width / 2, height / 2);
        return true;
    } else {
        currentMessage = currentNumber;
        text(currentMessage, width / 2, height / 2);
        return false;
    }
}

class Confetti {
    constructor() {
        this.x = random(width);
        this.y = random(-height, 0);
        this.size = random(5, 10);
        this.speed = random(1, 5);
        this.color = color(random(255), random(255), random(255));
    }

    update() {
        this.y += this.speed;
    }

    show() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.size);
    }

    isOffScreen() {
        return this.y > height;
    }
}