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
let survivors = [
    {name: "DWIGHT", enabled: true},
    {name: "MEG", enabled: true},
    {name: "CLAUDETTE", enabled: true},
    {name: "JAKE", enabled: true},
    {name: "NEA", enabled: true},
    {name: "LAURIE", enabled: true},
    {name: "ACE", enabled: true},
    {name: "BILL", enabled: true},
    {name: "FENG", enabled: true},
    {name: "DAVID", enabled: true},
    {name: "QUENTIN", enabled: true},
    {name: "DETECTIVE_TAPP", enabled: true},
    {name: "KATE", enabled: true},
    {name: "ADAM", enabled: true},

    {name: "JEFF", enabled: true},
    {name: "JANE", enabled: true}, // 17
    {name: "ASH", enabled: true},
    {name: "NANCY", enabled: true},
    {name: "STEVE", enabled: true},
    {name: "YUI", enabled: true},
    {name: "ZARINA", enabled: true},
    {name: "CHERYL", enabled: true},
    {name: "FELIX", enabled: true},
    {name: "ELODIE", enabled: true},
    {name: "YUN_JIN_LEE", enabled: true},
    {name: "JILL", enabled: true},
    {name: "LEON", enabled: true},
    // {name: "MIKAELA", enabled: true}, // Disabled until I have a matching portrait
]

// Instead of manually adding all the survivors into the sidebars, We add them on a JavaScript level for pure convenience
// then we split all the survivors in half and add them equally.
setTimeout(() => {
    let survivorsDivided = (survivors.length / 2) + 1

    // Get the first half of the survivors
    let leftSurvivors = survivors.slice(0, survivorsDivided)
    // Get the rest of the survivors
    let rightSurvivors = survivors.slice(survivorsDivided, survivors.length)

    // Add the first half of the survivors to the left sidebar.
    leftSurvivors.forEach(killer => addSurvivorToElement(killer, "sidebar-left"))
    // Add second half of the survivors to the right sidebar
    rightSurvivors.forEach(killer => addSurvivorToElement(killer, "sidebar-right"))

}, 20)

/**
 * Toggle all of the survivors on or off.
 *
 * @returns {string}
 */
function toggleAll(enabled) {
    survivors.forEach(value => {
        let classList = document.getElementById(value.name).classList

        if (enabled)
            classList.remove("disabled")
        else
            classList.add("disabled")

        value.enabled = enabled
    })
    return "Toggled all survivors."
}

/**
 * Toggle whether a killer is enabled or not.
 *
 * @param name The name of the killer
 */
function toggleSurvivor(name) {
    let survivor = survivors.find(value => value.name === name)
    survivor.enabled = !survivor.enabled

    let killerElement = document.getElementById(name)
    killerElement.classList.toggle("disabled")

    return "Toggled Survivor: " + survivor.name
}

/**
 * Select a random survivor from the list of enabled survivors.
 *
 * Display the survivor on screen.
 */
function selectRandomSurvivor() {
    let newSurvivor = survivors.filter(value => value.enabled && lastKiller.name !== value.name).random()
    lastKiller.name = newSurvivor.name

    let element = document.getElementById("random-character")
    console.log(element)
    // refreshEle.innerText = `${capitalizeFully(newSurvivor.name.replace('_', ' '))} (Refresh)`

    let iconEle = document.getElementById("image")
    iconEle.setAttribute("src", `./img/${newSurvivor.name.toLowerCase() + ".png"}`)
    return newSurvivor
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
    const textSplit = text.replaceAll('_', ' ').toLowerCase().split(' ')
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
function addSurvivorToElement(killer, elementName) {
    let label = "<label id='" + killer.name + "' onclick='toggleSurvivor(\"" + killer.name + "\")'>" + capitalizeFully(killer.name) + "</label>"

    let element = document.getElementById(elementName)
    element.innerHTML += label;

    // Was for some anti clown mechanics but still useful regardless
    if (!killer.enabled) {
        document.getElementById(killer.name).classList.toggle("disabled")
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