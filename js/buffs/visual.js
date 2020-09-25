function setupBuffsUI() {
    var buffRow = document.getElementById("buffs");
    buffRow.innerHTML = "";
    for(buffId in buffs) {
        var buffElem = document.createElement("div");
        buffElem.classList.add("buff");
        buffElem.classList.add("buff-hidden");
        buffElem.setAttribute("id", buffId);
        buffElem.setAttribute("style", "border-color:" + buffs[buffId].color);
        if(config.buffs_disabled[buffId]) {
            buffElem.classList.add("hideOverride");
        }
        buffElem.innerHTML = 
            `<img src='img/buff_icons/${buffs[buffId].icon}.png'/>` +
            "<span class='buff-text'>0</span>" + 
            "<div class='buff-overlay'></div>";
        if(buffs[buffId].ast_only) {
            buffElem.classList.add("buff-ast-only");
        }
        buffRow.appendChild(buffElem);
    }
}

function setJobUI(job) {
    if(job === "AST" || config.force_ast) {
        document.getElementById("buffs").classList.remove("not-ast");
    }
    else {
        document.getElementById("buffs").classList.add("not-ast");
    }
}

function setTimeUI(buffId, time, maxTime, invert) {
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