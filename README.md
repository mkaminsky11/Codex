# CODEX

Extra gauges and buff trackers for FFXIV

## Installation
1. ACT + FFXIV Plugin
2. [NGLD's OverlayPlugin](https://github.com/quisquous/cactbot#install-ngld-overlayplugin)
3. For gauges, add a new Miniparse overlay, and point the url to `https://mkaminsky11.github.io/Codex/index.html`
4. For buff tracker, add a new Miniparse overlay, and point the url to `https://mkaminsky11.github.io/Codex/buffs.html`

### (For Streamers)
1. In OBS, add new brower sources pointing to `https://mkaminsky11.github.io/Codex/index.html?OVERLAY_WS=ws://127.0.0.1:10501/ws` or `https://mkaminsky11.github.io/Codex/buffs.html?OVERLAY_WS=ws://127.0.0.1:10501/ws`

## Job Gauges
Shows information such as how much time you have left on your DoT (Biolysis, Dia, etc.), how many gcds you have gotten under buffs (Inner release, Perfect Balance)

## Buff Tracker
Shows which party buffs are currently active and how long until they are off cooldown. For Astrologian, also shows which personal buffs your party members are using so that you can give them cards.

![](img/docs/demo_img.png)

## FAQs
### Do I need Cactbot for this to work?
> No
### How to I change the overlay settings?
> Click on the diamond in the top-left of the job gauge overlay. After making your changes, click "SAVE"
### Why aren't my party buffs showing up?
> Make sure to add a new overlay pointing to `https://mkaminsky11.github.io/Codex/buffs.html`. Otherwise, open an [Issue](https://github.com/mkaminsky11/Codex/issues/new)
### How do I enable notifications if my DoTs (damage-over-time) get low?
> Open the settings menu, check "Flash when DoTs low" then click "SAVE". The timer will now flash red when there is less than 30% remaining
### Why does it say "UNLOCKED (LOCK BEFORE USING)"
> Check "Lock Overlay" inside of ACT ([see this image](https://github.com/quisquous/cactbot/raw/main/screenshots/overlay_plugin_new_raidboss_locked.png))
### How do I see my party members' personal buffs?
> Check "Always show party member's personal buffs" in the settings menu

## TODO Log
+ **TODO**: multi-DoT tracker
+ **TODO**: multi-buffs (if you have multiple of a job in your party)
+ **TODO**: change bar type
+ **TODO**: change arrow size
+ **TODO**: change refresh time (how often dots update)
+ **TODO**: change timeout time (how long after gcd timer it disappears)
+ **TODO**: material UI or base FFXIV
+ **TODO**: add buff settings (change size, etc.)
+ **TODO**: stop flashing dot warning after a while (if enabled)
+ **TODO**: reset button

## Jobs

### ![](img/job_icons/DRK.png =20x20) DRK
+ **Gauges**: GCDS used in Delirium, GCDS used in Blood Weapon
+ **Buffs**: Delerium (only visible to AST by default)

### ![](img/job_icons/WAR.png =20x20) WAR
+ **Gauges**: GCDS used in Inner Release, Storm's Eye tracker
+ **Buffs**: Inner Release (only visible to AST by default)

### ![](img/job_icons/PLD.png =20x20) PLD
+ **Gauges**: GCDS used in Requiescat, GCDS used in Fight or Flight, Goring Blade tracker

### ![](img/job_icons/GNB.png =20x20) GNB
+ **Gauges**: GCDS used in No Mercy

### ![](img/job_icons/SCH.png =20x20) SCH
+ **Gauges**: Biolysis tracker
+ **Buffs**: Chain Stratagem

### ![](img/job_icons/WHM.png =20x20) WHM
+ **Gauges**: Dia tracker

### ![](img/job_icons/AST.png =20x20) AST
+ **Gauges**: Combust Tracker
+ **Buffs**: Cards, Divination

### ![](img/job_icons/MNK.png =20x20) MNK
+ **Gauges**: GCDS used in Riddle of Fire, GCDS used in Perfect Balance
+ **Buffs**: Brotherhood, Riddle of Fire (only visible to AST by default)

### ![](img/job_icons/DRG.png =20x20) DRG
+ **Gauges**: GCDS used in Lance Charge, GCDS used in Dragon Sight
+ **Buffs**: Dragon Sight, Litany, Lance Charge (only visible to AST by default)

### ![](img/job_icons/NIN.png =20x20) NIN
+ **Gauges**: GCDS used in Trick
+ **Buffs**: Trick Attack, Bunshin (only visible to AST by default)

### ![](img/job_icons/SAM.png =20x20) SAM
+ **Gauges**: Jinpu tracker, Shifu tracker, Higanbana tracker
+ **Buffs**: Double Midare

### ![](img/job_icons/BRD.png =20x20) BRD
+ **Gauges**: GCDS used in Raging Strikes, Caustic Bite tracker, Stormbite tracker
+ **Buffs**: Battle Voice, Raging Strikes (only visible to AST by default)

### ![](img/job_icons/MCH.png =20x20) MCH
+ **Gauges**: GCDS used in Hypercharge, GCDS used in Wildfire
+ **Buffs**: Wildfire (only visible to AST by default)

### ![](img/job_icons/DNC.png =20x20) DNC
+ **Gauges**: GCDS used in Devilment
+ **Buffs**: Technical Step, Devilment

### ![](img/job_icons/BLM.png =20x20) BLM
+ **Gauges**: Thunder tracker

### ![](img/job_icons/SMN.png =20x20) SMN
+ **Gauges**: Bio tracker, Miasma tracker, Wyrmwave and Scarlet Flame tracker
+ **Buffs**: Devotion, Summon Bahamut (only visible to AST by default), Firebird Trance (only visible to AST by default)

### ![](img/job_icons/RDM.png =20x20) RDM
+ **Gauges**: GCDS used in Manification
+ **Buffs**: Embolden, Manafication (only visible to AST by default)

### ![](img/job_icons/BLU.png =20x20) BLU
+ **Gauges**: Song of Torment tracker
+ **Buffs**: Off-guard, Peculiar Light
+ **TODO:** Revenge blast indicator