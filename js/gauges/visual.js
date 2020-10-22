var container = document.getElementById("container");
function setJobUI(job) {
    container.innerHTML = "";
    var buffIds = []; // SORT THE BARS
    user.iterateBuffs(function(buff) {
        buffIds.push({
            id: buff.id,
            order: (config.order[buff.id] ? config.order[buff.id] : buff.data.order)
        })
    });
    buffIds.sort((a, b) => (a.order > b.order) ? 1 : -1)
    for(var b = 0; b < buffIds.length; b++) {
        var buff = user.getBuff(buffIds[b].id);
        var row = document.createElement("div");
        var silver = (config.edges === "silver") ? "<img class='silver-edge' src='img/general/silver_gauge.png'/>" : "";
        var visual = buff.data.visual;
        visual.color = config.color[buff.id] ? config.color[buff.id] : visual.color;
        visual.glow = config.glows[buff.id] ? config.glows[buff.id] : visual.glow;
        visual.type = config.gaugeType[buff.id] ? config.gaugeType[buff.id] : visual.type;
        
        row.setAttribute("class","row");
        row.setAttribute("id", buff.id);
        row.setAttribute("type", buff.type);
        if(buff.data.hidden) {
            row.classList.add("hide");
        }
        if(config.disabled[buff.id]) {
            row.classList.add("hideOverride");
        }
        if(visual.type === "BAR") {
            var glow = (config.glow && visual.glow && visual.glow !== "noGlow") ? `<div class='glow glow-${visual.glow}'><div><span class='tex'></span></div></div>` : "";
            row.innerHTML = `<div class='bar'>` + 
                            glow +
                            silver + 
                            `<div class='progress-bar progress-bar-${visual.color} edges-${config.edges}'>` +
                            "<span style='width:0%'></span>" +
                            "</div>" + 
                            "<div class='data-row'>" + 
                            "<span class='data-text'>0</span><span class='flex-1'></span>" +
                            "</div></div></div>";
        }
        else if(visual.type === "ARROW") {
            var size = visual.size ? ("arrow-" + visual.size) : "";
            var h = `<div class='arrow-row arrow-${visual.color}'>`;
            for(var i = 0; i < buff.max; i++) {
                h = h + `<div class='arrow ${size}'></div>`;
            }
            h = h + "</div>";
            row.innerHTML = h;
        }
        else if(visual.type === "SQUARE") {
            row.innerHTML = `<div class='square dash-hidden recast-hidden'><img src='img/general/dash.gif' class='dash'>` + 
                            `<img src="img/general/recast/frame.png" class="frame">` + `<img src="img/general/recast/recast_01.png" class="recast">` +
                            `<img src='img/buff_icons/${visual.icon}.png' class='icon'><span class='recast-time'></span></div>`;
        }
        container.appendChild(row);
    }
}

function setCountUI(buffId, count) {
    if(user.hasBuff(buffId)) {
        var buff = user.getBuff(buffId);
        var visual = buff.data.visual;
        visual.type = config.gaugeType[buff.id] ? config.gaugeType[buff.id] : visual.type;
        
        if(visual.type === "BAR") {
            var elem = document.querySelector(".row[id='" + buffId + "']");
            var countString = count.toFixed(0); // NO DECIMAL PLACES
            var width = 100 * count / buff.max;

            elem.querySelector(".data-text").innerHTML = countString;
            elem.querySelector(".progress-bar > span").setAttribute("style","width:" + width + "%");
            if(width <= 30 && visual.danger && config.danger) { // FLASH IF BAR IS LOW
                elem.querySelector(".progress-bar > span").classList.add("progress-bar-flash");
                elem.querySelector(".data-text").classList.add("data-text-flash");
            }
            else {
                elem.querySelector(".progress-bar > span").classList.remove("progress-bar-flash");
                elem.querySelector(".data-text").classList.remove("data-text-flash");
            }
        }
        else if(visual.type === "ARROW") {
            document.querySelectorAll(".row[id='" + buffId + "'] .arrow").forEach(function(item, idx) {
                if(idx < count) {
                    item.classList.add("arrow-active");
                }
                else {
                    item.classList.remove("arrow-active");
                }
            });
        }
        else if(visual.type === "SQUARE") {
            var elem = document.querySelector(".row[id='" + buffId + "'] .square");
            var countString = count.toFixed(0);
            var percent = 100 * count / buff.max;
            // set recast text
            elem.querySelector(".recast-time").innerHTML = countString;
            // set the recast image
            var mapped = 1 + 80 * (1 - count / buff.max)
            var mappedNumber = Math.round(mapped).toFixed(0).padStart(2,"0");
            elem.querySelector(".recast").setAttribute("src","img/general/recast/recast_" + mappedNumber + ".png");
            // if 0, add dash, remove stuff
            console.log(count);
            if(count == 0) {
                elem.classList.add("recast-hidden");
                elem.classList.remove("dash-hidden");
            }
            else {
                elem.classList.remove("recast-hidden");
                elem.classList.add("dash-hidden");
            }

        }
    }
}

function addGlow(buffId) {
    var g = document.querySelector(".row[id='" + buffId + "'] .glow");
    if(g) {
        g.classList.add("glow-active");
    }
}
function removeGlow(buffId) {
    var g = document.querySelector(".row[id='" + buffId + "'] .glow");
    if(g) {
        g.classList.remove("glow-active");
    }
}

function clearDanger() {
    document.querySelectorAll(".data-text").forEach(function(elem) {
        elem.classList.remove("data-text-flash");
    });
}

function hide(buffId) {
    document.querySelector(".row[id='" + buffId + "']").classList.add("hide");
}
function unHide(buffId) {
    document.querySelector(".row[id='" + buffId + "']").classList.remove("hide");
}