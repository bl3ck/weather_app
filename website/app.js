
/* Global Variables */
const URL = "http://api.openweathermap.org/data/2.5/weather"
const API_KEY = "708f11cf0ed3d72a66e148d077ba6fef"
const getWeatherMapData = async (zip) => {
    try {
        const result = await fetch(URL + `?zip=${zip}&appid=${API_KEY}`, {
            mode: 'cors'
        })
        // console.log(" resp ", result)
        return result.json()
    } catch (error) {
        console.log(" some errors occured", error)
    }
}
const updateUI = async (data) => {
    let uiData = await data;
    console.log(uiData);
    document.getElementById("date").innerHTML = uiData.date
    document.getElementById("content").innerHTML = uiData.content
    document.getElementById("temp").innerHTML = uiData.temperature
}

const syncWeatherMapData = async (path, data) => {
    try {
        console.log(" sendign th following", data)
        const result = await fetch(path, {
            mode: 'cors',
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                "Content-type": 'application/json'
            }
        })
        // console.log(" resp ", result)
        // return result.json()
        await updateUI(result.json())
    } catch (error) {
        console.log(" some errors occured", error)
    }

}



let buttonGenerate = document.getElementById('generate')
buttonGenerate.addEventListener('click', async () => {
    try {
        const zipCode = document.getElementById('zip').value
        // Create a new date instance dynamically with JS
        let d = new Date();
        let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear()

        let response = await getWeatherMapData(zipCode)
        console.log(response)
        // const date = document.getElementById("date")
        const feelings = document.getElementById("feelings").value
        const data = { date: newDate, temperature: response.main.temp, content: feelings, apiData: response }
        await syncWeatherMapData("http://localhost:3000/weather", data)

    } catch (error) {
        console.log(error)
    }
})