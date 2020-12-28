import { player } from './player.js';
import { Stonecrafting } from './Crafting/Stonecrafting.js';
import { Woodcrafting } from './Crafting/Woodcrafting.js';
import { createSubSkillScreen } from './main.js';
let skills = {
    Foraging: {
        active: true,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        onclick: function() {
            this.currentXP += 10;
            if(!player.Wood) {
                player.Wood = { amount: 0 }
            }
            player.Wood.amount++;
            if(!player.Stone) {
                player.Stone = { amount: 0 }
            }
            player.Stone.amount++;
            if(this.currentXP >= this.XPToLevel) {
                this.level++;
                this.currentXP = 0;
                this.XPToLevel *= 1.6;
            }
        }
    },
    Crafting: {
        name: 'Crafting',
        active: false,
        level: 0,
        required: {
            // level:  { Foraging: 1 },
            // item:   { Wood: 15 }
        },
        subSkills: {
            Woodcrafting,
            Stonecrafting
        },
        onclick: function() {
            let thisWrapper = document.getElementById(this.name + 'Wrapper');
            thisWrapper.classList.toggle('show');
            if(thisWrapper.classList.contains('show')) {
                createSubSkillButtons(this);
            } else {
                let subSkills = document.getElementsByClassName(this.name);
                while(subSkills.length > 0){
                    subSkills[0].parentNode.removeChild(subSkills[0]);
                }
            }
        }
    }
}

function createSubSkillButtons(thisSkill) {
    checkIfSubSkillIsAvailable(thisSkill.subSkills);
    let thisWrapper = document.getElementById(thisSkill.name + 'Wrapper');
    for(let subSkill in thisSkill.subSkills) {
        if(thisSkill.subSkills[subSkill].active && !document.getElementById(subSkill + 'Wrapper')) {
            let subSkillWrapper = document.createElement('div');
            subSkillWrapper.id = subSkill + 'Wrapper';
            subSkillWrapper.classList.add(thisSkill.name);
            subSkillWrapper.classList.add('subSkill');
            let subSkillButton = document.createElement('button');
            subSkillButton.innerHTML = subSkill;
            subSkillButton.name = thisSkill.name;
            subSkillButton.id = subSkill;
            subSkillButton.onclick = function() {
                let thisSubSkill = skills[thisSkill.name].subSkills[thisSkill.id];
                createSubSkillScreen(thisSkill.name, thisSkill.id, thisSubSkill);
                
            }
            subSkillWrapper.appendChild(subSkillButton);
            thisWrapper.appendChild(subSkillWrapper);
        }
    }
}

function checkIfSubSkillIsAvailable(subSkills) {
    let activeSkills = [];
    for(let subSkill in subSkills) {
        if(shouldSkillBeActive(subSkills[subSkill])) {
            activeSkills.push(subSkill);
        }
    }
    return activeSkills;
}

function shouldSkillBeActive(skill) {
    let reqContainer = [];
    for(let req in skill.required) {
        let reqName = Object.keys(skill.required[req]);
        if(req === 'level' && skills[reqName].level >= Object.values(skill.required[req])) {
            reqContainer.push(true);
        } else if (req === 'item' && player[reqName] && player[reqName].amount >= Object.values(skill.required[req])) {
            reqContainer.push(true);
        }
    }

    if(reqContainer.length === Object.keys(skill.required).length) {
        skill.active = true;
        return true;
    }
}

export { skills, shouldSkillBeActive, createSubSkillButtons }