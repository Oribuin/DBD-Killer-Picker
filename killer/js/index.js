let consoleMessage = [
    "OH HEY, WHAT ARE YOU DOING HERE?\n" +
    "well while you're here, instead of you messing with stuff, Let me give you\n" +
    "a tutorial around this place.\n" +
    "\n" +
    "If you want to toggle a survivor, Here is an example\n" +
    "toggleSurvivor(\"DWIGHT\")\n" +
    "\n" +
    "If you want to see 2 beautiful michaels dancing...\n" +
    "toggleMichael()"
]

consoleMessage.forEach(value => console.log(value))

// So someone doesn't get the same killer twice
let lastKiller = {name: "UNKNOWN", enabled: true}

// Should you have a beautiful michael myers dancing.
let dancingMichael = false

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
    {name: "CENOBITE", enabled: true},
]

// Instead of manually adding all the killers into the sidebars, We add them on a JavaScript level for pure convenience
// then we split all the killers in half and add them equally.
setTimeout(() => {
    let killersDivided = killers.length / 2

    // Get the first half of the killers
    let leftKillers = killers.slice(0, killersDivided)
    // Get the rest of the killers
    let rightKillers = killers.slice(killersDivided, killers.length)

    // Add the first half of the killers to the left sidebar.
    leftKillers.forEach(killer => addKillerToElement(killer, "sidebar-left"))
    // Add second half of the killers to the right sidebar
    rightKillers.forEach(killer => addKillerToElement(killer, "sidebar-right"))

}, 1)

/**
 * Toggle all of the killers on or off.
 *
 * @returns {string}
 */
function toggleAll(enabled) {
    killers.forEach(value => {
        let classList = document.getElementById(value.name).classList

        if (enabled)
            classList.remove("disabled")
        else
            classList.add("disabled")

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
    killerElement.classList.toggle("disabled")

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

    let refreshEle = document.getElementById("random-character")
    refreshEle.innerText = `${capitalizeFully(newKiller.name.replace('_', ' '))} (Refresh)`

    let iconEle = document.getElementById("image")
    iconEle.setAttribute("src", `./img/${newKiller.name.toLowerCase() + ".png"}`)
    return newKiller
}

// Credit: https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))]
}


/**
 * Format a string in the way I want for extra styling.
 *
 * @param text The text being capitalize & formatted.
 * @returns {string}
 */
function capitalizeFully(text) {
    const textSplit = text.replace('_', ' ').toLowerCase().split(' ')
    let builder = ""

    textSplit.forEach(value => {
        let firstChar = value.charAt(0)
        builder += firstChar.toUpperCase() + value.substr(1) + " "
    })

    return builder
}

/**
 * Add a killer's name to an element based on ID
 *
 * @param killer The killer object
 * @param elementName The name of the element.
 */
function addKillerToElement(killer, elementName) {
    let label = "<label id='" + killer.name + "' onclick='toggleKiller(\"" + killer.name + "\")'>" + capitalizeFully(killer.name) + "</label>"

    let element = document.getElementById(elementName)
    element.innerHTML += label;

    // Some anti clown mechanics
    if (!killer.enabled) {
        document.getElementById(killer.name).classList.toggle("disabled")
    }

    // Some more anti clown mechanics
    if (killer.name === "CLOWN") {
        document.getElementById(killer.name).setAttribute("title", "Why would you play this")
    }

}

/**
 * Why wouldn't you want to see a dancing michael on your screen
 */
function toggleMichael() {

    let leftMyers = document.getElementById("dancing-michael-left")
    let rightMyers = document.getElementById("dancing-michael-right")

    dancingMichael = !dancingMichael
    let visibility = dancingMichael ? "visible" : "hidden";

    leftMyers.style.visibility = visibility
    rightMyers.style.visibility = visibility
    return "Look at him go, so majestic."
}