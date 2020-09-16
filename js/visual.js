var container = document.getElementById("container");
function setJob(job) {
    container.innerHTML = "";
    for(buffId in actions[job].buffs) {
        var row = document.createElement("div");
        row.setAttribute("class","row");
        row.setAttribute("id", buffId);
        row.setAttribute("type", actions[job].buffs[buffId].type);
        if(actions[job].buffs[buffId].hidden) {
            row.classList.add("hide");
        }

        var item = actions[job].buffs[buffId].visual;
        if(item.type === "BAR") {
            row.innerHTML = "<div class='bar'>" + 
                            "<div class='progress-bar progress-bar-" + item.color + " edges-" + config.edges + "'>" +
                            "<span style='width:0%'></span>" +
                            "</div><span class='data-text'>0</span>" +
                            "</div></div>";
        }
        else if(item.type === "ARROW") {
            var h = "<div class='arrow-row arrow-" + item.color + "'>";
            for(var i = 0; i < actions[job].buffs[buffId].max; i++) {
                h = h + "<div class='arrow'></div>";
            }
            h = h + "</div>";
            row.innerHTML = h;
        }
        container.appendChild(row);
    }
}

function setCount(buffId, count) {
    if(buffId in actions[me.job].buffs) {
        var type = actions[me.job].buffs[buffId].visual.type;
        if(type === "BAR") {
            var elem = document.querySelector(".row[id='" + buffId + "']");
            var countString = count.toFixed(0);
            elem.querySelector(".data-text").innerHTML = countString;
            var width = 100 * count / actions[me.job].buffs[buffId].max;
            elem.querySelector(".progress-bar > span").setAttribute("style","width:" + width + "%");
            if(width <= 30) {
                elem.querySelector(".progress-bar > span").classList.add("progress-bar-flash");
            }
            else {
                elem.querySelector(".progress-bar > span").classList.remove("progress-bar-flash");
            }
        }
        else if(type === "ARROW") {
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

function hide(buffId) {
    document.querySelector(".row[id='" + buffId + "']").classList.add("hide");
}
function unHide(buffId) {
    document.querySelector(".row[id='" + buffId + "']").classList.remove("hide");
}