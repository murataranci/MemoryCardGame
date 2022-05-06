let firstSelectedEl, secondSelectedEl;
let point;
let isStarted = false ;
let cards = [
    { id:1, src:"./img/shape_1.png" },
    { id:2, src:"./img/shape_2.png" },
    { id:3, src:"./img/shape_3.png" },
    { id:4, src:"./img/shape_4.png" },
    { id:5, src:"./img/shape_5.png" },
    { id:6, src:"./img/shape_6.png" },
    { id:7, src:"./img/shape_7.png" },
    { id:8, src:"./img/shape_8.png" },
];

let duplicateCards = [...cards,...cards];
let dealingCards = [];

const startapp = document.querySelector(".startbutton")
const togglestart = () => {
    startapp.classList.toggle("hide");
};


const selectRandomCard = () => {
   let randomCardOrder = Math.round(Math.random() * duplicateCards.length - 1);
   return duplicateCards.splice(randomCardOrder,1);
}


const dealCards = () => {
   for(let i =0; i<16; i++) {
      dealingCards = [...dealingCards,...selectRandomCard()];
   }
}

const drawCards = () => {
    dealCards();
    const cardContaineEl =document.querySelector(".card__container");
    let cardItemHtml = ``;
    dealingCards.forEach((item) => {
        cardItemHtml += `<img class="card animate__animated" 
        src="${item.src}" 
        data-id="${item.id}"
        onclick="selectCard(this)"/>`;
    });

    cardContaineEl.innerHTML = cardItemHtml;
}

drawCards();

const selectCard = (el) => {
     if(isStarted){
        if(! el.classList.contains("open")){
            el.classList.add("open","animate__flipInX")
    
        if(firstSelectedEl){
            secondSelectedEl = el;
            checkSelectedCards(firstSelectedEl , secondSelectedEl);
    
            firstSelectedEl = null ;
            secondSelectedEl = null ;
        }else{
            firstSelectedEl = el;
        }
        }
     }
    
};

const checkSelectedCards = (checkFirstEl , checkSecondEl) => {
    if(checkFirstEl.dataset.id != checkSecondEl.dataset.id){
        checkFirstEl.classList.remove("animate__flipInX");
        checkSecondEl.classList.remove("animate__flipInX");

        checkFirstEl.classList.add("incorrect","animate__wobble");
        checkSecondEl.classList.add("incorrect","animate__wobble");
        setTimeout (() => {
            checkFirstEl.classList.add("animate__flipOutY");
            checkSecondEl.classList.add("animate__flipOutY"); 
          setTimeout(() => {
            checkFirstEl.classList.remove(
            "open",
            "animate__wobble",
            "animate__flipInX",
            "animate__flipOutY",
            "incorrect");
            checkSecondEl.classList.remove(
            "open",
            "animate__wobble",
            "animate__flipInX",
            "animate__flipOutY",
            "incorrect");
          },500);
        },1000);
    }else{
        checkFirstEl.classList.remove("animate__flipInX");
        checkSecondEl.classList.remove("animate__flipInX");

        checkFirstEl.classList.add("correct","animate__bounceIn");
        checkSecondEl.classList.add("correct","animate__bounceIn");
        successfulAlert();
    }  
};
let timer = 0;
let interval;

const timerEl = document.querySelector("#timer");
const startButton = document.getElementById("baslat");


startButton.addEventListener("click",() =>{
    interval = setInterval(timerStart,1000);
    isStarted=true;
});

function timerStart () {
    timer++;
    
    let saniye = timer%60;
    let dakika = Math.floor(timer/60);

    if(saniye.toString().length == 1){
        saniye = "0"+saniye;
    }

    if(dakika.toString().length == 1){
        dakika = "0"+dakika;
    }
    
    timerEl.innerHTML = dakika + " : " + saniye;
}
const cardtext =document.querySelector(".card-text");

const successfulAlert = () => {
    const correctEls = document.querySelectorAll(".correct");
  if(correctEls.length == 16){
      if(timer < 30){
        toggleModel()
        cardtext.innerHTML="Tebrikler 100 puan ile tamamladınız."
        clearInterval(interval);
      }else if(30 < timer < 60){
        toggleModel();
        cardtext.innerHTML="Tebrikler 50 puan ile tamamladınız."
        clearInterval(interval);
      }else{
        toggleModel();
        cardtext.innerHTML="Tebrikler 25 puan ile tamamladınız."
        clearInterval(interval);
      }
  }
}

const cardModelEl = document.querySelector(".card__model");
const toggleModel = () => {
    cardModelEl.classList.toggle("show");
};
cardModelEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("card__model")) toggleModel();
  });
