import {actionIds, buffIds} from '../general/ids.js'

var buffConfig = {
    DRK: {
        [buffIds.Delirium]: {
            name: "Delirium",
            duration: 10,
            cd: 90,
            color: "red",
            self: false, target: false, party: true,
        },
        [actionIds.LivingShadow]: {
            name: "Living Shadow",
            duration: 24,
            cd: 120,
            color: "purple",
            self: false, target: false, party: true,
        }
    },
    WAR: {
        [buffIds.InnerRelease]: {
            name: "Inner Release",
            duration: 10,
            cd: 90,
            color: "orange",
            self: false, target: false, party: true,
        },
    },
    PLD: {},
    GNB: {},
    SCH: {
        [buffIds.Chain]: {
            name: "Chain Stratagem",
            duration: 15,
            cd: 120,
            color: "blue",
            self: false, target: true, party: false,
        },
    },
    WHM: {},
    AST: {
        [buffIds.Balance]: {
            name: "The Balance",
            duration: 15,
            noCd: true,
            color: "orange",
            self: true, target: false, party: false,
        },
        [buffIds.Bole]: {
            name: "The Bole",
            duration: 15,
            noCd: true,
            color: "green",
            self: true, target: false, party: false,
        },
        [buffIds.Spear]: {
            name: "The Spear",
            duration: 15,
            noCd: true,
            color: "blue",
            self: true, target: false, party: false,
        },
        [buffIds.Spire]: {
            name: "The Spire",
            duration: 15,
            noCd: true,
            color: "yellow",
            self: true, target: false, party: false,
        },
        [buffIds.Arrow]: {
            name: "The Arrow",
            duration: 15,
            noCd: true,
            color: "blue",
            self: true, target: false, party: false,
        },
        [buffIds.Ewer]: {
            name: "The Ewer",
            duration: 15,
            noCd: true,
            color: "blue",
            self: true, target: false, party: false,
        },
        [buffIds.LadyOfCrowns]: {
            name: "Lady Of Crowns",
            duration: 15,
            noCd: true,
            color: "purple",
            self: true, target: false, party: false,
        },
        [buffIds.LordOfCrowns]: {
            name: "Lord Of Crowns",
            duration: 15,
            noCd: true,
            color: "red",
            self: true, target: false, party: false,
        },
        [buffIds.Divination]: {
            name: "Divination",
            duration: 15,
            cd: 120,
            color: "yellow",
            self: true, target: false, party: false,
        },
    },
    MNK: {
        [buffIds.Brotherhood]: {
            name: "Brotherhood",
            duration: 15,
            cd: 90,
            color: "orange",
            self: true, target: false, party: false,
        },
        [buffIds.RiddleOfFire]: {
            name: "Riddle of Fire",
            duration: 20,
            cd: 90,
            color: "red",
            self: false, target: false, party: true,
        },
    },
    DRG: {
        [buffIds.LeftEye]: {
            name: "Dragon Sight",
            duration: 20,
            cd: 120,
            color: "red",
            self: true, target: false, party: false,
        },
        [buffIds.BattleLitany]: {
            name: "Battle Litany",
            duration: 20,
            cd: 180,
            color: "blue",
            self: true, target: false, party: false,
        },
        [buffIds.LanceCharge]: {
            name: "Lance Charge",
            duration: 20,
            cd: 90,
            color: "red",
            self: false, target: false, party: true,
        },
    },
    NIN: {
        [buffIds.TrickAttack]: {
            name: "Trick Attack",
            duration: 15,
            cd: 60,
            color: "yellow",
            self: false, target: true, party: false,
        },
        [buffIds.Bunshin]: {
            name: "Bunshin",
            duration: 10,
            cd: 90,
            noRefresh: true,
            color: "orange",
            self: false, target: false, party: true,
        },
    },
    SAM: {
        [actionIds.DoubleMidare]: {
            name: "Double Midare",
            duration: 5,
            cd: 60,
            color: "blue",
            self: false, target: false, party: true,
        },
    },
    BRD: {
        [buffIds.BattleVoice]: {
            name: "Battle Voice",
            duration: 20,
            cd: 180,
            color: "orange",
            self: true, target: false, party: false,
        },
        [buffIds.RagingStrikes]: {
            name: "Raging Strikes",
            duration: 20,
            cd: 80,
            color: "yellow",
            self: false, target: false, party: true,
        },
    },
    MCH: {
        [buffIds.Wildfire]: {
            name: "Wildfire",
            duration: 10,
            cd: 120,
            color: "red",
            self: false, target: true, party: false,
        },
    },
    DNC: {
        [buffIds.TechnicalFinish]: {
            name: "Technical Finish",
            duration: 20,
            cd: 120,
            color: "red",
            self: true, target: false, party: false,
        },
        [buffIds.Devilment]: {
            name: "Devilment",
            duration: 20,
            cd: 120,
            color: "green",
            self: true, target: false, party: false,
        },
    },
    BLM: {},
    SMN: {
        [buffIds.Devotion]: {
            name: "Devotion",
            duration: 15,
            cd: 180,
            color: "yellow",
            self: true, target: false, party: false,
        },
        [actionIds.SummonBahamut]: {
            name: "Summon Bahamut",
            duration: 20,
            cd: 60,
            color: "blue",
            self: false, target: false, party: true,
        },
        [actionIds.FirebirdTrance]: {
            name: "Firebird Trance",
            duration: 20,
            cd: 60,
            color: "orange",
            self: false, target: false, party: true,
        },
    },
    RDM: {
        [buffIds.Embolden]: {
            name: "Embolden",
            duration: 20,
            cd: 120,
            noRefresh: true,
            color: "blue",
            self: true, target: false, party: false,
        },
        [buffIds.Manafication]: {
            name: "Manafication",
            duration: 10,
            cd: 110,
            color: "blue",
            self: false, target: false, party: true,
        },
    },
    BLU: {
        [buffIds.PeculiarLight]: {
            name: "Peculiar Light",
            duration: 15,
            cd: 60,
            color: "red",
            self: false, target: true, party: false,
        },
        [buffIds.OffGuard]: {
            name: "Off Guard",
            duration: 15,
            cd: 60,
            color: "green",
            self: false, target: true, party: false,
        },
    },
};

export {buffConfig}