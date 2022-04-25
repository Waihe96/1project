//tabs
document.addEventListener('DOMContentLoaded',()=>{


    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

     function hideTabContent () {
     
      tabsContent.forEach(item => {
         item.style.display = 'none';
}
);
        
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');

});
}

    function showtabcontent(i=0){
       tabsContent[i].style.display='block';
       tabs[i].classList.add('tabheader__item_active');
    
}
 
      tabsParent.addEventListener('click',(e) => {
           if (e.target && e.target.classList.contains ('tabheader__item'))

            { tabs.forEach((item,i) => {

         if (e.target==item)  {hideTabContent();
                               showtabcontent(i);}

}
);
               
}}
);
  
hideTabContent();

showtabcontent();
//timer

  const Endtime = 'February 28, 2022 14:23:00';
         
  function Returnvalues(end) {

             const total = Date.parse(end) - Date.parse(new Date()),
                   days = Math.floor (total/1000/60/60/24),
                   hours = Math.floor (total/1000/60/60%24),
                   minutes = Math.floor (total/1000/60%60),
                   seconds = Math.floor (total/1000%60);

                return { 'total' : total,
                         'days' : days ,
                         'hours' : hours,
                         'minutes' : minutes, 
                         'seconds' : seconds
                   };
  }
       function getzero(num){

              if ( num<10 ){return `0${num}`;} else {return num;};
}

       function Setclock (selector,end) {
               


                let Timer=document.querySelector(selector),
                    days=Timer.querySelector('#days'),
                    hours=Timer.querySelector('#hours'),
                    minutes=Timer.querySelector('#minutes'),
                    seconds=Timer.querySelector('#seconds'),

                timeInterval = setInterval(updateclock,1000);               
   updateclock(); 

        function updateclock(){
                     const   t = Returnvalues(end);
                           
                     days.textContent = t.days;
                     hours.textContent = getzero(t.hours);
                     minutes.textContent = getzero(t.minutes);
                     seconds.textContent = getzero(t.seconds);

                   if(t.total<=0) {clearInterval(timeInterval);  Timer.textContent = '';  }
                                                 
                   
        }
 }
                   
Setclock('.timer',Endtime);



//Modal

const Modal = document.querySelector('.modal'),
      
      SvyazatsaSnami = document.querySelectorAll('[data-knopka]');



function show ()
          { Modal.style.display = 'block'; document.body.style.overflow="hidden"; clearInterval(annoying);}

function hide () 
          { Modal.style.display = 'none'; document.body.style.overflow='';}


 
 Modal.addEventListener('click',(e)=>{
     if (e.target == Modal || e.target == document.querySelector('.modal__close')) {hide();}

 });

 SvyazatsaSnami.forEach(a => {a.addEventListener('click',() => { show();

     });
    });

    document.addEventListener('keydown',(e)=>{ 
        if (e.code === "Escape" && Modal.style.display == 'block') {hide();}

    });


   const annoying = setInterval(show,30000);

   function showmodalbyscrol()
    {if (window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight ) {show();
         window.removeEventListener('scroll',showmodalbyscrol);
    }
}

  window.addEventListener('scroll',showmodalbyscrol);



//menu shablon
const menucotainerparent = document.querySelector('.menu__field'),
       menucotainer = menucotainerparent.querySelector('.container');
class menuShablon {
    constructor (imgsrc,alt,menutitle,description,price,currency,...classes){ 
        this.imgsrc = imgsrc;
        this.menutitle = menutitle;
        this.description = description;
        this.price = price;
        this.currency = currency; 
        this.alt=alt;
        this.classes=classes;
        
        
    }
           

        addtolist(){
            
            const element = document.createElement('div');
            if(this.classes.length === 0) {
                this.element='menu__item';
                element.classList.add(this.element);}
            this.classes.forEach(clas=>{element.classList.add(clas);
            });

            element.innerHTML =  ` 
            <img src='${this.imgsrc}' alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню “${this.menutitle}”</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> ${this.currency}</div>
            </div>`;

           menucotainer.append(element); 
                 
        }

    }


 new menuShablon(
     "img/tabs/vegy.jpg",
     "vegy", 
     "Фитнес",
    ' Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    'грн/день',
    'menu__item'
    
 ).addtolist();

 new menuShablon(
     'img/tabs/elite.jpg',
     "elite",
     "Премиум",
     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
     550,
     'грн/день'


 ).addtolist();

new menuShablon(
    'img/tabs/post.jpg',
    'post',
    "Постное",
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    'грн/день'


).addtolist();


///Forms

const forms = document.querySelectorAll('form');
const message = {
    loading : "loading",
    success : 'thank you we will contact you',
    failure : 'something went wrong'
};
forms.forEach(item=>{
    postdata(item);
});

function postdata(form) { 
    form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const statusmassage = document.createElement('div');
    statusmassage.classList.add('status');
     showThanksModal( message.loading);
    form.append(statusmassage);
    
    // const request = new XMLHttpRequest();
    // request.open('POST','server.php');
    //  request.setRequestHeader('Content-type','application/json');
   const formData = new FormData(form);
   
//    const object = {};
//      formData.forEach(function(value,key){
//          object[key] = value;

//      });
//      const json = JSON.stringify(object); 
     
     fetch('server.php',{
        method:"POST",
        headers:{'Content-type':'application/json',},
        body:formData

    }).then(data=>data.text()

    )
    
    .then(data=>{
        console.log(data);
        showThanksModal( message.success);
          
            
                 statusmassage.remove();
        
    }).catch(()=>{
        showThanksModal (message.failure);
    }).finally(()=>{
        form.reset();
    });
    
    
    
    

}
);

}

function showThanksModal(message) {
     const prevModalDialog = document.querySelector('.modal__dialog');

prevModalDialog.classList.add('hide');
show();
const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class = "modal__content">
              <div class="modal__close" data-close>x</div>
              <div class="modal__title">${message}</div>


      </div>
      `;
document.querySelector('.modal').append(thanksModal);
setTimeout(()=>{
    thanksModal.remove();
    prevModalDialog.classList.add('show');
    prevModalDialog.classList.remove('hide');
    hide();
},4000);


}






//slider

const leftbutton = document.querySelector('.offer__slider-prev'),
      rightbutton = document.querySelector('.offer__slider-next'),
      slidercontent = document.querySelectorAll('.offer__slide'),
      currentnumber = document.querySelector('#current');
 

      sliderhide();

      slidershow(0);
      

      function slidershow(b){  if (b<4){
     
     slidercontent[b].style.display = 'block'; currentnumber.textContent =`0${b+1}`;}
    else { slidercontent[0].style.display = 'block'; currentnumber.textContent =`0${1}`;
    } }

    function sliderleft(b){if (b>1) {slidercontent[b-2].style.display = 'block'; currentnumber.textContent =`0${b-1}`;}
    else {slidercontent[3].style.display = 'block'; currentnumber.textContent =`0${4}`;

    }

    }

      function sliderhide (){
          slidercontent.forEach(v=>{
               v.style.display = 'none';
          }
);}
     
    
      

      leftbutton.addEventListener('click',()=>{
        let  countnum = parseInt(currentnumber.textContent); 
         sliderhide();


         sliderleft(countnum); 
      }
      
      );
      rightbutton.addEventListener('click', () => {

        let  countnum = parseInt(currentnumber.textContent); 

        sliderhide(); 
        slidershow(countnum);
      });
    
     
});

