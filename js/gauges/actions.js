import {actionIds, buffIds} from '../general/ids.js'
var gaugeConfig = {
    DRK: {
        buffs: {
            [buffIds.Delirium]: {
                name: 'Delirium',
                order: 0,
                time: 10, max: 5,
                type: 'gcds',
                ids: [
                    actionIds.BloodSpiller,
                    actionIds.Quietus
                ],
                visual: { type: 'ARROW', color: 'red'}
            },
            [buffIds.BloodWeapon]: {
                name: 'Blood Weapon', 
                order: 1,
                time: 10, max: 5,
                type: 'gcds',
                ids: [
                    actionIds.HardSlash,
                    actionIds.SiphonStrike,
                    actionIds.Souleater,
                    actionIds.Unmend,
                    actionIds.Unleash,
                    actionIds.StalwartSoul,
                    actionIds.BloodSpiller,
                    actionIds.Quietus
                ],
                visual: {type: 'BAR', color: 'blue', glow: 'dark'}
            }
        },
        alias: {}
    },
    WAR: {
        buffs: {
            [buffIds.InnerRelease]: {
                name: 'Inner Release', 
                order: 0,
                time: 10, max: 5,
                type: 'gcds',
                ids: [
                    actionIds.FellCleave,
                    actionIds.Decimate
                ],
                visual: {type: 'ARROW', color: 'orange'}
            },
            [buffIds.StormsEye]: {
                name: 'Storms Eye',
                order: 1,
                max: 60,
                type: 'timer',
                visual: {type: 'BAR', color: 'red', danger: true}
            }
        },
        alias: {}
    },
    PLD: {
        buffs: {
            [buffIds.Requiescat]: {
                name: 'Requiescat', 
                order: 0,
                time: 12, max: 5,
                type: 'gcds',
                ids: [
                    actionIds.HolySpirit,
                    actionIds.HolyCircle,
                    actionIds.Confiteor
                ],
                visual: {type: 'ARROW', color: 'blue'}
            },
            [buffIds.FightOrFlight]: {
                name: 'Fight or Flight', 
                order: 2,
                time: 25, max: 11,
                type: 'gcds',
                ids: [
                    actionIds.FastBlade,
                    actionIds.RiotBlade,
                    actionIds.RoyalAuthority,
                    actionIds.Atonement,
                    actionIds.GoringBlade,
                    actionIds.TotalEclipse,
                    actionIds.Prominence
                ],
                visual: {type: 'BAR', color: 'red', glow: 'red'}
            },
            [buffIds.GoringBlade]: {
                name: 'Goring Blade',
                order: 1,
                max: 21,
                type: 'timer',
                visual: {type: 'BAR', color: 'orange', danger: true}
            }
        },
        alias: {}
    },
    GNB: {
        buffs: {
            [buffIds.NoMercy]: {
                name: 'No Mercy', 
                order: 0, time: 20, max: 9,
                type: 'gcds',
                ids: [
                    actionIds.DemonSlice,
                    actionIds.DemonSlaughter,
                    actionIds.KeenEdge,
                    actionIds.BrutalShell,
                    actionIds.SolidBarrel,
                    actionIds.BurstStrike,
                    actionIds.SonicBreak,
                    actionIds.GnashingFang,
                    actionIds.SavageClaw,
                    actionIds.WickedTalon,
                    actionIds.FatedCicle
                ],
                visual: {type: 'ARROW', color: 'orange'}
            }
        },
        alias: {}
    },
    SCH: {
        buffs: {
            [buffIds.Biolysis]: {
                name: 'Biolysis', 
                order: 0,
                max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'green', danger: true}
            }
        },
        alias: {
            [buffIds.SchBio]: buffIds.Biolysis,
            [buffIds.SchBio2]: buffIds.Biolysis
        }
    },
    WHM: {
        buffs: {
            [buffIds.Dia]: {
                name: 'Dia', 
                order: 0,
                max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'blue', danger: true}
            }
        },
        alias: {
            [buffIds.Aero]: buffIds.Dia,
            [buffIds.Aero2]: buffIds.Dia
        }
    },
    AST: {
        buffs: {
            [buffIds.Combust3]: {
                name: 'Combust', 
                order: 0,
                max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'blue', danger: true}
            }
        },
        alias: {
            [buffIds.Combust]: buffIds.Combust3,
            [buffIds.Combust2]: buffIds.Combust3
        }
    },
    MNK: {
        buffs: {
            [buffIds.PerfectBalance]: {
                name: 'Perfect Balance', 
                order: 0,
                time: 15, max: 6,
                type: 'gcds',
                ids: [
                    actionIds.Bootshine,
                    actionIds.TrueStrike,
                    actionIds.SnapPunch,
                    actionIds.DragonKick,
                    actionIds.TwinSnakes,
                    actionIds.Demolish,
                    actionIds.ArmOfTheDestroyer,
                    actionIds.FourPointFury,
                    actionIds.RockBreaker
                ],
                visual: {type: 'ARROW', color: 'yellow'}
            },
            [buffIds.RiddleOfFire]: {
                name: 'Riddle of Fire', 
                order: 1, time: 20, max: 9,
                type: 'gcds',
                ids: [
                    actionIds.Bootshine,
                    actionIds.TrueStrike,
                    actionIds.SnapPunch,
                    actionIds.DragonKick,
                    actionIds.TwinSnakes,
                    actionIds.Demolish,
                    actionIds.ArmOfTheDestroyer,
                    actionIds.FourPointFury,
                    actionIds.RockBreaker
                ],
                visual: {type: 'BAR', color: 'red', glow: 'red'}
            }
        },
        alias: {}
    },
    DRG: {
        buffs: {
            [buffIds.LanceCharge]: {
                name: 'Lance Charge', 
                order: 0,
                time: 20, max: 9,
                type: 'gcds',
                ids: [
                    actionIds.TrueThrust,
                    actionIds.Disembowel,
                    actionIds.ChaosThrust,
                    actionIds.WheelingThrust,
                    actionIds.VorpalThrust,
                    actionIds.FullThrust,
                    actionIds.FangAndClaw,
                    actionIds.RaidenThrust,
                    actionIds.DoomSpike,
                    actionIds.SonicThrust,
                    actionIds.CoerthanTorment,
                    actionIds.PiercingTalon
                ],
                visual: {type: 'ARROW', color: 'red'}
            },
            [buffIds.RightEye]: {
                name: 'Right Eye', 
                order: 2,
                time: 20, max: 9,
                type: 'gcds',
                ids: [
                    actionIds.TrueThrust,
                    actionIds.Disembowel,
                    actionIds.ChaosThrust,
                    actionIds.WheelingThrust,
                    actionIds.VorpalThrust,
                    actionIds.FullThrust,
                    actionIds.FangAndClaw,
                    actionIds.RaidenThrust,
                    actionIds.DoomSpike,
                    actionIds.SonicThrust,
                    actionIds.CoerthanTorment,
                    actionIds.PiercingTalon
                ],
                visual: {type: 'BAR', color: 'orange', glow: 'orange'}
            }
        },
        alias: {
            [buffIds.RightEye2]: buffIds.RightEye
        }
    },
    NIN: {
        buffs: {
            [buffIds.TrickAttack]: {
                name: 'Trick Attack', 
                order: 0,
                time: 15, max: 7,
                type: 'gcds',
                ids: [
                    actionIds.SpinningEdge,
                    actionIds.GustSlash,
                    actionIds.AeolionEdge,
                    actionIds.ArmorCrush,
                    actionIds.ShadowFang,
                    actionIds.ThrowingDagger,
                    actionIds.DeathBlossom,
                    actionIds.Hakke,
                    actionIds.Fuma,
                    actionIds.Katon,
                    actionIds.Raiton,
                    actionIds.Hyothon,
                    actionIds.Huton,
                    actionIds.Doton,
                    actionIds.Suiton,
                    actionIds.Goka,
                    actionIds.Hyosho
                ],
                visual: {type: 'ARROW', color: 'yellow'}
            },
        },
        alias: {}
    },
    SAM: {
        buffs: {
            [buffIds.Jinpu]: {
                name: 'Jinpu', 
                order: 0, max: 40,
                type: 'timer',
                visual: {type: 'BAR', color: 'blue', danger: true}
            },
            [buffIds.Shifu]: {
                name: 'Shifu', 
                order: 1, max: 40,
                type: 'timer',
                visual: {type: 'BAR', color: 'red', danger: true}
            },
            [buffIds.Higanbana]: {
                name: 'Higanbana', 
                order: 2, max: 60,
                type: 'timer',
                visual: {type: 'BAR', color: 'orange', danger: true}
            }
        },
        alias: {}
    },
    BRD: {
        buffs: {
            [buffIds.CausticBite]: {
                name: 'Caustic Bite', 
                order: 0,
                max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'red', danger: true}
            },
            [buffIds.Stormbite]: {
                name: 'Stormbite', 
                order: 1,
                max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'blue', danger: true}
            },
            [buffIds.RagingStrikes]: {
                name: 'Raging Strikes', 
                order: 2,
                time: 20, max: 9, // +2 for barrage?
                type: 'gcds',
                ids: [
                    actionIds.BurstShot,
                    actionIds.RefulgentArrow,
                    actionIds.CausticBite,
                    actionIds.Stormbite,
                    actionIds.IronJaws,
                    actionIds.QuickNock
                ],
                visual: {type: 'ARROW', color: 'orange'}
            }
        },
        alias: {
            [buffIds.VenomousBite]: buffIds.CausticBite,
            [buffIds.Windbite]: buffIds.Stormbite
        }
    },
    MCH: {
        buffs: {
            [actionIds.Hypercharge]: {
                name: 'Hypercharge', 
                order: 0,
                time: 9, max: 5,
                combo: true,
                type: 'gcds',
                ids: [
                    actionIds.HeatBlast,
                    actionIds.AutoCrossbow
                ],
                visual: {type: 'ARROW', color: 'orange'}
            },
            [buffIds.Wildfire]: {
                name: 'Wildfire', 
                order: 1,
                time: 10, max: 6,
                type: 'gcds',
                ids: [
                    actionIds.HeatedSplitShot,
                    actionIds.HeatedSlugShot,
                    actionIds.HeatedCleanShot,
                    actionIds.AirAnchor,
                    actionIds.Drill,
                    actionIds.BioBlaster,
                    actionIds.HeatBlast,
                    actionIds.AutoCrossbow,
                    actionIds.HotShot,
                    actionIds.CleanShot
                ],
                visual: {type: 'BAR', color: 'red', glow: 'red'}
            }
        },
        alias: {}
    },
    DNC: {
        buffs: {
            [buffIds.Devilment]: {
                name: 'Devilment', 
                order: 0,
                time: 20, max: 10,
                type: 'gcds',
                ids: [
                    actionIds.Cascade,
                    actionIds.Fountain,
                    actionIds.Windmill,
                    actionIds.Bladeshower,
                    actionIds.ReverseCascade,
                    actionIds.Fountainfall,
                    actionIds.ReverseWindmill,
                    actionIds.Bloodshower,
                    actionIds.StandardStep,
                    actionIds.DoubleStandardFinish,
                    actionIds.TechnicalStep,
                    actionIds.QuadTechnicalFinish,
                    actionIds.Emboite,
                    actionIds.Entrechat,
                    actionIds.Jete,
                    actionIds.Pirouette,
                    actionIds.SaberDance,
                ],
                visual: {type: 'BAR', color: 'red', glow: 'red'}
            },
        },
        alias: {}
    },
    BLM: {
        buffs: {
            [buffIds.Thunder3]: {
                name: 'Thunder 3', 
                order: 0,
                max: 24,
                type: 'timer',
                visual: {type: 'BAR', color: 'blue', danger: true},
                hides: [buffIds.Thunder4]
            },
            [buffIds.Thunder4]: {
                name: 'Thunder 4', 
                order: 1,
                max: 18,
                type: 'timer',
                visual: {type: 'BAR', color: 'purple', danger: true},
                hides: [buffIds.Thunder3],
                hidden: true
            }
        },
        alias: {
            [buffIds.Thunder]: buffIds.Thunder3,
            [buffIds.Thunder2]: buffIds.Thunder4
        }
    },
    SMN: {
        buffs: {
            [actionIds.SummonBahamut]: {
                name: 'Bahamut', 
                order: 0, time: 21, max: 8,
                combo: true,
                type: 'gcds',
                ids: [actionIds.Wyrmwave],
                visual: {type: 'ARROW', color: 'blue'},
                hides: actionIds.FirebirdTrance
            },
            [actionIds.FirebirdTrance]: {
                name: 'Pheonix', 
                order: 1, time: 21, max: 8,
                combo: true,
                type: 'gcds',
                ids: [actionIds.ScarletFlame],
                visual: {type: 'ARROW', color: 'orange'},
                hides: actionIds.SummonBahamut,
                hidden: true
            },
            [buffIds.SmnBio3]: {
                name: 'Bio', 
                order: 2, max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'green', danger: true},
            },
            [buffIds.Miasma]: {
                name: 'Miasma', 
                order: 3, max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'blue', danger: true},
            }
        },
        alias: {
            [buffIds.SmnBio]: [buffIds.SmnBio3],
            [buffIds.SmnBio2]: [buffIds.SmnBio3]
        }
    },
    RDM: {
        buffs: {
            [buffIds.Manafication]: {
                name: 'Manafication', 
                order: 0,
                time: 10, max: 5,
                type: 'gcds',
                noRefresh: true,
                ids: [
                    actionIds.Jolt,
                    actionIds.Verareo,
                    actionIds.Verthunder,
                    actionIds.Verfire,
                    actionIds.Verstone,
                    actionIds.Vercure,
                    actionIds.Verareo2,
                    actionIds.Verthunder2,
                    actionIds.Impact,
                    actionIds.ERiposte,
                    actionIds.ERedoublement,
                    actionIds.EZ,
                    actionIds.EMoul,
                    actionIds.EReprise,
                    actionIds.Verfire,
                    actionIds.Verholy,
                    actionIds.Scorch
                ],
                visual: {type: 'ARROW', color: 'blue'}
            }
        },
        alias: {}
    },
    BLU: {
        buffs: {
            [buffIds.SongOfTorment]: {
                name: 'Song of Torment', 
                order: 0,
                max: 30,
                type: 'timer',
                visual: {type: 'BAR', color: 'red', danger: true}
            }
        },
        alias: {}
    },
};

export {gaugeConfig}