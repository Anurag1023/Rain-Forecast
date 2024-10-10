import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const APP_ID = "";
var rainProbab=false;


app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/", async (req, res) => {

  // variables

  var lat,lon;

    // zip to lat and lon

              try {
                const zip = req.body.zip;
                const location = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},IN&appid=${APP_ID}`;
                const data = await axios.get(location);
                lat = JSON.stringify(data.data.lat);
                lon = JSON.stringify(data.data.lon);
                
              } catch (error) {
                res.render("index.ejs",{
                  info: `We don't have data of your city`,
              });
              return;
            }

            // fetching info

            try{

                    const API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APP_ID}`;

                    const newData = await axios.get(API_URL);

                    // tommorrow calculator

                    const list = newData.data.list;
                    var day;

                    const city = newData.data.city.name;
                    

                    for (var i = 1; i < newData.data.list.length; i++) {
                        const climate = list[i].dt_txt;
                        if (climate.includes("00:00:00")){
                            day=i;
                            break;
                        }
                    }

                    
                    // rain probability calculator

                    for (var i = day; i < day+8; i++) {
                        const climate = list[i].weather[0].description;
                        if (climate.includes("rain") || climate.includes("Rain")) {
                            rainProbab = true;
                            break;
                        }
                        else{
                            rainProbab = false;
                        }
                    }

                    if(rainProbab)
                    {
                        res.render("index.ejs",{
                            info: `Tommorrow can be raining in ${city} ☔`
                        })
                    }
                    else{
                        res.render("index.ejs",{
                            info: `No chances of raining in ${city} tommorrow 🌞`
                        })
                    }

          } catch (error) {
            res.render("index.ejs",{
              info: `We don't have data of your city`,
          })
          }

      });
          

app.listen(port, () => {
  console.log(`Port is live at ${port}`);
})
