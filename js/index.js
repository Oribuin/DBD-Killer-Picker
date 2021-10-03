let consoleMessage = [
    "OH HEY, WHAT ARE YOU DOING HERE?\n" +
    "well while you're here, instead of you messing with stuff, Let me give you\n" +
    "a tutorial around this place.\n" +
    "\n" +
    "If you want to toggle a killer, Here is an example\n" +
    "toggleKiller(\"WRAITH\")"
]

consoleMessage.forEach(value => console.log(value))

// So someone doesn't get the same killer twice
let lastKiller = {name: "UNKNOWN", enabled: true}

// Set all the killer values, Yes this is awful, I'm aware but i do not care anymore, this language sucks
let killers = [
    {name: "TRAPPER", enabled: true},
    {name: "WRAITH", enabled: true},
    {name: "HILLBILLY", enabled: true},
    {name: "NURSE", enabled: true},
    {name: "SHAPE", enabled: true},
    {name: "HAG", enabled: true},
    {name: "DOCTOR", enabled: true},
    {name: "HUNTRESS", enabled: true},
    {name: "CANNIBAL", enabled: true},
    {name: "NIGHTMARE", enabled: true},
    {name: "PIG", enabled: true},
    {name: "CLOWN", enabled: false},
    {name: "SPIRIT", enabled: true},
    {name: "LEGION", enabled: true},
    {name: "GHOST_FACE", enabled: true},
    {name: "DEMOGORGON", enabled: true},
    {name: "ONI", enabled: true},
    {name: "DEATHSLINGER", enabled: true},
    {name: "PYRAMID_HEAD", enabled: true},
    {name: "BLIGHT", enabled: true},
    {name: "TWINS", enabled: true},
    {name: "TRICKSTER", enabled: true},
    {name: "NEMESIS", enabled: true},
    {name: "CENOBITE", enabled: true}
]

/**
 * Toggle all of the killers on or off.
 *
 * @returns {string}
 */
function toggleAll(enabled) {
    killers.forEach(value => {
        let classList = document.getElementById(value.name).classList

        if (enabled)
            classList.remove("killer-disabled")
        else
            classList.add("killer-disabled")

        value.enabled = enabled
    })
    return "Toggled all killers."
}

/**
 * Toggle whether a killer is enabled or not.
 *
 * @param name The name of the killer
 */
function toggleKiller(name) {

    let killer = killers.find(value => value.name === name)
    killer.enabled = !killer.enabled

    let killerElement = document.getElementById(name)
    killerElement.classList.toggle("killer-disabled")

    return "Toggled Killer: " + killer.name
}

/**
 * Select a random killer from the list of enabled killers.
 *
 * Display the killer on screen.
 */
function selectRandomKiller() {
    let newKiller = killers.filter(value => value.enabled && lastKiller.name !== value.name).random()
    lastKiller.name = newKiller.name

    let refreshEle = document.getElementById("random-killer")
    refreshEle.innerText = `${capitalizeFully(newKiller.name.replace('_', ' '))} (Refresh)`

    let iconEle = document.getElementById("killer-image")
    iconEle.setAttribute("src", `./img/${newKiller.name.toLowerCase() + ".png"}`)
    return newKiller
}

// Credit: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))]
}

// Temp functions because I was lazy and didnt wanna type out all the labels
// function logKillers() {
//     killers.map(value => "<label id='" + value.name + "' onClick='toggleKiller(\"" + value.name + "\")'>" + capitalizeFully(value.name) + "</label>").forEach(value => console.log(value));
// }

function capitalizeFully(text) {
    const textSplit = text.toLowerCase().split(' ')
    let builder = ""

    textSplit.forEach(value => {
        let firstChar = value.charAt(0)
        builder += firstChar.toUpperCase() + value.substr(1) + " "
    })

    return builder
}