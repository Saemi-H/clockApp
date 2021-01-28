window.onload=function(){
    defaultPage();
    defClock();
    weatherMap();
}

function defaultPage(){
    const anClock=document.querySelector('#analogue');
    const clickPage=document.querySelector('#click');
   anClock.addEventListener('click', ()=>{
       anClock.classList.add('hide');
       clickPage.classList.add('clicked');
   })
   clickPage.addEventListener('click', ()=>{
    anClock.classList.remove('hide');
    clickPage.classList.remove('clicked');
   })
}//defaultPage

function defClock(){
    
    setInterval(clockGo, 1000);
    setInterval(digClock,1000);
    
    const digHour=document.querySelector('.dighour');
    const digMin=document.querySelector('.digmin');
    const digSec=document.querySelector('.digsec');
    
    //console.log(newTime)

    function clockGo(){
    const handHour = document.querySelector('[data-hour-hand]');
    const handMin = document.querySelector('[data-minute-hand]');
    const handSec=document.querySelector('[data-second-hand]');
    let newTime=new Date();
    let secRotate=newTime.getSeconds()/60;
    let minRotate=(secRotate+newTime.getMinutes())/60;
    let hourRotate = (secRotate+newTime.getHours())/12;
    setRotation(handSec, secRotate);
    setRotation(handMin, minRotate);
    setRotation(handHour, hourRotate);

    function setRotation(element, rotationRatio){
        //console.log(element, rotationRatio*360);
        element.style.setProperty('--rotatior', rotationRatio*360);
    }

    }//clockGo
    clockGo();
    
    function digClock(){
    let newTime=new Date();
    let newSec=newTime.getSeconds();
    let newMin=newTime.getMinutes();
    let newH = newTime.getHours();
        if(newSec < 10){
            digSec.innerText = '0'+newSec;
        }else{
            digSec.innerText = newSec;
        }
        if(newMin < 10){
            digMin.innerText='0'+newMin;
        }else{
            digMin.innerText=newMin;
        }
        if(newH < 10){
            digHour.innerText='0'+newH;
        }else{
            digHour.innerText=newH;
        }
    }//digClock
}//defClock

function weatherMap(){
    let lat;
    let long;
    const temperature=document.querySelector('.temp');
    const weather=document.querySelector('.weather');
    const highest=document.querySelector('.highest');
    const lowest=document.querySelector('.lowest');
    const feeling=document.querySelector('.feel');
    const humidity=document.querySelector('.humid');
    const kel=273.15;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            lat = position.coords.latitude;
            long = position.coords.longitude;
            //console.log(lat, long);

            let api=`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=99a0b110b789603bd3ca7c53f8a44018`;
            fetch(api)
            .then(response=>{
                let data = response.json();
                return data;
            })
            .then(data=>{
                console.log(data);
                temperature.innerText=Math.floor(data.main.temp-kel)+'°C';
                weather.innerText=data.weather[0].main;
                humidity.innerText=data.main.humidity+'%';
                highest.innerText=Math.floor(data.main.temp_max-kel)+'°C';
                lowest.innerText=Math.floor(data.main.temp_min-kel)+'°C';
                feeling.innerText=Math.floor(data.main.feels_like-kel)+'°C';
            })
        })
            
      
       
    }
}//weatherMap
    