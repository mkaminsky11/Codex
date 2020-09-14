/*
GNB:

nm (20s 9) -> 1,2,3,ammo1,ammo2,ammo3,aoe1,aoe2,sonic,burst strike,fated circle

WAR:

ir (10s 5) -> fell cleave, decimate, inner chaose, inner chaos aoe

nascent flash (6s 3)
*/

var actions = {
    //==================
    //  DRK
    //==================
    DRK: {
        buffs: {
            "7b4": {
                //=================
                // DELERIUM
                //================
                name: "Delirium",
                time: 10,
                max: 5,
                ids: ["1CE0", "1CDF"],
                visual: {
                    type: "BAR",
                    color: "red"
                }
            },
            "2e6": {
                //=================
                // BLOOD WEAPON
                //=================
                name: "Blood Weapon",
                time: 10,
                max: 5,
                ids: ["E28", "E21", "E27", "E30", "1CE0", "1CDF", "E25", "4054"],
                visual: {
                    type: "BAR",
                    color: "blue"
                }
            }
        }
    }
};