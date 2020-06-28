// Get DOM Elements
const progressBtn = document.querySelectorAll('.progressBtn');
const infoBtn = document.querySelectorAll('.infoBtn');
const closing = document.querySelectorAll('.close0');
const modals = document.querySelectorAll('.My_modal');
// Events

let last_open=""

for(let i =0;i<progressBtn.length;i++){
  progressBtn[i].addEventListener('click',openProgress);
}

for(let i =0;i<infoBtn.length;i++){
  infoBtn[i].addEventListener('click',openInfo);
}

for(let i =0;i<closing.length;i++){
  closing[i].addEventListener('click',closeModal);
}


window.addEventListener('click',closeFromWindow);

// Open
function openInfo() {
  n = this.parentElement.nextElementSibling
  n.style.display = 'block'
  last_open = n
}

function openProgress() {
  n = this.parentElement.nextElementSibling.nextElementSibling
  n.style.display = 'block'
  last_open = n
}

function closeModal() {
  n = this.parentElement.parentElement.parentElement
  n.style.display = 'none'
}

function closeFromWindow(e) {
  if (e.target == last_open) {
    last_open.style.display = 'none';
  }
}

// Close If Outside Click



// start for progress

// Get DOM Elements



//progress
function display(){
  console.log("hello world")
  let n = event.target
  n.nextElementSibling.innerHTML = n.value
}
