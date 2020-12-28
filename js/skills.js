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
                checkIfSubSkillIsAvailable(this.subSkills);
                for(let subSkill in this.subSkills) {
                    
                    if(this.subSkills[subSkill].active && !document.getElementById(subSkill + 'Wrapper')) {
                        let subSkillWrapper = document.createElement('div');
                        subSkillWrapper.id = subSkill + 'Wrapper';
                        subSkillWrapper.classList.add(this.name);
                        subSkillWrapper.classList.add('subSkill');
                        let subSkillButton = document.createElement('button');
                        subSkillButton.innerHTML = subSkill;
                        subSkillButton.name = this.name;
                        subSkillButton.id = subSkill;
                        subSkillButton.onclick = function() {
                            let thisSubSkill = skills[this.name].subSkills[this.id];
                            createSubSkillScreen(this.name, this.id, thisSubSkill);
                            
                        }
                        subSkillWrapper.appendChild(subSkillButton);
                        thisWrapper.appendChild(subSkillWrapper);
                    }
                }
            } else {
                let subSkills = document.getElementsByClassName(this.name);
                while(subSkills.length > 0){
                    subSkills[0].parentNode.removeChild(subSkills[0]);
                }
            }
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

export { skills, shouldSkillBeActive }