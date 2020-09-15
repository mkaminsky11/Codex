/*
pie

| | | | horizontal swords

sword filling up

sword with bar

texture filling up vertically
*/

var container = document.getElementById("container");
function setJob(job) {
    container.innerHTML = "";
    for(buffId in actions[job].buffs) {
        var row = document.createElement("div");
        row.setAttribute("class","row");
        row.setAttribute("id", buffId);
        row.setAttribute("type", actions[job].buffs[buffId].type);

        var item = actions[job].buffs[buffId].visual;
        if(item.type === "BAR") {
            row.innerHTML = "<div class='bar'><div class='progress-bar progress-bar-" + item.color + "'>" +
                            "<span style='width:0%'></span>" +
                            "</div><span class='data-text'>0</span>" +
                            "</div></div>";
        }
        container.appendChild(row);
    }
}

function setCount(buffId, count) {
    if(buffId in actions[me.job].buffs) {
        if(actions[me.job].buffs[buffId].visual.type === "BAR") {
            var elem = document.querySelector(".row[id='" + buffId + "']");
            var countString = count.toString();
            if(actions[me.job].buffs[buffId].type === "timer") {
                countString = count.toFixed(1);
            }
            elem.querySelector(".data-text").innerHTML = countString;
            var width = 100 * count / actions[me.job].buffs[buffId].max;
            console.log(count);
            console.log(width);
            elem.querySelector(".progress-bar > span").setAttribute("style","width:" + width + "%");
        }
    }
}