const express=require('express');
const app=express();
const https=require('https');
const bodyParser=require("body-parser")
let ejs = require('ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))
app.set('view engine','ejs')

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=465d9aa575c58a3786767f22671c064a&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const place = weatherData.name;
      const wether = weatherData.weather[0].description;
      const temp = weatherData.main.temp;
      const tempf = weatherData.main.feels_like;
      const humidity = weatherData.main.humidity;
      const mydata = weatherData.weather[0].icon;
      const icon = "http://openweathermap.org/img/wn/" + mydata + "@2x.png";

      // res.writeHead(200, {
      //   'Content-Type': 'text/html'
      // })

     res.render("weather",{place:place,wether:wether,temp:temp,tempf:tempf,humidity:humidity,icon:icon});

    })
  })
});
app.listen(process.env.PORT||3000,function(){
  console.log("server @ 3000");

})

// res.write("<h1>" + place + "</h1>")
// res.write("<h3>Weather Description: <em>" + wether + "</em> </h3>");
// res.write("<h3>Temperature: " + temp + " deg C</h3>");
// res.write("<h3>Temperature(feels like): " + tempf + " deg C</h3>");
// res.write("<h3>Humidity: " + humidity + " </h3>");
// res.write("<img src=" + icon + ">");
// res.send();

//http://openweathermap.org/img/wn/10d@2x.png
