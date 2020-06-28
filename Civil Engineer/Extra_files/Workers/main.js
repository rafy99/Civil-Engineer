// start model one
// Get DOM Elements
const modal = document.querySelector('#my-modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
// end model one
//start model two
const modal1 = document.querySelector('#my-modal1');
const modalBtn1 = document.querySelector('#modal-btn1');
const closeBtn1 = document.querySelector('.close1');

// Events
modalBtn1.addEventListener('click', openModal1);
closeBtn1.addEventListener('click', closeModal1);
window.addEventListener('click', outsideClick1);

// Open
function openModal1() {
  modal1.style.display = 'block';
}

// Close

function closeModal1() {
  Swal.fire({
    title: 'Are you sure you want to exit ?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Exit!'
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        'Exit safely!',
        'Hope you Enjoyed your tasks.',
        'success'
      )
      modal1.style.display = 'none';
    }
  })
 
}

// Close If Outside Click
function outsideClick1(e) {
  if (e.target == modal1) {
    modal1.style.display = 'none';
  }
}
//end model two
// start progress
function actualizer(){
  var rango = document.getElementById('rango') ;
  var valor = document.getElementById('value').innerHTML = rango.value;
}
function actualizer1(){
  var rango1 = document.getElementById('rango1') ;
var valor1 = document.getElementById('value1').innerHTML = rango1.value;
//console.log(valor1);
}
function actualizer2(){
  var rango2 = document.getElementById('rango2') ;
var valor2 = document.getElementById('value2').innerHTML = rango2.value;
//console.log(valor2);
}
//end progress
//sweet alert
/*
function sweetalerttest(){
  
}
*/