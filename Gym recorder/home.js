import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const apIley = {
    databaseURL: "https://realtime-database-ab9fe-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(apIley);
const db = getDatabase(app);
const place = ref(db , "Exc");


let to_store = document.querySelector(".List-of-exc");

const exercisesText = `Back_workout
Mid-row upper
Lat pull-down
Mid-row lower
Australian pull-ups
One-Arm dumbbell Row
Deadlift
******************************************
Apps_workout
Abdominal crushes machine
Leg raises or hanging leg-raises
Russian twist or sleep and swing your legs left and right
******************************************
Legs_workout_and_butt 
Leg extension with machine
Leg press with machine
Leg curl
Squats with weights with machine / pistol
Lunges
Calfs
******************************************
Shoulders
Side lateral
Rear deltoids
Front military press
Dumbbell shrugs for traps
******************************************
Chest
15 degree incline dumbbell press
Bench press
Seated cable flyes
Chest press
Incline bench press
Push-ups
******************************************
arms
One Arm dumbbell overhead extension
Dips
Biceps curls inwards
Biceps curls outward
Hammer
Tricep push-down
******************************************

`;

// push(place, "Another one")

const exerciseCategories = exercisesText.split('******************************************\n').filter(category => category.trim() !== '');

const Exc = {};

exerciseCategories.forEach(category => {
    const lines = category.trim().split('\n');
    const categoryName = lines[0].trim();
    const exercises = lines.slice(1).map(exercise => exercise.trim());
    Exc[categoryName] = exercises;
});


if (0) {
    for (let iterator in Exc) {
        pa = {
            iterator: Exc[iterator]
        }
        // console.log(pa);
        // push(place, pa);

    }
    const exact_location = ref(dataInDB, `Exc/${id}`)
    remove(exact_location);
}

// let first = Exc["Back_workout"];
// console.log(first)

const create_display = (Entry) => {
    
    // Create the main container div
    const excDetailsContainer = document.createElement('div');
    excDetailsContainer.classList.add('Exc-Details');

    // Create the exercise name div
    const excNameDiv = document.createElement('div');
    excNameDiv.classList.add('Exc-Name');
    excNameDiv.textContent = Entry;

    // Create the details container div
    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('details');

    // Create the Reps input element
    const repsInput = document.createElement('input');
    repsInput.setAttribute('type', 'text');
    repsInput.setAttribute('placeholder', 'Reps ...');
    repsInput.classList.add('Reps');

    // Create the Weights input element
    const weightsInput = document.createElement('input');
    weightsInput.setAttribute('type', 'text');
    weightsInput.setAttribute('placeholder', 'Weights ...');
    weightsInput.classList.add('Weights');

    // Append the elements to the appropriate containers
    detailsContainer.appendChild(repsInput);
    detailsContainer.appendChild(weightsInput);

    excDetailsContainer.appendChild(excNameDiv);
    excDetailsContainer.appendChild(detailsContainer);

    // Append the entire Exc-Details block to the document body
    to_store.appendChild(excDetailsContainer);

}

const clear_content = () => {
    Array.from(to_store.children).forEach(ele => {
        stored_data.removeChild(ele);
    })
}

clear_content();
const create_per = lsit =>{
    lsit.forEach(element => {
        create_display(element);
        console.log(element)
    });
}

create_per(Exc["Legs_workout_and_butt"]);
// for (let iterator in Exc) {
    // console.log(Exc[iterator])
// }
