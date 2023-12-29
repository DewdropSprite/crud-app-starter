console.log('👋🌍');

function onReady() {
    getCreatureHandler();
}

function submitCreatureButton(event) {
    event.preventDefault();

    const nameInput = document.getElementById("nameInput").value
    const typeInput = document.getElementById("typeInput").value

    const newCreature = { id: " ", name: nameInput, type: typeInput }

    document.getElementById("nameInput").value = " "
    document.getElementById("typeInput").value = " "

    postHandler();
    getCreatureHandler();
   

}

function getCreatureHandler() {
    console.log("inside of getHandler")

    axios
    .get("/creatures")
    .then((response) =>{
        console.log("GET response", response.data)
        renderCreatures(response.data)
    })
    .catch((error)=>{
        alert("ERROR in getHandler")
        console.log("error", error)
    })
}

function postHandler() {
    axios
    .post('/creatures')
    .then((response)=>{
        console.log("Inside postHandler")
        getCreatureHandler()
    })
    .catch((error)=>{
        console.log("error in POST handler", error)
    })

}

function deleteButton(event, id) {
    event.preventDefault();
    console.log("delete event incoming", event.target, id)

    axios
    .delete(`/creatures/${id}`)
    .then((response)=>{
        console.log("deleted creature:", id);
        getCreatureHandler();
    })

 }

// function vampireButton() {

// }

// function werewolfButton() {

// }

function putHandler(event, id) {
    event.preventDefault();
    axios
        .put(`/creatures/${id}`)
        .then((response) => {
            console.log("task is complete")
            getCreaturesHandler();
        })
        .catch((error) => {
            console.log("error in put", error)
        })

}

function renderCreatures(creatures) {
    let creatureList = document.getElementById("creatureList");

    creatureList.innerHTML = " ";
    for(let item of creatures)

    creatureList.innerHTML +=`
    <li>
        <button id = "deleteButton" onclick="deleteButton()">🔥🗑️</button>
        <span>
            ${item.name} is a ${item.type}
        </span>
        <button id = "vampireButton" onclick="vampireButton()">🧛🏻‍♂️ -ify </button>
        <button id = "werewolfButton" onclick="werewolfButton()">🐺 -ify</button>
    </li>`
}

onReady();