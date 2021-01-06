import { player } from './player.js';
import { craftItem } from './Crafting/craftItem.js';
import { Stonecrafting } from './Crafting/Stonecrafting.js';
import { Woodcrafting } from './Crafting/Woodcrafting.js';
import { Textile } from './Crafting/Textile.js';
import { Cropfarming } from './Farming/Cropfarming.js';
// import { Treefarming } from './Farming/Cropfarming.js';

import { updatePlayer } from './main.js';

let subFocusList = {
    //subname
    //sublimit (equal to sub level)
}

let skills = {
    Foraging: {
        name: 'Foraging',
        active: true,
        level: 0,
        currentXP: 0,
        XPIncrease: 10,
        XPToLevel: 100,
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
                this.currentXP = 0;
                this.XPToLevel *= 1.6;
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
            level:  { Foraging: 2 }
        },
        subSkills: {
            Woodcrafting,
            Stonecrafting,
            Textile
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
                this.currentXP = 0;
                this.XPToLevel *= 1.6;
            }
            updateProgressBar({name: this.name, skill: this});
            updatePlayer();
        },
        desc: 'Whack trees for profit.'
    },
    // Farming: {
    //     name: 'Farming',
    //     active: false,
    //     level: 0,
    //     currentXP: 0,
    //     XPToLevel: 100,
    //     required: {
    //         item: { Handhoe: 1 }
    //     },
    //     subSkills: {
    //         Cropfarming
    //     },
    //     specialFunction: craftItem,
    //     onclick: function() {
    //         let thisWrapper = document.getElementById(this.name + 'Wrapper');
    //         thisWrapper.classList.toggle('show');
    //         if(thisWrapper.classList.contains('show')) {
    //             updateProgressBar({name: this.name, skill: this});
    //             createSubSkillButtons(this);
    //         } else {
    //             let subSkills = document.getElementsByClassName(this.name);
    //             while(subSkills.length > 0){
    //                 subSkills[0].parentNode.removeChild(subSkills[0]);
    //             }
    //         }
    //     }
    // },
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
                this.currentXP = 0;
                this.XPToLevel *= 1.6;
            }
            updateProgressBar({name: this.name, skill: this});
            updatePlayer();
        },
        desc: 'Strike the earth!'
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
                }
                subAllowsButton.onmouseout = function() {
                    subAllowsButtonDescription.style.display = "none";
                }
                // let focusButton = document.createElement('button');
                // focusButton.id = allow + 'Focus';
                // focusButton.name = subSkillName;
                // focusButton.innerHTML = `Focus ${allow}`;
                // focusButton.classList.add('focusButton');

                // if(!subFocusList[subSkillName]) {
                //     subFocusList[subSkillName] = {
                //         limit: skills[mainSkill].subSkills[subSkillName].level + 2,
                //         focus: []
                //     };
                // }
                // focusButton.onclick = function() {
                    // subFocusList[subSkillName].limit = skills[mainSkill].subSkills[subSkillName].level;

                    // let focusListSkill = subFocusList[subSkillName].focus.find(function(skillItem) {
                    //     console.log(skillItem, allow)
                    //     return skillItem === allow
                    // });

                    // if (focusListSkill) {
                    //     let focusedSkillName = this.id.slice(0, -5);
                    //     let skillInFocusList = subFocusList[this.name].focus.find(el => el === focusedSkillName);
                    //     subFocusList[this.name].focus.splice(skillInFocusList, 1);
                    //     this.innerHTML = `Focus ${allow}`;
                    //     this.classList.remove('unfocusButton');
                    //     this.classList.add('focusButton');
                    // }

                    // if(!focusListSkill && subFocusList[subSkillName].focus.length < subFocusList[subSkillName].limit) {
                    //     subFocusList[subSkillName].focus.push(allow);
                    //     this.innerHTML = `Unfocus ${allow}`;
                    //     this.classList.remove('focusButton');
                    //     this.classList.add('unfocusButton');
                    // }
                    
                    // } else if(!focusListSkill && subFocusList[subSkillName].focus.length < subFocusList[subSkillName].limit) {
                    //     subFocusList[subSkillName].focus.push(allow);
                    //     this.innerHTML = `Unfocus ${allow}`;
                    //     this.classList.remove('focusButton');
                    //     this.classList.add('unfocusButton');
                    //     // this.classList.add('focus');
                    //     // console.log(allow)
                    //     // makeUnfocusButton(allow, subSkillName);
                    // }
                    // if (subFocusList[subSkillName].focus.length < subFocusList[subSkillName].limit){
                    //     let focusElements = document.getElementsByClassName('focusButton');
                    //     console.log('just right', subFocusList[subSkillName].focus)
                    //     for(let item of focusElements) {
                    //         item.disabled = false;
                    //     }
                    // }

                    // if(subFocusList[subSkillName].focus.length >= subFocusList[subSkillName].limit) {
                    //     let focusElements = document.getElementsByClassName('focusButton');
                    //     console.log('too much')
                    //     for(let item of focusElements) {
                    //         item.disabled = true;
                    //     }
                    // } 

                    // if(subFocusList[subSkillName].focus.length < subFocusList[subSkillName].limit) {
                        
                    // }
                // }
                
                // subAllowsButtonDiv.appendChild(focusButton)
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
    let progressBar = document.getElementById(skillInformation.name + 'ProgressBar');
    if(!progressBar) {
        let progressBar = document.createElement('div');
        progressBar.id = skillInformation.name + 'ProgressBar';
        progressBar.classList.add('progressBar');
        document.getElementById(skillInformation.name + 'Wrapper').appendChild(progressBar);
    }
    let progressWidth = (skillInformation.skill.currentXP / skillInformation.skill.XPToLevel) * 100;
    document.getElementById(skillInformation.name + 'ProgressBar').style.width = progressWidth + "%";
    document.getElementById(skillInformation.name + 'ProgressBar').innerHTML = `${skillInformation.skill.currentXP}/${skillInformation.skill.XPToLevel.toFixed(2)}`
}

export { skills, updateSkillList, createSkillButton, createSubSkillButtons, checkForNewSkills, updateProgressBar, createSubButtons }