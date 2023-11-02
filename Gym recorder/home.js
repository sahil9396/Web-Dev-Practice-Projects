import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const apIley = {
    databaseURL: "https://realtime-database-ab9fe-default-rtdb.asia-southeast1.firebasedatabase.app"
}

const app = initializeApp(apIley);
const db = getDatabase(app);
const Days_Part = ref(db, "Days_of_Each_Part");
const List_Of_part = ref(db, "List_of_excerises_of_Each_part");
const Date_Exc = ref(db, "Date_Part");
const Exc_reps = ref(db, "Date_Exc_reps");
const Exc_weights = ref(db, "Date_Exc_weights");


let to_store = document.querySelector(".List-of-exc");
// let stored_data = document.querySelector(".List-of-exc");

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
const exerciseCategories = exercisesText.split('******************************************\n').filter(category => category.trim() !== '');
const Exc = {};

let reps_list = [];
let weights_list = [];
exerciseCategories.forEach(category => {
    const lines = category.trim().split('\n');
    const categoryName = lines[0].trim();
    const exercises = lines.slice(1).map(exercise => exercise.trim());
    Exc[categoryName] = exercises;
});

const create_display = (Entry, id) => {

    // Create the main container div
    const excDetailsContainer = document.createElement('div');
    excDetailsContainer.classList.add('Exc-Details');

    // Create the exercise name div
    const excNameDiv = document.createElement('div');
    excNameDiv.classList.add('Exc-Name');
    excNameDiv.textContent = Entry;

    // Create the details form element
    const detailsForm = document.createElement('form'); // Change this to a form element
    detailsForm.classList.add('details');

    // Create the Reps input element
    const repsInput = document.createElement('input');
    repsInput.setAttribute('type', 'text');
    repsInput.setAttribute('placeholder', 'Reps ...');
    repsInput.classList.add('Reps');
    repsInput.classList.add(id);

    // Create the Weights input element
    const weightsInput = document.createElement('input');
    weightsInput.setAttribute('type', 'text');
    weightsInput.setAttribute('placeholder', 'Weights ...');
    weightsInput.classList.add('Weights');
    weightsInput.classList.add(id);


    // This is to make form submit function working
    const button = document.createElement('button');
    button.style.display = "none"

    // Append the elements to the form element
    detailsForm.appendChild(button);
    detailsForm.appendChild(repsInput);
    detailsForm.appendChild(weightsInput);

    detailsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let v1 = (repsInput.value).trim();
        if (v1 !== '') {
            reps_list[id] = v1;
        }
        let v2 = weightsInput.value;
        if (v1 !== '') {
            weights_list[id] = v2;
        }
        check_array(reps_list);
    });

    excDetailsContainer.appendChild(excNameDiv);
    excDetailsContainer.appendChild(detailsForm);

    // Append the entire Exc-Details block to a parent element (e.g., 'to_store')
    to_store.appendChild(excDetailsContainer);
};

const clear_content = () => {
    Array.from(to_store.children).forEach(ele => {
        to_store.removeChild(ele);
    })
}

const create_per = lsit => {
    document.addEventListener("DOMContentLoaded", () => {
        clear_content();
        lsit.forEach((element, i) => {
            create_display(element, i);
        });
    });
}
create_per(Exc["Legs_workout_and_butt"]);

const Days_and_Excerise = () => {
    let Day_Exc = Object.keys(Exc);
    let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    let p = {};
    days.forEach((ele, i) => {
        p[ele] = Day_Exc[i];
    })
    push(Days_Part, p);
}
const List_of_each_part = () => {
    let part = {};
    Day_Exc.forEach((element, i) => {
        part[element] = Exc[element];
        push(List_Of_part, part);
        part = {};
    });
}
const push_things = () => {
    Days_and_Excerise();
    List_of_each_part();
}

const val = () => {
    onValue(List_Of_part, function (snapshot) {
        if (snapshot.exists()) {
            // console.log("there is something")
        } else {
            push_things();
        }
    })
}

// val();

const check_array = (listt) => {
    if (listt.length === Exc["Legs_workout_and_butt"].length) {
        let ob2 = true;
        for (let index = 0; index < listt.length; index++) {
            if (listt[index]) {
                console.log(listt[index]);
            }
            else {
                console.log("false");
                // ob2 = false;
                break;
            }
        }
        
    }
}
