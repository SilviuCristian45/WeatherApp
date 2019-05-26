///////////////////////// Weather web app . Current weather , tommonrrow forecast , and more :) //////////////////////

/*                   ////////////// API : OPENWEATHERMAP.COM . JSON format used //////////////////
API used 5 days . 
https://api.openweathermap.org/data/2.5/forecast?q=city_name,ro&appid=878f7ebe7c17602e944d2532f5b4d96d&units=metric
API used for current weather
Turda-city name
http://api.openweathermap.org/data/2.5/weather?q=city_name,ro&appid=878f7ebe7c17602e944d2532f5b4d96d&units=metric
*/

//GLOBAL VARIABLES 
var offset_tommonrow = [];

function SetWind_speed(wind_speed) {
  //wind_speed is calculated in meters / second
  if(wind_speed < 0.3)
  {
    $(".vant span").text("Calm");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-0");
  }
  if(wind_speed >= 0.3 && wind_speed <= 1.5)
  {
    $(".vant span").text("Light air");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-1");
  }
  if(wind_speed > 1.5 && wind_speed <= 3.3)
  {
    $(".vant span").text("Light breeze");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-2");
  }
  if(wind_speed > 3.3 && wind_speed <= 5.5)
  {
    $(".vant span").text("Gentle breeze");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-3");
  }
  if(wind_speed > 5.5 && wind_speed <= 7.9)
  {
    $(".vant span").text("Moderate breeze");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-4");
  } 
  if(wind_speed > 7.9 && wind_speed <= 10.7)
  {
    $(".vant span").text("Fresh breeze");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-5");
  }
  if(wind_speed > 10.7 && wind_speed <= 13.8)
  {
    $(".vant span").text("Strong breeze");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-6");
  }
  if(wind_speed > 13.8 && wind_speed <= 17.1)
  {
    $(".vant span").text("High wind)");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-7");
  }
  if(wind_speed > 17.1  && wind_speed < 20.7)
  {
    $(".vant span").text("Gale (strong wind)");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-8");
  }
  if(wind_speed > 20.7 && wind_speed <= 24.4)
  {
    $(".vant span").text("Severe gale");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-9");
  }
  if(wind_speed > 24.4 && wind_speed <= 28.4)
  {
    $(".vant span").text("Storm");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-10");
  }
  if(wind_speed > 28.4 && wind_speed <= 32.6)
  {
    $(".vant span").text("Violent storm");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-11");
  }
  if(wind_speed > 32.7)
  {
    $(".vant span").text("Hurricane force");
    $(".vant i").removeClass();
    $('.vant i').addClass("wi wi-wind-beaufort-12");
  } 

}
function convert_pressure_inAtmosphere(pressure_value) {//from HectoPascal in atmosphere
     var new_pressure_value = pressure_value * 0.000986923267;
     return new_pressure_value;
}

