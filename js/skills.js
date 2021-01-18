import { player } from './player.js';

import { craftItem } from './Crafting/craftItem.js';
import { Stonecrafting } from './Crafting/Stonecrafting.js';
import { Woodcrafting } from './Crafting/Woodcrafting.js';
import { Textile } from './Crafting/Textile.js';
import { Firecrafting } from './Crafting/Firecrafting.js';

import { addFuel } from './Firekeeping/addFuel.js';
import { Basic } from './Firekeeping/Basic.js';

import { updatePlayer, focusList, focusLimit } from './main.js';

let skills = {
    Foraging: {
        name: 'Foraging',
        active: true,
        level: 0,
        currentXP: 0,
        XPIncrease: 10,
        XPToLevel: 100,
        focusUnlock: 2,
        toolType: 'Shoe',
        onclick: function() {
            let item = findSkillItem(this);
            let itemXPIncrease;
            let itemAmountIncrease;
            if(item === undefined) {
                itemXPIncrease = 0;
                itemAmountIncrease = 0;
            } else {
                itemXPIncrease = item.amount
                itemAmountIncrease = (100 * item.amount) / 1000;
            }
            this.currentXP += (this.XPIncrease + itemXPIncrease);
            let basicItems = ['Stone', 'Fruit', 'Seeds'];
            let pickedItem = basicItems[Math.floor(Math.random() * basicItems.length)];
            if(!player[pickedItem]) {
                player[pickedItem] = { type: 'Basic', amount: 0 }
            }
            let newAmt = player[pickedItem].amount + itemAmountIncrease;
            player[pickedItem].amount = 1 + Math.round(newAmt*100)/100;
            if(this.currentXP >= this.XPToLevel) {
                this.level++;
                this.currentXP = (this.currentXP - this.XPToLevel);
                this.XPToLevel *= 1.6;
                checkForNewSkills();
            }

            if(this.level >= this.focusUnlock) {
                createFocusButton(this);
            }
            updateProgressBar({name: this.name, skill: this});
            updatePlayer();
        },
        desc: 'Forage for materials.'
    },
    Crafting: {
        name: 'Crafting',
        active: false,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        required: {
            level:  { Foraging: 3 }
        },
        subSkills: {
            Woodcrafting,
            Stonecrafting,
            Textile,
            Firecrafting
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
        },
        desc: 'Craft items and tools.'
    }, 
    Woodcutting: {
        name: 'Woodcutting',
        active: false,
        level: 0,
        currentXP: 0,
        XPIncrease: 10,
        XPToLevel: 100,
        required: {
            toolType: 'Axe'
        },
        focusUnlock: 2,
        toolType: 'Axe',
        onclick: function() {
            let item = findSkillItem(this);
            let itemXPIncrease;
            let itemAmountIncrease;
            if(item === undefined) {
                itemXPIncrease = 0;
                itemAmountIncrease = 0;
            } else {
                itemXPIncrease = item.amount - 1;
                itemAmountIncrease = (100 * item.amount) / 1000 - .1;
            }
            this.currentXP += (this.XPIncrease + itemXPIncrease);
            let basicItems = ['Wood', 'Leaves', 'Fruit'];
            let pickedItem = basicItems[Math.floor(Math.random() * basicItems.length)];
            if(!player[pickedItem]) {
                player[pickedItem] = { type: 'Basic', amount: 0 }
            }
            let newAmt = player[pickedItem].amount + itemAmountIncrease;
            player[pickedItem].amount = 1 + Math.round(newAmt*100)/100;

            if(this.currentXP >= this.XPToLevel) {
                this.level++;
                this.currentXP = (this.currentXP - this.XPToLevel);
                this.XPToLevel *= 1.6;
                checkForNewSkills();
            }
            if(this.level >= this.focusUnlock) {
                createFocusButton(this);
            }
            updateProgressBar({name: this.name, skill: this});
            updatePlayer();
        },
        desc: 'Whack trees for profit.'
    },
    Mining: {
        name: 'Mining',
        active: false,
        level: 0,
        currentXP: 0,
        XPIncrease: 10,
        XPToLevel: 100,
        required: {
            toolType: 'Pick'
        },
        focusUnlock: 2,
        toolType: 'Pick',
        onclick: function() {
            let item = findSkillItem(this);
            let itemXPIncrease;
            let itemAmountIncrease;
            if(item === undefined) {
                itemXPIncrease = 0;
                itemAmountIncrease = 0;
            } else {
                itemXPIncrease = item.amount - 1;
                itemAmountIncrease = (100 * item.amount) / 1000 - .1;
            }

            this.currentXP += (this.XPIncrease + itemXPIncrease);
            let basicItems = ['Coal', 'Stone', 'Ore', 'Clay'];
            let pickedItem = basicItems[Math.floor(Math.random() * basicItems.length)];
            if(!player[pickedItem]) {
                player[pickedItem] = { type: 'Basic', amount: 0 }
            }
            let newAmt = player[pickedItem].amount + itemAmountIncrease ;
            player[pickedItem].amount = 1 + Math.round(newAmt*100)/100;
            if(this.currentXP >= this.XPToLevel) {
                this.level++;
                this.currentXP = (this.currentXP - this.XPToLevel);
                this.XPToLevel *= 1.6;
                checkForNewSkills();
            }
            if(this.level >= this.focusUnlock) {
                createFocusButton(this);
            }
            updateProgressBar({name: this.name, skill: this});
            updatePlayer();
        },
        desc: 'Strike the earth!'
    },
    Firekeeping: {
        name: 'Firekeeping',
        active: false,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        required: {
            toolType: 'Fire'
        },
        subSkills: {
           Basic
        },
        specialFunction: addFuel,
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
        },
        desc: 'The Fire fades.'
    }
}

