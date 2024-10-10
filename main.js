import axios from "axios";

const api = "http://api.openweathermap.org/data/2.5/forecast?lat=25.7484&lon=84.1194&appid=0b97b932eb82532bbf0a3972b932cc69";

async function anurag() {
    const newData = await axios.get(api);
    const list = newData.data.list;

    var day;
    for (var i = 1; i < newData.data.list.length; i++) {
        const climate = list[i].dt_txt;
        if (climate.includes("00:00:00")){
            day=i;
            console.log(climate+ "\n" + day);
            break;
        }
    }
    
    // console.log(data.data.list[0].weather);
}

anurag();
