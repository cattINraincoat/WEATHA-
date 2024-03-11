const apikey="3445a6fb592d8804b91fc3f8270f12b2";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput= document.querySelector(".cityInput");
const searchbtn= document.querySelector(".searchbtn");
const wicon= document.querySelector(".weather-icon");
const degbtn= document.querySelector(".degbtn");

async function checkWeather(city){

    const response= await fetch(apiurl + city  +`&appid=${apikey}`);
    var data= await response.json();

    if(response.status ==404)
    {
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }

    document.querySelector(".city").innerHTML= data.name;
    document.querySelector(".temp").innerHTML= `${Math.round(data.main.temp)}`;
    document.querySelector(".degbtn").innerHTML="°C";
    document.querySelector(".humidity").innerHTML= `${data.main.humidity}%`;
    document.querySelector(".windspeed").innerHTML= `${data.wind.speed} km/h`;



   //updating the weather image
   if(data.weather[0].main == "Clouds")
   {
       wicon.src= "images/clouds.png";
   }
   else if( data.weather[0].main == "Clear")
   {
       wicon.src= "images/clear.png";
   }
   else if( data.weather[0].main == "Rain")
   {
       wicon.src= "images/rain.png";
   }
   else if( data.weather[0].main == "Drizzle")
   {
       wicon.src= "images/drizzle.png";
   }
   else if( data.weather[0].main == "Mist")
   {
       wicon.src= "images/mist.png";
   }
   document.querySelector(".weather").style.display="block";
    


}
searchbtn.addEventListener("click",()=>{

    
    document.querySelector(".error").style.display="none";
    checkWeather(cityInput.value);
})

// To get temperature in Farenhiet we changed the parameters
async function convertToF(city) {

    const response= await fetch("https://api.openweathermap.org/data/2.5/weather?units=imperial&q=" + city  +`&appid=${apikey}`);
    var data= await response.json();
    document.querySelector(".temp").innerHTML= `${Math.round(data.main.temp)}`;
    document.querySelector(".degbtn").innerHTML="°F";


}
degbtn.addEventListener("click",()=>{
    // when it C, we call the function which fetches temp in farenhiet
    convertToF(cityInput.value);
    // if temp is already in fareniet, we fetch the function which gets temp in celcius
    if(degbtn.innerHTML=="°F"){
        document.querySelector(".error").style.display="none";
    checkWeather(cityInput.value);

    }
})