function createFocusButton(itemToFocus) {
    if(!document.getElementById(itemToFocus.name + 'Focus')) {
        let focusButton = document.createElement('button');
        focusButton.id = itemToFocus.name + 'Focus';
        focusButton.classList.add('focus');
        focusButton.innerHTML = `Focus`;
        
        focusButton.onclick = function() {
            let isFocused = focusList.find(item => item === itemToFocus);     
            if(isFocused) {
                let focusedIndex = focusList.indexOf(isFocused);
                focusList.splice(focusedIndex, 1);
                this.innerHTML = `Focus`;
                document.getElementById(itemToFocus.name).classList.remove('focused');
                document.getElementById(itemToFocus.name + 'Focus').classList.remove('focused');
            }
               
            if(focusList.length < focusLimit) {
                if(!isFocused) {
                    focusList.push(itemToFocus);
                    this.innerHTML = `Unfocus`;
                    document.getElementById(itemToFocus.name).classList.add('focused');
                    document.getElementById(itemToFocus.name + 'Focus').classList.add('focused');
                }
            }
        }

        let thisProgressBar = document.getElementById(itemToFocus.name + 'ProgressBarWrapper');
        thisProgressBar.parentNode.insertBefore(focusButton, thisProgressBar);
    }
}

function findSkillItem(skill) {
    for(let item in player) {
        if(player[item].toolType === skill.toolType) {
            return player[item];
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
            subSkillButton.innerHTML = `${thisSkill.subSkills[subSkill].name}</br>
                                        Level: ${thisSkill.subSkills[subSkill].level}</br>`;
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
        } else if(req === 'toolType') {
            for(let item in player) {
                if(player[item].toolType === skill.required[req]) {
                    reqContainer.push(true);
                }
            }
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
                subAllowsButtonDiv.classList.add('column');
    
                let subAllowsButton = document.createElement('button');
                let text = `${allow}`;
                for(let reqText in subSkillInformation[subSkillName][sub].allows[allow].required) {
                    let val = subSkillInformation[subSkillName][sub].allows[allow].required[reqText];
                    text += `</br>${reqText}: ${val}`
                }
                subAllowsButton.innerHTML = text;
                subAllowsButton.id = allow;
                subAllowsButton.onclick = function() {
                    skills[mainSkill].specialFunction(subSkillInformation[subSkillName][sub].allows[allow], allow, mainSkill);
                }

                let subAllowsButtonDescription = document.createElement('span');
                subAllowsButtonDescription.classList.add('desc');
                subAllowsButtonDescription.innerHTML = subSkillInformation[subSkillName][sub].allows[allow].desc;
                subAllowsButtonDescription.style.display = "none";


                subAllowsButtonDiv.appendChild(subAllowsButton);
                subAllowsButtonDiv.appendChild(subAllowsButtonDescription);

                subAllowsButton.onmouseover = function() {
                    subAllowsButtonDescription.style.display = "block";
                };
                subAllowsButton.onmouseout = function() {
                    subAllowsButtonDescription.style.display = "none";
                };
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
        button.innerHTML = `${skill.name}</br>
                            Level: ${skill.skill.level}`;
        button.onclick = function() {
            skills[this.id].onclick();
            this.innerHTML = `${skill.name}</br>
                                Level: ${skill.skill.level}`;
        }
        wrapper.appendChild(button);
        document.getElementById('skills').appendChild(wrapper);
        updateProgressBar(skill);

        let skillButtonDescription = document.createElement('span');
        skillButtonDescription.classList.add('desc');
        skillButtonDescription.innerHTML = skill.skill.desc;
        skillButtonDescription.style.display = "none";


        
        wrapper.appendChild(skillButtonDescription);
        button.onmouseover = function() {
            skillButtonDescription.style.display = "block";
        }
        button.onmouseout = function() {
            skillButtonDescription.style.display = "none";
        }
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
    if(!document.getElementById(skillInformation.name + 'ProgressBarWrapper')) {
        let progressBarWrapper = document.createElement('div');
        progressBarWrapper.id = skillInformation.name + 'ProgressBarWrapper';
        progressBarWrapper.classList.add('progressBarWrapper');

        let progressSpan = document.createElement('span');
        progressSpan.id = skillInformation.name + 'progressSpan';
        progressSpan.classList.add('progressSpan');
        progressBarWrapper.appendChild(progressSpan);

        let progressBar = document.createElement('div');
        progressBar.id = skillInformation.name + 'ProgressBar';
        progressBar.classList.add('progressBar');
        progressBarWrapper.appendChild(progressBar);

        document.getElementById(skillInformation.name + 'Wrapper').appendChild(progressBarWrapper);
    } 
    

    let progressWidth = (skillInformation.skill.currentXP / skillInformation.skill.XPToLevel) * 100;
    document.getElementById(skillInformation.name + 'ProgressBar').style.width = `${progressWidth}%`;
    document.getElementById(skillInformation.name + 'progressSpan').innerHTML = `${skillInformation.skill.currentXP.toFixed(2)}/${skillInformation.skill.XPToLevel.toFixed(2)}`;
}

export { skills, updateSkillList, createSkillButton, createSubSkillButtons, checkForNewSkills, updateProgressBar, createSubButtons }