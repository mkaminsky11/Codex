var actions = {
    //==================
    // TANKS
    //==================
    DRK: {
        buffs: {
            "7b4": {
                name: "Delerium",
                time: 10,
                max: 5,
                type: "gcds",
                ids: [
                    "1CE0", "1CDF"      // bloodspiller, quiet
                ],
                visual: { type: "ARROW", color: "red"}
            },
            "2e6": {
                name: "Blood Weapon",
                time: 10,
                max: 5,
                type: "gcds",
                ids: [
                    "E28", "E21", "E27",    // hard slash, siphon strike, souleater
                    "E30",                  // unmend
                    "1CE0", "1CDF",         // unleash, stalwart soul
                    "E25", "4054"           // bloodspill, quiet
                ],
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
                ids: [
                    "DDD", "DDE"    // fell cleave, decimate
                ],
                visual: {type: "ARROW", color: "orange"}
            },
            "5a": {
                name: "Storms Eye",
                max: 60,
                type: "timer",
                visual: {type: "BAR", color: "red"}
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
                ids: [
                    "09", "0F", "DD3", "404C", "DD2",   // fast blade, riot blade, royal authority, atonement, goring blade
                    "1CD5", "4049"                      // total eclipse, prominence
                ],
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
                ids: [
                    "3F0D","3F15",                      // demon slice, demon slaughter
                    "3F09","3F0B","3F11","3F22","3F19", // keen edge, brutal shell, solid barrel, burst strike, sonic break
                    "3F12","3F13","3F16",               // gnashing, savage, wicked
                    "3F23"                              // fated
                ],
                visual: {type: "BAR", color: "orange"}
            }
        }
    },
    //================
    // HEALERS
    //================
    SCH: {
        buffs: {
            "767": {
                name: "Biolysis",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "green"}
            }
        }
    },
    WHM: {
        buffs: {
            "74f": {
                name: "Dia",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "blue"}
            }
        }
    },
    AST: {
        buffs: {
            "759": {
                name: "Combust",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "blue"}
            }
        }
    },
    //===============
    // MELEE DPS
    //==============
    MNK: {
        buffs: {
            "6e": {
                name: "Perfect Balance",
                time: 10,
                max: 5,
                type: "gcds",
                ids: [
                    "35","36","38","4A","3D","42",   // bootshine, true strike, snap punch, dragon kick, twin snakes, demolish
                    "3E","4059","46"                 // arm, 4-point, rockbreaker
                ],
                visual: {type: "ARROW", color: "yellow"}
            },
            "4a1": {
                name: "Brotherhood",
                time: 15,
                max: 7,
                type: "gcds",
                ids: [
                    "35","36","38","4A","3D","42",  // bootshine, true strike, snap punch, dragon kick, twin snakes, demolish
                    "3E","4059","46",               // arm, 4-point, rockbreaker
                    "405C","DD7"                    // 6-sided, tornado
                ],
                visual: {type: "BAR", color: "orange"}
            },
            "49d": {
                name: "Riddle of Fire",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "35","36","38","4A","3D","42",  // bootshine, true strike, snap punch, dragon kick, twin snakes, demolish
                    "3E","4059","46",               // arm, 4-point, rockbreaker
                    "405C","DD7"                    // 6-sided, tornado
                ],
                visual: {type: "BAR", color: "red"}
            }
        }
    },
    DRG: { // Geirskogul  DE3  Nastrond  1CE8  Stardiver  4060
        buffs: {
            "748": {
                name: "Lance Charge",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "4B","57","58","DE4","4E","54","DE2","405F",    // true thrust, disembowel, chaos thrust, wheeling thrust, vorpal thrust, full thrust, fang and claw, raiden thrust
                    "56","1CE5","405D",                             // doom spike, sonic thrust, coerthan torment
                    "5A"                                            // piercing talon
                ],
                visual: {type: "BAR", color: "red"}
            },
            "312": {
                name: "Battle Litany",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "4B","57","58","DE4","4E","54","DE2","405F",    // true thrust, disembowel, chaos thrust, wheeling thrust, vorpal thrust, full thrust, fang and claw, raiden thrust
                    "56","1CE5","405D",                             // doom spike, sonic thrust, coerthan torment
                    "5A"                                            // piercing talon
                ],
                visual: {type: "BAR", color: "blue"}
            },
            "776": {
                name: "Right Eye",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "4B","57","58","DE4","4E","54","DE2","405F",    // true thrust, disembowel, chaos thrust, wheeling thrust, vorpal thrust, full thrust, fang and claw, raiden thrust
                    "56","1CE5","405D",                             // doom spike, sonic thrust, coerthan torment
                    "5A"                                            // piercing talon
                ],
                visual: {type: "BAR", color: "orange"}
            }
        }
    },
    NIN: {
        buffs: {
            "27e": {
                name: "Trick Attack",
                time: 15,
                max: 7,
                type: "gcds",
                ids: [
                    "8C0","8C2","8CF","DEB","8D1",  // spinning edge, gust slash, aeolion edge, armor crush, shadow fang
                    "8C7",  // throwing dagger
                    "8CE","4068",   // death blossom, hakke
                    "8D9","8DA","8DB","8DC","8DD","8DE","8DF","406B","406C"  // fuma, katon, raiton, hyoton, huton, doton, suiton, goka, hyosho
                ],
                visual: {type: "BAR", color: "yellow"}
            },
        }
    },
    SAM: {
        buffs: {
            "512": {
                name: "Jinpu",
                max: 40,
                type: "timer",
                visual: {type: "BAR", color: "blue"}
            },
            "513": {
                name: "Shifu",
                max: 40,
                type: "timer",
                visual: {type: "BAR", color: "red"}
            },
            "4cc": {
                name: "Higanbana",
                max: 60,
                type: "timer",
                visual: {type: "BAR", color: "orange"}
            }
        }
    },
    //==================
    // PHYSICAL RANGED
    //=================
    BRD: {
        buffs: {
            "4b0": {
                name: "Caustic Bite",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "red"}
            },
            "4b1": {
                name: "Stormbite",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "blue"}
            },
            "7d": {
                name: "Raging Strikes",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "406F", "1CF1",         // burst shot, refulgent
                    "1CEE", "1CEF", "DE8",  // cuastic, storm, iron jaws
                    "6A"                    // quick nock
                ],
                visual: {type: "BAR", color: "orange"}
            }
        }
    },
    MCH: {
        buffs: {
            "4339": {
                name: "Hypercharge",
                time: 9,                   // not the actual time, but need some wiggle room
                max: 5,
                combo: true,                // this one is different, for some reason
                type: "gcds",
                ids: [
                    "1CF2", "4071"          // heat blast, auto crossbow
                ],
                visual: {type: "ARROW", color: "orange"}
            },
            "79a": {
                name: "Wildfire",
                time: 10,
                max: 6,
                type: "gcds",
                ids: [
                    "1CF3","1CF4","1CF5",   // heated split, heated slug, heated clean
                    "4074","4072","4073",   // air anchor, drill, bio-blaster
                    "1CF2", "4071"          // heat blast, auto crossbow
                ],
                visual: {type: "BAR", color: "red"}
            }
        }
    },
    DNC: {
        buffs: {
            "721": {
                name: "Devilment",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "3E75", "3E76", "3E79", "3E7A", // cascade, fountain, windmill, bladeshower
                    "3E77", "3E78", "3E7B" ,"3E7C", //  r. cascade, fountainfall, r. windmill, bloodshower
                    "3E87", "3E88", "3E89", // fan dance, fan dance 2, fan dance 3
                    "3E81", "3E82", "3E80", "3E7F", // red, blue, green, yellow
                    "3E7D", "3F40", "3E7E", "3F44", // standard step, double standard finish, technical step, quadruple technical finish
                ],
                visual: {type: "BAR", color: "red"}
            },
            "71e": {
                name: "Technical Finish",
                time: 20,
                max: 9,
                type: "gcds",
                ids: [
                    "3E75", "3E76", "3E79", "3E7A", // cascade, fountain, windmill, bladeshower
                    "3E77", "3E78", "3E7B" ,"3E7C", //  r. cascade, fountainfall, r. windmill, bloodshower
                    "3E87", "3E88", "3E89", // fan dance, fan dance 2, fan dance 3
                    "3E81", "3E82", "3E80", "3E7F", // red, blue, green, yellow
                    "3E7D", "3F40", "3E7E", "3F44", // standard step, double standard finish, technical step, quadruple technical finish
                ],
                visual: {type: "BAR", color: "blue"}
            },
        }
    },
    //================
    // MAGICAL DPS
    //================
    BLM: {
        buffs: {
            "a3": {
                name: "Thunder 3",
                max: 24,
                type: "timer",
                visual: {type: "BAR", color: "blue"},
                hides: "4ba"
            },
            "4ba": {
                name: "Thunder 4",
                max: 18,
                type: "timer",
                visual: {type: "BAR", color: "purple"},
                hides: "a3",
                hidden: true
            }
        }
    },
    SMN: {
        buffs: {
            "1D03": {
                name: "Bahamut",
                time: 21,
                max: 8,
                combo: true,
                type: "gcds",
                ids: ["1D04"],  // wrymwave
                visual: {type: "BAR", color: "blue"},
                hides: "40A5"
            },
            "40A5": {
                name: "Pheonix",
                time: 21,
                max: 8,
                combo: true,
                type: "gcds",
                ids: ["4087"],
                visual: {type: "BAR", color: "orange"},
                hides: "1D03",
                hidden: true
            },
            "4be": {
                name: "Bio",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "green"},
            },
            "4bf": {
                name: "Miasma",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "blue"},
            }
        }
    },
    RDM: {
        buffs: {
            "4d7": {
                name: "Embolden",
                time: 20,
                max: 9,
                type: "gcds",
                noRefresh: true,
                ids: [
                    "1D64", "1D53", "1D51", "1D56", "1D57", "1D5A", // jolt, verareo, verthunder, verfire, verstone, vercure
                    "408D", "408C", "408E", // verareo 2, verthunder 2, impact
                    "1D50","1D58","1D5C","1D59", // riposte, z, redouble, moul
                    "1D67","1D68","1D69","1D6A", // e. riposte, e. z, e. redouble, e. moul
                    "1D65", "1D66", "4092", // verflare, verholy, scorch
                    "4091", "4090" // reprise, e. reprise
                ],
                visual: {type: "BAR", color: "red"}
            }
        }
    },
    //====================
    // BLU
    //====================
    BLU: {
        buffs: {
            "6b2": {
                name: "Song of Torment",
                max: 30,
                type: "timer",
                visual: {type: "BAR", color: "red"}
            }
        }
    },
};