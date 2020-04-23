const search=document.querySelector("input");
const WeatherForm=document.querySelector("form");
const MessageOne=document.querySelector("#message-1");
const MessageTwo=document.querySelector("#message-2");
const MessageThree=document.querySelector("#message-3");
const MessageFour=document.querySelector("#message-4");
const MessageFive=document.querySelector("#message-5");

const loader=document.querySelector(".hello");


WeatherForm.addEventListener('submit',function(e){
    e.preventDefault();
    const location=search.value;

    loader.classList.add("loader");
    MessageOne.innerHTML="";
    MessageTwo.innerHTML="";
    MessageThree.innerHTML="";
    MessageFour.innerHTML="";
    MessageFive.setAttribute("src","");
    // fetch("http://localhost:3000/weather?address="+location).then(function(response){
    // My india
    //congo
    //Merge conflicts
    fetch("/weather?address="+location).then(function(response){
        response.json().then(function(data){
           if(data.error){
               MessageOne.innerHTML="Something went Wrong";
               loader.classList.remove("loader");
           }else{
            loader.classList.remove("loader");
            MessageOne.innerHTML="City Name : "+data.name;
            MessageTwo.innerHTML="Local Time: "+data.localtime;
            MessageThree.innerHTML="Temperature: "+data.temperature+" degree Celcius";
            MessageFour.innerHTML="Weather Description: "+data.weather_descriptions;
            MessageFive.setAttribute("src",data.weather_icons);


            

           }
        })
    })
});
