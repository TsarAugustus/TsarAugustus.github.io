import { player } from './player.js';
import { Stonecrafting } from './Crafting/Stonecrafting.js';
import { Woodcrafting } from './Crafting/Woodcrafting.js';
import { craftItem } from './Crafting/craftItem.js';

let skills = {
    Foraging: {
        name: 'Foraging',
        active: true,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        onclick: function() {
            this.currentXP += 10;
            if(!player.Wood) {
                player.Wood = { type: 'Basic', amount: 0 }
            }
            player.Wood.amount++;
            if(!player.Stone) {
                player.Stone = { type: 'Basic', amount: 0 }
            }
            player.Stone.amount++;
            if(this.currentXP >= this.XPToLevel) {
                this.level++;
                this.currentXP = 0;
                this.XPToLevel *= 1.6;
            }
            updateProgressBar({name: this.name, skill: this});
        }
    },
    Crafting: {
        name: 'Crafting',
        active: false,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        required: {
            level:  { Foraging: 1 }
        },
        subSkills: {
            Woodcrafting,
            Stonecrafting
        },
        specialFunction: craftItem,
        onclick: function() {
            let thisWrapper = document.getElementById(this.name + 'Wrapper');
            thisWrapper.classList.toggle('show');
            if(thisWrapper.classList.contains('show')) {
                updateProgressBar({name: this.name, skill: this});
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
    checkIfSubSkillIsAvailable(thisSkill.subSkills)
    let thisWrapper = document.getElementById(thisSkill.name + 'Wrapper');
    for(let subSkill in thisSkill.subSkills) {
        if(thisSkill.subSkills[subSkill].active && !document.getElementById(subSkill + 'Wrapper')) {
            let subSkillWrapper = document.createElement('div');
            subSkillWrapper.id = subSkill + 'Wrapper';
            subSkillWrapper.classList.add(thisSkill.name);
            subSkillWrapper.classList.add('subSkill');

            let subSkillButton = document.createElement('button');
            subSkillButton.innerHTML = `${thisSkill.subSkills[subSkill].name}</br>${thisSkill.subSkills[subSkill].level}`;;
            subSkillButton.name = thisSkill.name;
            subSkillButton.id = subSkill;
            subSkillButton.onclick = function() {
                let thisSubSkill = skills[thisSkill.name].subSkills[subSkill];
                createSubSkillScreen(thisSkill.name, subSkill, thisSubSkill);
                let clickedSubSkillButtons = document.getElementsByClassName('clicked');
                if(clickedSubSkillButtons.length > 0) {
                    for(let item of clickedSubSkillButtons) {
                        item.classList.remove('clicked');
                    }
                }
                this.classList.add('clicked');
            }
            subSkillWrapper.appendChild(subSkillButton);
            thisWrapper.appendChild(subSkillWrapper);
            updateProgressBar({name: skills[thisSkill.name].subSkills[subSkill].name, skill: skills[thisSkill.name].subSkills[subSkill]})
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
        if(req === 'subLevel' && skills[skill.parentSkill].subSkills[reqName].level >= skill.required[req][reqName]) {
            reqContainer.push(true);
        } else if (req === 'level' && skills[reqName].level >= Object.values(skill.required[req])) {
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

function createSubSkillScreen(mainSkill, subSkillName, subSkillInformation) {
    if(document.getElementById('subSkillScreen')) { 
        removeElementAndChildren('subSkillScreen');
    }

    let subSkillScreen = document.createElement('div');
    subSkillScreen.id = 'subSkillScreen';
    subSkillScreen.classList.add(mainSkill);
    document.getElementById('right').appendChild(subSkillScreen);
    for(let sub in subSkillInformation[subSkillName]) {
        shouldSkillBeActive(subSkillInformation[subSkillName][sub]);
        if(subSkillInformation[subSkillName][sub].active) {
            createSubButtons(sub, subSkillName, subSkillInformation, mainSkill);
        }
    }
}

function createSubButtons(sub, subSkillName, subSkillInformation, mainSkill) {
    shouldSkillBeActive(skills[mainSkill].subSkills[subSkillName][subSkillName][sub]);
    if(skills[mainSkill].subSkills[subSkillName][subSkillName][sub].active) {
        if(!document.getElementById('subButtonWrapper')) {
            let subButtonWrapper = document.createElement('div');
            subButtonWrapper.id = 'subButtonWrapper';
            document.getElementById('subSkillScreen').appendChild(subButtonWrapper);
        }
        let subButton = document.createElement('button');
        subButton.id = sub + 'ButtonWrapper'
        subButton.innerHTML = sub;
        subButton.onclick = function() {
            if(document.getElementById('subAllows')) {
                removeElementAndChildren('subAllows');
            }
            let clickedSubAllowButton = document.getElementsByClassName('clickedSubAllowButton');
            if(clickedSubAllowButton.length > 0) {
                for(let item of clickedSubAllowButton) {
                    item.classList.remove('clickedSubAllowButton');
                }
            }
            this.classList.add('clickedSubAllowButton');
            let subAllows = document.createElement('div');
            subAllows.id = 'subAllows';
            document.getElementById('subSkillScreen').appendChild(subAllows);
            for(let allow in subSkillInformation[subSkillName][sub].allows) {
                let subAllowsButtonDiv = document.createElement('div');
                subAllowsButtonDiv.id = allow + 'ButtonDiv';
    
                let subAllowsButton = document.createElement('button');
                let text = `${allow}`;
                for(let reqText in subSkillInformation[subSkillName][sub].allows[allow].required) {
                    let val = subSkillInformation[subSkillName][sub].allows[allow].required[reqText];
                    text += `</br>${reqText}: ${val}`
                }
                subAllowsButton.innerHTML = text;
                subAllowsButton.onclick = function() {
                        skills[mainSkill].specialFunction(subSkillInformation[subSkillName][sub].allows[allow], allow, mainSkill)
                }
                subAllowsButtonDiv.appendChild(subAllowsButton);
                document.getElementById('subAllows').appendChild(subAllowsButtonDiv);
            }
        }
        document.getElementById('subButtonWrapper').appendChild(subButton);
    }
}

function checkForNewSkills() {
    for(let skill in skills) {
        if(skills[skill].active === false) {
            shouldSkillBeActive(skills[skill]);
        }
    }
}

function updateSkillList() {
    let skillList = [];
    for(let skill in skills) {
        if(skills[skill].active) {
            skillList.push({ name: skill, skill: skills[skill] });
        }
    }
    return skillList;
}

function createSkillButton(skill) {
    if(!document.getElementById(skill.name + 'Wrapper')) {
        let wrapper = document.createElement('div');
        wrapper.id = skill.name + 'Wrapper';
        wrapper.classList.add('skill');
        let button = document.createElement('button');
        button.id = skill.name;
        button.innerHTML = `${skill.name}</br>${skill.skill.level}`;
        button.onclick = function() {
            skills[this.id].onclick();
            this.innerHTML = `${skill.name}</br>${skill.skill.level}`;
        }
        wrapper.appendChild(button);
        document.getElementById('skills').appendChild(wrapper);
    }
}

function removeElementAndChildren(el) {
    let elName = document.getElementById(el);
    while(elName.firstChild) {
        elName.removeChild(elName.lastChild);
    }
    elName.parentNode.removeChild(elName);
}

function updateProgressBar(skillInformation) {
    let progressBar = document.getElementById(skillInformation.name + 'ProgressBar');
    if(!progressBar) {
        let progressBar = document.createElement('div');
        progressBar.id = skillInformation.name + 'ProgressBar';
        progressBar.classList.add('progressBar');
        document.getElementById(skillInformation.name + 'Wrapper').appendChild(progressBar);
    }
    let progressWidth = (skillInformation.skill.currentXP / skillInformation.skill.XPToLevel) * 100;
    document.getElementById(skillInformation.name + 'ProgressBar').style.width = progressWidth + "%";
}

export { skills, updateSkillList, createSkillButton, createSubSkillButtons, checkForNewSkills, updateProgressBar, createSubButtons }