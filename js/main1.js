
// CAROUSEL OBJECT
var b=0;
function Carousel(option,carouselId) {
    if (typeof option === 'undefined' || option === null) {
         this.option= {showIndicator : true, cycle : false, animation : "rotateIn",interval:2000,buttons:"hidden"};
         // alert('user not defined option field');
        }
        else{
            this.options=option;
    }
    this.carouselId=carouselId;
    this.container = document.getElementById(this.carouselId);
    this.slides = this.container.querySelectorAll('.carousel');
    this.indicators=this.container.querySelectorAll('.indicator');
    this.total = this.slides.length - 1;
    this.current = 0;
    this.slide(this.current);
    this.ind=document.getElementById('indicators');
    this.nextBtn=document.getElementById('next');
    this.prevBtn=document.getElementById('prev');
    this.indicatorCheck();
    this.btnCheck();
    this.checkInterval();
}



Carousel.prototype.btnCheck=function(){
    if(this.options.buttons==='show')
    {
       // alert('here');
      var _this = this
      var nextBtn = document.createElement("input");
          nextBtn.type = "button";
          nextBtn.className="next"
          nextBtn.value = "next";
          nextBtn.addEventListener("click", function() {
                         _this.next();
                        });
          this.nextBtn=this.container.appendChild(nextBtn);

      var prevBtn=document.createElement('input');
          prevBtn.type="button";
          prevBtn.className="prev";
          prevBtn.value="Prev";
          prevBtn.addEventListener("click",function(){
            _this.prev();
          });
          this.prevBtn=this.container.appendChild(prevBtn);
          // this.container.style.backgroundColor="red";


    }else{
        this.container.removeChild(this.nextBtn);
        this.container.removeChild(this.prevBtn);
    }
}


 Carousel.prototype.indicatorCheck = function () 
            {
                var indicatorClass="indicator";
                var indicatorId="indicators";
                var classOfIndicator=indicatorClass+b;
                var idOfIndicator=indicatorId+b;
                if(this.options.showIndicator===false){
                        this.container.removeChild(this.ind);
                    }
                    else{
                        var _this = this;    
                        var indicatorDiv=document.createElement('div');
                        indicatorDiv.id=idOfIndicator;
                        this.ind=this.container.appendChild(indicatorDiv);
                    for(var i=0;i<=this.total;i++){
                        x=document.createElement('INPUT');
                        x.setAttribute("class",classOfIndicator);
                        x.setAttribute("type", "radio");
                        x.setAttribute("name", b);
                        x.addEventListener("click", function() {
                         _this.indicates();
                        });                         

                        this.ind.appendChild(x);
                        this.indicators=this.container.querySelectorAll('.'+classOfIndicator);
                        document.getElementById(idOfIndicator).style.position="absolute";
                        document.getElementById(idOfIndicator).style.left="450px";
                        document.getElementById(idOfIndicator).style.top="330px";
                    }


                    this.indicate();
                    b+=1;                    
                }
            }

            Carousel.prototype.indicates=function(){
               for(var s=0;s<=this.total;s++)
                {
                    if(this.indicators[s].checked===true){
                        this.current=s;
                        this.slide(this.current);                        
                    }
                } 
              
            }


            Carousel.prototype.indicate=function()
            {
                for(var s=0;s<=this.total;s++)
                {
                    if(s===this.current){
                       this.indicators[s].checked=true;
                    }
                    else{
                        this.indicators[s].checked=false;
                    }
                }
               
            }

Carousel.prototype.checkInterval=function(){
    if(this.options.cycle===true && this.options.interval!=null){
 var t = this;
 setInterval(function(){t.next();}, t.options.interval);
  }
}

// NEXT
Carousel.prototype.next = function () {
    var t=this;
    (t.current === t.total) ? t.current = 0: t.current += 1; 
    t.slide(t.current);
    t.indicate();
};


// PREVIOUS
Carousel.prototype.prev = function (interval) { 
    (this.current === 0) ? this.current = this.total : this.current -= 1;
          
    this.slide(this.current);
    this.indicate();

    if(typeof interval === 'number' && (interval % 1) === 0) {
        var context = this;
        this.run = setTimeout(function() {
            context.prev(interval);
        }, interval);
    }
};

// SELECT SLIDE
Carousel.prototype.slide = function (index) {   
    if (index >= 0 && index <= this.total) { 
        for (var s = 0; s <= this.total; s++) {
            if (s === index) {
             this.slides[s].style.animation=this.options.animation+" 2s";
             this.slides[s].style.display = "inline-block"; 
            } else {
                this.slides[s].style.display = 'none';
            }
        }
    } else {
        alert("Index " + index + " doesn't exist" + this.total);
    }
};

