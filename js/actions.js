/*
GNB:

nm (20s 9) -> 1,2,3,ammo1,ammo2,ammo3,aoe1,aoe2,sonic,burst strike,fated circle
*/

var actions = {
    DRK: {
        buffs: {
            "7b4": {
                name: "Delerium",
                time: 10,
                max: 5,
                type: "gcds",
                ids: ["1CE0", "1CDF"], // bloodspiller, quiet
                visual: { type: "BAR", color: "red"}
            },
            "2e6": {
                name: "Blood Weapon",
                time: 10,
                max: 5,
                type: "gcds",
                ids: ["E28", "E21", "E27", "E30", "1CE0", "1CDF", "E25", "4054"], // hard slash, siphon strike, souleater, unmend, unleash, stalwart soul, bloodspill, quiet
                visual: {type: "BAR", color: "blue"}
            }
        }
    },
    WAR: {
        buffs: {
            "499": {
                name: "Inner Release",
                time: 10,
                max: 5,
                type: "gcds",
                ids: ["DDD", "DDE"], // fell cleave, decimate
                visual: {type: "BAR", color: "orange"}
            },
            "5a": {
                name: "Storms Eye",
                max: 60,
                type: "timer",
                visual: {type: "BAR", color: "blue"}
            }
        }
    }
};