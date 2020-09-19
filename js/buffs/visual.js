function setupBuffs() {
    var buffRow = document.getElementById("buffs");
    for(buffId in buffs) {
        var buffElem = document.createElement("div");
        buffElem.classList.add("buff");
        buffElem.classList.add("buff-hidden");
        buffElem.setAttribute("id", buffId);
        buffElem.setAttribute("style", "border-color:" + buffs[buffId].color);
        buffElem.innerHTML = 
            "<img src='img/buff_icons/" + buffs[buffId].icon + ".png'/>" +
            "<span class='buff-text'>0</span>" + 
            "<div class='buff-overlay'></div>";
        buffRow.appendChild(buffElem);
    }
}

function setTime(buffId, time, maxTime, invert) {
    var percent = invert ? 100 - (100 * time/maxTime) : (100 * time/maxTime);
    document.getElementById(buffId).querySelector(".buff-text").innerHTML = time.toFixed(0);
    document.getElementById(buffId).querySelector(".buff-overlay").setAttribute("style","height:" + percent + "%");
}

function hide(buffId) {
    document.getElementById(buffId).classList.add("buff-hidden");
}

function unHide(buffId) {
    document.getElementById(buffId).classList.remove("buff-hidden");
}

function buffOnCd(buffId) {
    document.getElementById(buffId).classList.add("buff-cd");
}

function buffReady(buffId) {
    document.getElementById(buffId).classList.remove("buff-cd");
    document.getElementById(buffId).classList.add("buff-ready");
}

function buffActive(buffId) {
    document.getElementById(buffId).classList.remove("buff-cd");
    document.getElementById(buffId).classList.remove("buff-ready");
}