function display_current_weather()
{
  var city_name = document.getElementById("oras").value;
  $('.titlu').text("Weather in "+ city_name);
  if(city_name != "")
  {
    //get the data and the function result it will be called everytime the api is updated
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q="+city_name+",ro&appid=878f7ebe7c17602e944d2532f5b4d96d&units=metric", function(result){
    //remove the intial font because it will be updated by another font 
    $('.vremea i').removeClass();
    console.log(result.weather[0].main);
    //set the weather in general 
    switch(result.weather[0].main){
      case 'Clear':  
        $('.vremea i').addClass('wi wi-day-sunny');
        $('.col-md-4').css("background-image", "url(Photos/imagine_sun.gif)");  
        break;
      case 'Rain': 
        $('.vremea i').addClass('wi wi-day-rain'); 
        $('.col-md-4').css("background-image", "url(Photos/rain.gif)"); 
        break;
      case 'Clouds': 
        $('.vremea i').addClass('wi wi-day-cloudy');
        $('.col-md-4').css("background-image", "url(Photos/AnimatiePozaNori.gif)"); 
      break;   
      case 'Drizzle': 
        $('.vremea i').addClass('wi wi-day-rain-mix');
        $('.col-md-4').css("background-image", "url(Photos/AnimatiePozaNori.gif)");        
      break;
      case 'Snow': $('.vremea i').addClass('wi wi-day-snow-wind'); break;
      case 'Thunderstorm': 
        $('.vremea i').addClass('wi wi-day-thunderstorm'); 
        $('.col-md-4').css("background-image", "url(Photos/storm.gif)");
      case 'Fog' :
        $(".vremea i").addClass("wi wi-day-fog");
      break;  
    }
    //set the temperature
    $('.temperatura span').text(Math.round(result.main.temp));
    //set the humidity  
    $('.umiditate span').text(Math.round(result.main.humidity));
    //set the wind type . Beaufort scale
    var wind_speed =result.wind.speed;
    SetWind_speed(wind_speed);
    //set pressure in atm
    var pressure_in_HectoPascal = result.main.pressure;
    $('.presiune span').text(Math.round(convert_pressure_inAtmosphere(pressure_in_HectoPascal)) + " atm");
    //remove the intial font because it will be updated by another font 
    $('.presiune i').removeClass();
    $('.presiune i').addClass('wi wi-barometer');
  });
}
    
}
function display_weather_tomonrrow(current_hour,result) {
      //take every hour for tomonrrow . 3,6,9,12,15,18,21,00
      //the indexes for the data of this hours are modifying in function of the current hour 
      //every hour has an offset value that helps me display just the data for 3,6,...00 hours of tomonrrow
  for(var i = offset_tommonrow[current_hour]; i < 9+offset_tommonrow[current_hour]-1; i++)
      {
        //get the hour of element . 
        var hour1 = 0;
        power = 1;
        hour1 = power*result.list[i].dt_txt[12]; power*=10; hour1 = hour1 + power*result.list[i].dt_txt[11]; 
        console.log('indicele '+ i + ' are ora ' + hour1);
        //display the weather in general and set temperature for hour1 
        switch (result.list[i].weather[0].main) {
          case "Clear":
            if(hour1 == 21 || hour1 == 0 || hour1 == 3)
            {
              //display weather for night
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-night-clear'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));         
            }
            else 
            { //display weather for day
            $('.weather'+hour1+' i').removeClass();
            $('.weather'+hour1+' i').addClass('wi wi-day-sunny'); 
            $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp)); 
            }
            $('.humidity'+hour1+' span').text(Math.round(result.list[i].main.humidity));
            break;
        case "Clouds":
            if(hour1 == 21 || hour1 == 0 || hour1 == 3)
            {
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-night-alt-cloudy'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            else 
            {  
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-day-cloudy'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            $('.humidity'+hour1+' span').text(Math.round(result.list[i].main.humidity));
            break;
        case "Rain":
            if(hour1 == 21 || hour1 == 0 || hour1 == 3)
            {
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-night-alt-rain'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            else 
            {  
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-day-rain'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            $('.humidity'+hour1+' span').text(Math.round(result.list[i].main.humidity));
            break;
        case "Drizzle":
            if(hour1 == 21 || hour1 == 0 || hour1 == 3)
            {
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-night-alt-rain-mix'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            else 
            {  
            $('.weather'+hour1+' i').removeClass();
            $('.weather'+hour1+' i').addClass('wi wi-day-rain-mix'); 
            $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            $('.humidity'+hour1+' span').text(Math.round(result.list[i].main.humidity));
            break;
        case "Thunderstorm":
            if(hour1 == 21 || hour1 == 0 || hour1 == 3)
            {
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-night-alt-thunderstorm'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            else 
            { 
                $('.weather'+hour1+' i').removeClass();
                $('.weather'+hour1+' i').addClass('wi wi-day-thunderstorm'); 
                $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            $('.humidity'+hour1+' span').text(Math.round(result.list[i].main.humidity));
            break;
        case "Snow":
            if(hour1 == 21 || hour1 == 0 || hour1 == 3)
            {
              $('.weather'+hour1+' i').removeClass();
              $('.weather'+hour1+' i').addClass('wi wi-night-alt-snow-wind'); 
              $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            else 
            { 
                $('.weather'+hour1+' i').removeClass();
                $('.weather'+hour1+' i').addClass('wi wi-day-snow-wind'); 
                $('.temperature'+hour1+' span').text(Math.round(result.list[i].main.temp));
            }
            $('.humidity'+hour1+' span').text(Math.round(result.list[i].main.humidity));
            break;
          default:
            
            break;
        }    
      }
}
function display_weather_after_tomonrrow(current_hour,result) {
  //display tommonrow day
  var d = new Date();
  var day_index = d.getDay();
  switch (day_index) {
      case 0:
       $(".WeatherTomonrrow").text("Weather tomonrrow ( Monday )");
       $(".WeatherAfterTomonrrow").text("Weather tomonrrow ( Tuesday )");
      break;
      case 1:
       $(".WeatherTomonrrow").text("Weather tomonrrow ( Tuesday )");
       $(".WeatherAfterTomonrrow").text("Weather tomonrrow ( Wednesday )");
      break;
      case 2:
       $(".WeatherTomonrrow").text("Weather tomonrrow ( Monday )");
       $(".WeatherAfterTomonrrow").text("Weather tomonrrow ( Tuesday )");
      break;
      case 3:
       $(".WeatherTomonrrow").text("Weather tomonrrow ( Monday )");
       $(".WeatherAfterTomonrrow").text("Weather tomonrrow ( Tuesday )");
      break;
      case 4:
       $(".WeatherTomonrrow").text("Weather tomonrrow ( Monday )");
       $(".WeatherAfterTomonrrow").text("Weather tomonrrow ( Tuesday )");
      break;
      case 5:
       $(".WeatherTomonrrow").text("Weather tomonrrow ( Monday )");
       $(".WeatherAfterTomonrrow").text("Weather tomonrrow ( Tuesday )");
      break;
  
    default:
      break;
  }

       //take every hour for tomonrrow . 3,6,9,12,15,18,21,00
      //the indexes for the data of this hours are modifying in function of the current hour 
      //every hour has an offset value that helps me display just the data for 3,6,...00 hours of tomonrrow
  for(var i = offset_tommonrow[current_hour] + 9 -1 ; i < 17+offset_tommonrow[current_hour]-1; i++)
  {
    //get the hour of element . 
    var hour1 = 0;
    power = 1;
    hour1 = power*result.list[i].dt_txt[12]; power*=10; hour1 = hour1 + power*result.list[i].dt_txt[11]; 
    console.log('indicele '+ i + ' are ora ' + hour1);
    //display the weather in general and set temperature for hour1 
    switch (result.list[i].weather[0].main) {
      case "Clear":
        if(hour1 == 21 || hour1 == 0 || hour1 == 3)
        {
          //display weather for night
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-night-clear'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));         
        }
        else 
        { //display weather for day
        $('.weather'+hour1+"at"+' i').removeClass();
        $('.weather'+hour1+"at"+' i').addClass('wi wi-day-sunny'); 
        $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp)); 
        }
        $('.humidity'+hour1+"at"+' span').text(Math.round(result.list[i].main.humidity));
        break;
    case "Clouds":
        if(hour1 == 21 || hour1 == 0 || hour1 == 3)
        {
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-night-alt-cloudy'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        else 
        {  
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-day-cloudy'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        $('.humidity'+hour1+"at"+' span').text(Math.round(result.list[i].main.humidity));
        break;
    case "Rain":
        if(hour1 == 21 || hour1 == 0 || hour1 == 3)
        {
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-night-alt-rain'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        else 
        {  
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-day-rain'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        $('.humidity'+hour1+"at"+' span').text(Math.round(result.list[i].main.humidity));
        break;
    case "Drizzle":
        if(hour1 == 21 || hour1 == 0 || hour1 == 3)
        {
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-night-alt-rain-mix'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        else 
        {  
        $('.weather'+hour1+"at"+' i').removeClass();
        $('.weather'+hour1+"at"+' i').addClass('wi wi-day-rain-mix'); 
        $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        $('.humidity'+hour1+"at"+' span').text(Math.round(result.list[i].main.humidity));
        break;
    case "Thunderstorm":
        if(hour1 == 21 || hour1 == 0 || hour1 == 3)
        {
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-night-alt-thunderstorm'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        else 
        { 
            $('.weather'+hour1+"at"+' i').removeClass();
            $('.weather'+hour1+"at"+' i').addClass('wi wi-day-thunderstorm'); 
            $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        $('.humidity'+hour1+"at"+' span').text(Math.round(result.list[i].main.humidity));
        break;
    case "Snow":
        if(hour1 == 21 || hour1 == 0 || hour1 == 3)
        {
          $('.weather'+hour1+"at"+' i').removeClass();
          $('.weather'+hour1+"at"+' i').addClass('wi wi-night-alt-snow-wind'); 
          $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        else 
        { 
            $('.weather'+hour1+"at"+' i').removeClass();
            $('.weather'+hour1+"at"+' i').addClass('wi wi-day-snow-wind'); 
            $('.temperature'+hour1+"at"+' span').text(Math.round(result.list[i].main.temp));
        }
        $('.humidity'+hour1+"at"+' span').text(Math.round(result.list[i].main.humidity));
        break;
      default:
        
        break;
    }    
  }
}
function display_weather_perDays()
{
   var city_name = document.getElementById("oras").value;
   $('.titlu').text("Weather in "+ city_name);
   if(city_name != "")
   {
     $.getJSON("https://api.openweathermap.org/data/2.5/forecast?q="+city_name+",ro&appid=878f7ebe7c17602e944d2532f5b4d96d&units=metric",function(result){
      //generate hour number 
      var current_hour = 0;
      power = 1;
      current_hour = power*result.list[0].dt_txt[12]; power*=10; 
      current_hour = current_hour + power*result.list[0].dt_txt[11];
      console.log("ora care da offset este "+current_hour + " si are offset : "+ offset_tommonrow[current_hour]);     
      display_weather_tomonrrow(current_hour,result);
      display_weather_after_tomonrrow(current_hour,result);
     })
   }
}

function set_offset_array(offset_tommonrow) {
  //found out this rule of building offset_tommonrow by studying the api modification 
  var value = 1;
  for(var hour = 24; hour >=3; hour-=3)
  {
    if(hour != 24)
    {
      offset_tommonrow[hour] = value;
      value++;
    }
    else { offset_tommonrow[0] = value; value++; }
  }
}
//main function . calls when the page is loaded
$(document).ready(function(){
    set_offset_array(offset_tommonrow);
    
});



//////////////////////// Copyright 2018, Dincă Silviu Cristian, All rights reserved. //////////////////////////