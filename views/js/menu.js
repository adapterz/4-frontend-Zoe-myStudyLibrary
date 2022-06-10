const toogleBtn=document.querySelector('.gmb__toogleBtn');
const menu=document.querySelector('.gmb__menu');

toogleBtn.addEventListener('click',()=>{
  menu.classList.toggle('active');
});