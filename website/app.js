// Personal API Key for OpenWeatherMap API

const key = '&appid=0617c705bde8584f065...';
const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const countryCode = `,us`;
const units = `&units=imperial`;

// Event listener to add function to existing HTML DOM element listening for a click on the generate
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener to take the inputs from the zip and feeling elements
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const url = baseURL +  zipCode + countryCode + key + units;
    getWeather(url);
}


// function to get the weather data from openweather api using USA zip-code
const getWeather = async (url) =>{
    const response = await fetch (url);
    try {
        const data = await response.json();
        console.log(data);
        postData('http://localhost:8000/addWeather', data)
        .then(updateUI())
    }
    catch (error) {
        console.log("error", error)
    }
};


// function to post the data gathered from the api request, and the user inputed feelings data
const postData = async (url = "", data) =>{
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    });
      try {
          const newData = await response.json();
          console.log(newData);
          return newData;
      }
      catch(error) {
          console.log('error: ', error);
      }
    };



//update the ui with the variables stored in all data server side
const updateUI = async() => {
    const request = await fetch('http://localhost:8000/all');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = new Date().toDateString();
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('city').innerHTML = allData.city;
        document.getElementById('description').innerHTML = allData.description;
        document.getElementById('icon').innerHTML = allData.icon;

    }
    catch (error) {
        console.log('error: ' +  error);
    }
};
