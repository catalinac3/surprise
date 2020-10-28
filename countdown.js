console.log("contdown,js is running");

//Here is a simple version of the countdown taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_countdown
// Set the date we're counting down to

//const countDownDate = new Date("Nov 13, 2020 00:00:00").getTime();
//use this line to have countdown for 10 seconds only - for testing purpose only
const countDownDate = new Date().getTime() + 10000; 

const mainDivElem = document.querySelector("#mainDiv");
mainDivElem.style.display = "none";

// Update the count down every 1 second
let x = setInterval(function() {

  // Get today's date and time
  const now = new Date().getTime();
    
  // Find the distance between now and the count down date
  const distance = countDownDate - now;

    
  // Time calculations for days, hours, minutes and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const countdownDivElem = document.querySelector("#countdownDiv");
  // Output the result in an element with id="demo"
  countdownDivElem.innerHTML =
  `<i class="fas fa-gift"></i>
   ${days}d ${hours}h ${minutes}m ${seconds}s
   <i class="fas fa-gift"></i>`;
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    countdownDivElem.style.display = "none";
    mainDivElem.style.display = "initial";
  }
}, 1000);