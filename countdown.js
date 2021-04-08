//console.log("contdown.js is running");

// Countdown clock adapted from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown
// Set the date we're counting down to

//use this line to have countdown for 10 seconds only - for testing purpose only
// const countDownDate = new Date().getTime() + 20000;

const countDownDate = new Date().getTime() + 200000000000;

//const countDownDate = new Date("Nov 13, 2020 00:00:00").getTime();

const mainDivElem = document.querySelector("#mainDiv");
mainDivElem.style.display = "none";

/**
 * Creates div structure for the countdown clock
 * takes for example hour and the number of hours to
 * the persons birthday
 * @param {String} title
 * @param {int} number
 * @returns
 */
function createBlock(title, number) {
  let creatingBlock = "<div class='timeUnit'>";
  creatingBlock += `<span class='timeLabels'>${title.toUpperCase()}</span>`;

  const numberInString = String(number);
  creatingBlock += "<div>";
  for (let char of numberInString) {
    creatingBlock += `<div class="digit"> ${char} </div>`;
  }

  creatingBlock += "</div>";
  creatingBlock += "</div>";
  return creatingBlock;
}

// Update the count down every 1 second
let intervalID = setInterval(function () {
  // Get today's date and time
  const now = new Date().getTime();

  // Find the distance between now and the count down date
  const distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const countdownDivElem = document.querySelector("#count-down-div");

  // Creates time layout
  const daysBlock = createBlock("days", days);
  const hoursBlock = createBlock("hours", hours);
  const minBlock = createBlock("minutes", minutes);
  const secBlock = createBlock("seconds", seconds);

  // Output the result in an element with id="demo"
  countdownDivElem.innerHTML = `<i class="fas fa-gift"></i>
  ${daysBlock} ${hoursBlock} ${minBlock} ${secBlock}
  <i class="fas fa-gift"></i>`;
  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(intervalID);
    countdownDivElem.style.display = "none";
    mainDivElem.style.display = "initial";
    document.querySelector("title").innerHTML = document.querySelector(
      "h1"
    ).innerHTML = "Happy Birthday, Sebastian!";
    document.querySelector("h1").innerHTML += "<br> Let's bake a cake :)";
  }
}, 1000);

