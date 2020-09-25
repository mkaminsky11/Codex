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
            row.innerHTML = "<div class='bar'>" + 
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
        container.appendChild(row);
    }
}

function setCountUI(buffId, count) {
    if(user.hasBuff(buffId)) {
        var buff = user.getBuff(buffId);
        var visual = buff.data.visual;
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