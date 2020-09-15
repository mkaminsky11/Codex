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
    },
    PLD: {
        buffs: {
            "4c": {
                name: "Fight or Flight",
                time: 25,
                max: 11,
                type: "gcds",
                ids: ["09", "0F", "DD3", "404C", "DD2", "1CD5", "4049"], // fast blade, riot blade, royal authority, atonement, goring blade, total eclipse, prominence
                visual: {type: "BAR", color: "blue"}
            },
            "2d5": {
                name: "Goring Blade",
                max: 21,
                type: "timer",
                visual: {type: "BAR", color: "orange"}
            }
        }
    },
    GNB: {
        buffs: {
            "727": {
                name: "No Mercy",
                time: 20,
                max: 9,
                type: "gcds",
                ids: ["3F0D","3F15","3F09","3F0B","3F11","3F22","3F19","3F12","3F13","3F16","3F23"], // demon slice, demon slaughter, keen edge, brutal shell, solid barrel, burst strike, sonic break, gnashing, savage, wicked, fated
                visual: {type: "BAR", color: "orange"}
            }
        }
    }
};