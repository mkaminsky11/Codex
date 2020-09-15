document.querySelector("#settings").addEventListener("click", function(e){
    window.open(
        'config.html',
        'Settings',
        `width=800,height=600`
      )
});

// GET
function getSettings() {
    var s = localStorage.getItem("CodexSettings");
    if(s != null) {
        s = JSON.parse(s);
        for(key in s) { // copy over configs
            config[key] = s[key];
        }
    }
}

// RELOAD WHEN SETTINGS ARE CHANGED
window.addEventListener("storage", function(e) {
    console.log(e);
    if(e.key != "CodexSettings") { return; }
    location.reload();
});

getSettings();