const api_key = "a9a591e4cd59c2324348dff31b2ac7dd";
let temps = document.querySelector(".calcius");
let button = document.querySelector("button");
let input_city = document.querySelector("#textinput");
let state_present = document.querySelector(".state-present");
let change_content = Array.from(document.getElementsByClassName("box"));
let a = 1;
a = "london";
// a = "london";
// button.addEventListener("click" , (e)=>{
//     console.log(a);
//     // a = input_city.value;
//     let weather_data= new Promise( (rev , rej)=>{
//         try{
//             let data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${api_key}&units=metric`);
//             rev(data);
//         }
//         catch(datass){
//             rej(datass);
//             alert(`What the shit is this ${datass}`);
//         }
//     } )

//     weather_data.then( (daa)=>{
//         return daa.json();
//     } ).catch( (daa)=>{
//         // alert(daa);
//         console.log(new Error(daa));
//     } ).then( (datas)=>{
//         document.querySelector(".replacement").innerHTML = `<img src="http://openweathermap.org/img/wn/${datas.sys.id}.png" alt="Weather Icon">`;
//         console.log(document.querySelector("img").attributes[1]);
//         temps.innerHTML = `${datas.main.temp}'C ${a}`;
//         state_present.innerHTML = datas.weather[0].description;
//         change_content[0].innerHTML = `Feels like : ${datas.main.feels_like}'C`;
//         change_content[1].innerHTML = `Humidity : ${datas.main.humidity}%`;
//         change_content[2].innerHTML = `wind speed:${datas.wind.speed}m/s`;
//         // sydney
//         document.querySelector(".invisble-info").style.display = "flex";
//     } )
// })


// async function abcd(a , apikey){

//     try {
//         let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${apikey}&units=metric`);

//         if (!data.ok) {
//             return new Error("This is shit")
//         }

//         return await data.json();

//     } catch (error) {
//         alert(error);
//     }

// }

// button.addEventListener("click" , ()=>{
//     what = abcd(a , api_key);
//     console.log(what);
// })

button.addEventListener("click" , ()=>{
    
    let shit = new Promise((rev, rej) => {
        
        try {
            let data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${api_key}&units=metric`);
            
            if((data.ok) === Error){
                alert("Ti")
            }

            rev(data);
            
        } catch (error) {
            alert(error);
        }


    })
    
    shit.then((dat) => {
        return dat.json(); 
    }).catch((datas) => {
        
        console.log(datas);

    }).then( (datass)=>{
        
        console.log(datass)


    } )

})