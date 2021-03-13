function setupBuffsUI(user, config) {
    var buffRow = document.getElementById("buffs");
    buffRow.innerHTML = "";
    for(const buffId in user.buffs) {
        var buff = user.buffs[buffId];
        var buffElem = document.createElement("div");
        buffElem.classList.add("buff");
        buffElem.classList.add("buff-hidden");
        if(buff.data.party) {
            buffElem.classList.add("buff-personal");
        }
        buffElem.setAttribute("id", buffId);
        buffElem.setAttribute("style", "border-color:" + buff.data.color);
        buffElem.innerHTML = `
            <img src='img/buff_icons/${user.getIconName(buff)}.png'/>
            <span class='pulse'></span>
            <span class='buff-text'>0</span>
            <div class='buff-overlay'></div>`;
        buffRow.appendChild(buffElem);
    }
}

function setTimeUI(buffId, time, maxTime, invert, user, config) {
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

function buffOnCdUI(buffId) {
    document.getElementById(buffId).classList.add("buff-cd");
}

function buffReadyUI(buffId) {
    document.getElementById(buffId).classList.remove("buff-cd");
    document.getElementById(buffId).classList.add("buff-ready");
}

function buffActiveUI(buffId) {
    document.getElementById(buffId).classList.remove("buff-cd");
    document.getElementById(buffId).classList.remove("buff-ready");
}

export {setupBuffsUI, setTimeUI, hide, unHide, buffOnCdUI, buffReadyUI, buffActiveUI}