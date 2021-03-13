function setJobUI(user, config) {
    var container = document.getElementById('container');
    container.innerHTML = "";
    var buffIds = []; // SORT THE BARS
    user.allBuffs(function(buff) {
        buffIds.push({
            id: buff.id,
            order: (config.order[buff.id] ? config.order[buff.id] : buff.data.order)
        })
    });
    buffIds.sort((a, b) => (a.order > b.order) ? 1 : -1)
    for(var b = 0; b < buffIds.length; b++) {
        var buff = user.getBuff(buffIds[b].id);
        var row = document.createElement('div');
        var visual = buff.data.visual;

        var silver = (config.edges === "silver") ? "<img class='silver-edge' src='img/general/silver_gauge.png'/>" : '';
        var smallIcon = (config.small_icons) ? `<img class='small-icon' src='img/buff_icons_small/${user.getIconName(buff)}.png'/>` : '';

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
        // ===== VISUAL TYPES ============
        if(visual.type === "BAR") {
            var glow = (config.glow && visual.glow && visual.glow !== "noGlow") ? `
            <div class='glow glow-${visual.glow}'>
                <div>
                    <span class='tex'></span>
                </div>
            </div>
            ` : "";
            row.innerHTML = `
                ${smallIcon}
                <div class='bar'>
                    ${glow} ${silver}
                    <div class='progress-bar progress-bar-${visual.color} edges-${config.edges}'>
                        <span style='width:0%'></span>
                    </div>
                    <div class='data-row'>
                        <span class='data-text'>0</span>
                        <span class='flex-1'></span>
                    </div>
                </div>
                </div>
                `;
        }
        else if(visual.type === "ARROW") {
            /*var totalHTML = `
                ${smallIcon}
                <div class='arrow-row arrow-${visual.color}'>`;

            for(var i = 0; i < buff.max; i++) {
                totalHTML += `<div class='arrow ${size}'></div>`;
            }
            totalHTML += "</div>";
            row.innerHTML = totalHTML;*/

            row.innerHTML = `
                ${smallIcon}
                <div class='arrow-row arrow-${visual.color}'>
                    ${createArrow(buff.data.max, visual.color)}
                </div>
                `;
        }
        else if(visual.type === "SQUARE") {
            row.innerHTML = `
                <div class='square dash-hidden recast-hidden'>
                    <img src='img/general/dash.gif' class='dash'>
                    <img src="img/general/recast/frame.png" class="frame">
                    <img src="img/general/recast/recast_01.png" class="recast">
                    <img src='img/buff_icons/${user.getIconName(buff)}.png' class='icon'>
                    <span class='recast-time'></span>
                </div>
                `;
        }
        container.appendChild(row);
    }
}

var arrowGradients = {
    'red': ['#ff1c1c', '#ff6262'],
    'blue': ['#4b51ff', '#9d97ff'],
    'orange': ['#ffa64b', '#ffd197'],
    'green': ['#baff4b', '#c4ff97'],
    'yellow': ['#fcff4b', '#fffc97'],
    'purple': ['#774bff', '#d297ff'],
}
function createArrow(num, color){
    var body = '';
    var slant = 10;
    var offset = 5;
    var targetWidth = 150;
    var targetHeight = 30;
    var strokeWidth = 1;
    var padLeft = 5;
    // targetWidth = (width + offset) * num + slant
    var height = targetHeight - 2 * strokeWidth;
    var width = (targetWidth - slant - 2 * strokeWidth) / num - offset;

    var grad = `
    <defs>
        <linearGradient id="gradient-${color}">
            <stop offset="5%" stop-color="${arrowGradients[color][0]}" />
            <stop offset="95%" stop-color="${arrowGradients[color][1]}" />
        </linearGradient>
    </defs>
    `;

    for(var i = 0; i < num; i++){
        var startX = i * (width + offset) + strokeWidth + padLeft;
        var startY = strokeWidth;
        body += `
            <path class="arrow" d="
                M ${startX},${startY}
                l ${width},0
                l ${slant},${height/2}
                l -${slant},${height/2}
                l -${width},0
                l ${slant},-${height/2}
                l -${slant},-${height/2}
                z
            " fill="#40454c" stroke="black" stroke-width="${strokeWidth}"/>`;
    }

    return `
        <svg width="${targetWidth}" height="${targetHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">
            ${grad}
            ${body}
        </svg>`;
}

function setGaugeValue(buffId, count, user, config) {
    if(user.usesBuff(buffId)) {
        var buff = user.getBuff(buffId);
        var visual = buff.data.visual;
        visual.type = config.gaugeType[buff.id] ? config.gaugeType[buff.id] : visual.type;
        
        if(visual.type === "BAR") {
            var elem = document.querySelector(`.row[id="${buffId}"]`);
            var countString = count.toFixed(0); // NO DECIMAL PLACES
            var width = 100 * count / buff.max;

            elem.querySelector(".data-text").innerHTML = countString;
            elem.querySelector(".progress-bar > span").setAttribute('style',`width: ${width}%`);
            if(width <= 30 && visual.danger && config.danger) { // FLASH IF BAR IS LOW, ADD ON THE NEXT SECOND
                var delay = 1000 - ((new Date()).getTime() % 1000);
                window.setTimeout(function(){
                    elem.querySelector(".progress-bar > span").classList.add("progress-bar-flash");
                    elem.querySelector(".data-text").classList.add("data-text-flash");
                }, delay);
            }
            else {
                elem.querySelector(".progress-bar > span").classList.remove("progress-bar-flash");
                elem.querySelector(".data-text").classList.remove("data-text-flash");
            }
        }
        else if(visual.type === "ARROW") {
            document.querySelectorAll(`.row[id="${buffId}"] .arrow`).forEach(function(item, idx) {
                if(idx < count) {
                    item.classList.add("arrow-active");
                }
                else {
                    item.classList.remove("arrow-active");
                }
            });
        }
        else if(visual.type === "SQUARE") {
            var elem = document.querySelector(`.row[id="${buffId}"] .square`);
            var countString = count.toFixed(0);
            var percent = 100 * count / buff.max;
            // set recast text
            elem.querySelector(".recast-time").innerHTML = countString;
            // set the recast image
            var mapped = 1 + 80 * (1 - count / buff.max)
            var mappedNumber = Math.round(mapped).toFixed(0).padStart(2,"0");
            elem.querySelector(".recast").setAttribute("src",`img/general/recast/recast_${mappedNumber}.png`);
            // if 0, add dash, remove stuff
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
    var g = document.querySelector(`.row[id="${buffId}"] .glow`);
    if(g) {
        g.classList.add("glow-active");
    }
}
function removeGlow(buffId) {
    var g = document.querySelector(`.row[id="${buffId}"] .glow`);
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
    document.querySelector(`.row[id="${buffId}"]`).classList.add("hide");
}
function unHide(buffId) {
    document.querySelector(`.row[id="${buffId}"]`).classList.remove("hide");
}

export {setJobUI, setGaugeValue, addGlow, removeGlow, clearDanger, hide, unHide}