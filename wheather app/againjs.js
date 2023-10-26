const api_key = "a9a591e4cd59c2324348dff31b2ac7dd";
let button = document.querySelector("form");
let invisble = document.querySelector(".invisble-info");
let a = "londonss";
let data = 0;

async function abc(city) {

    try {
        data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);

        const content = await data.json();

        invisble.innerHTML = `
            <div class="img-replacement">
                <img src="http://openweathermap.org/img/wn/${content.weather[0].icon}.png" alt="Weather Icon">
            </div>
            <p class="calcius">
                ${content.main.temp}'C ${a}
            </p>
            <div class="state-present">
                ${content.weather[0].description}
            </div>
            <div class="more-info">
                <div class="box">
                    Feels like : ${content.main.feels_like}'C
                </div>
                <div class="box">
                    Humidity : ${content.main.humidity}%
                </div>
                <div class="box">
                    wind speed:${content.wind.speed}m/s
                </div>
            </div>`;
    }

    catch (eror) {
        console.log("their is a error");
        invisble.innerHTML = ` <div class="error_box">
                                    Enter The Correct City Name
                                </div>`
    }

}

function chatgpt_code(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then((data) => {
        if (data.ok) {
            return data.json();
        } else {
            console.log("Extracted")
          throw new Error("Network response was not ok.");
        }
      })
      .then((content) => {
        invisble.innerHTML = `
          <div class="img-replacement">
              <img src="http://openweathermap.org/img/wn/${content.weather[0].icon}.png" alt="Weather Icon">
          </div>
          <p class="calcius">
              ${content.main.temp}'C ${a}
          </p>
          <div class="state-present">
              ${content.weather[0].description}
          </div>
          <div class="more-info">
              <div class="box">
                  Feels like: ${content.main.feels_like}'C
              </div>
              <div class="box">
                  Humidity: ${content.main.humidity}%
              </div>
              <div class="box">
                  Wind speed: ${content.wind.speed}m/s
              </div>
          </div>`;
      })
      .catch((error) => {
        console.log("There is an error:", error);
        invisble.innerHTML = `
          <div class="error_box">
              Enter The Correct City Name
          </div>`;
      });
}

button.addEventListener("submit", (ev) => {
    ev.preventDefault();

    a = button.firstElementChild.value;

    abc(a);

})


// let my_promise = new Promise((rev, rej) => {

//     try {
//         data = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=${api_key}&units=metric`);

//     } catch (error) {
//         console.log("this shit gives error this is first" , error);
//         rej(new Error(error));
//     }
//     rev(data);
// })

// my_promise.then( data=>{
//     return data.json();
// } ).catch( eror=>{
//     console.error(eror);
// } ).then((content) => {
//     invisble.innerHTML = `
//       <div class="img-replacement">
//           <img src="http://openweathermap.org/img/wn/${content.weather[0].icon}.png" alt="Weather Icon">
//       </div>
//       <p class="calcius">
//           ${content.main.temp}'C ${a}
//       </p>
//       <div class="state-present">
//           ${content.weather[0].description}
//       </div>
//       <div class="more-info">
//           <div class="box">
//               Feels like: ${content.main.feels_like}'C
//           </div>
//           <div class="box">
//               Humidity: ${content.main.humidity}%
//           </div>
//           <div class="box">
//               Wind speed: ${content.wind.speed}m/s
//           </div>
//       </div>`;
//   })
//   .catch((error) => {
//     console.log("There is an error:", error);
//     invisble.innerHTML = `
//       <div class="error_box">
//           Enter The Correct City Name
//       </div>`;
//   });


//   reaseon why my promise method and try catch didn't work.

//       In the code you've provided, you're attempting to create a custom Promise to handle the fetch operation without using async and await. There are a few key differences between your custom Promise code and the previous code I provided:

// Error Handling:

// In the previous code I provided, error handling is more robust. It checks if the fetch request was successful (data.ok) and handles network-related errors more explicitly.
// In your custom Promise code, you are using a try...catch block within the Promise constructor. This approach doesn't work as expected because the fetch operation is asynchronous and errors that occur in it won't be caught by the try...catch block.
// Promise Resolving:

// In the previous code, the Promise is resolved with the JSON data after the fetch is successful. It uses the .then() method to handle the data.
// In your custom Promise code, you attempt to resolve the Promise with the data variable directly, which might not contain the expected JSON data because the fetch operation is asynchronous.
// Error Propagation:

// In the previous code, errors are explicitly thrown using throw new Error and properly handled with .catch() blocks.
// In your custom Promise code, there is an attempt to catch an error within the try...catch block, but it won't capture errors that occur during the asynchronous fetch operation.
// The key issue with your custom Promise code is that it attempts to handle errors synchronously within the try...catch block, which won't work for asynchronous operations like fetch. It's generally better to handle errors using .catch() after the asynchronous operation, as shown in the previous code.

// The previous code using Promises and .then() and .catch() is more reliable and follows best practices for error handling with asynchronous operations.


// .then( (data)=>data.json() )
// .catch ( (err)=>{
//     console.log("First error");
//     return err;
// } )
// .then((content) => {
//     console.log("no error is not going to come")
//     // const content =  data.json();
//     console.log(content , "This shit doesn't gives error" )
//     // invisble.innerHTML = `
//     //     <div class="img-replacement">
//     //         <img src="http://openweathermap.org/img/wn/${content.weather[0].icon}.png" alt="Weather Icon">
//     //     </div>
//     //     <p class="calcius">
//     //         ${content.main.temp}'C ${a}
//     //     </p>
//     //     <div class="state-present">
//     //         ${content.weather[0].description}
//     //     </div>
//     //     <div class="more-info">
//     //         <div class="box">
//     //             Feels like : ${content.main.feels_like}'C
//     //         </div>
//     //         <div class="box">
//     //             Humidity : ${content.main.humidity}%
//     //         </div>
//     //         <div class="box">
//     //             wind speed:${content.wind.speed}m/s
//     //         </div>
//     //     </div>`;
// }).catch((ero) => {
//     console.log(ero , "This shit gives error second");
// })





