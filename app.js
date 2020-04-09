const express = require('express');
const ejs = require('ejs');
const bodyParser = require("body-parser");
const request=require("request")
const app = express();
const key=require("./config/keys")
app.set('view engine', 'ejs');
const port=process.env.PORT || 3000;

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));

const url="http://api.weatherstack.com/current?access_key="+key.key+"&query="
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/weather",(req,res)=>{
    var x=req.query.address;
    request(url+x,(error,response,body)=>{
       var data=JSON.parse(body);
       if(data.success==false){
          res.send({
              error:"error"
          })
       }else{
        res.send({
           name:data.location.name ,
           localtime:data.location.localtime,
           temperature:data.current.temperature,
           weather_descriptions:data.current.weather_descriptions[0],
           weather_icons:data.current.weather_icons
       });
      }
    })
})

app.listen(port, function() {
    console.log("server is listening!!!");
});
