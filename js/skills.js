import { player } from './player.js';
import { Foraging } from './skills/Foraging.js';
import { Crafting } from './skills/Crafting.js';
import { Woodcutting } from './skills/Woodcutting.js';
import { Mining } from './skills/Mining.js';
import { Firekeeping } from './skills/Firekeeping.js';

import { focusList, focusLimit, shouldButtonBeDisabled } from './main.js';

let skills = {
    Foraging,
    Crafting, 
    Woodcutting,
    Mining,
    Firekeeping
}

function createFocusButton(itemToFocus, functionToClick, functionParams) {
    if(document.getElementById(itemToFocus.name) && !document.getElementById(itemToFocus.name + 'Focus')) {
        let focusButton = document.createElement('button');
        focusButton.id = itemToFocus.name + 'Focus';
        focusButton.classList.add('focus');
        focusButton.innerHTML = `Focus`;
        
        focusButton.onclick = function() {  
            let isFocused = focusList.find((item) => {
                if(item.itemToFocus.name === itemToFocus.name) {
                    return item;
                }
            });

            if(isFocused) {
                let focusedIndex = focusList.indexOf(isFocused);
                focusList.splice(focusedIndex, 1);
                this.innerHTML = `Focus`;
                document.getElementById(itemToFocus.name).classList.remove('focused');
                document.getElementById(itemToFocus.name + 'Focus').classList.remove('focused');
            }
               
            if(focusList.length < focusLimit) {
                if(!isFocused) {
                    focusList.push({itemToFocus, functionToClick, functionParams});
                    this.innerHTML = `Unfocus`;
                    document.getElementById(itemToFocus.name).classList.add('focused');
                    document.getElementById(itemToFocus.name + 'Focus').classList.add('focused');
                }
            }
        }

        document.getElementById(itemToFocus.name).parentNode.appendChild(focusButton)
        let isFocused = focusList.find(item => item.itemToFocus.name === itemToFocus.name);  
        if(isFocused) {
            document.getElementById(itemToFocus.name + 'Focus').innerHTML = `Unfocus`;
            document.getElementById(itemToFocus.name).classList.add('focused');
            document.getElementById(itemToFocus.name + 'Focus').classList.add('focused');
        }
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
    checkIfSubSkillIsAvailable(thisSkill.subSkills);
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
    if(document.getElementById('subSkillScreen')) {
        let subSkillName = document.getElementById('subSkillScreen').getAttribute('name');
        if(document.getElementById(subSkillName)) {
            document.getElementById(subSkillName).classList.add('clicked');
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
    subSkillScreen.setAttribute('name', subSkillName);
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

                let nameText = document.createElement('span');
                nameText.innerHTML = `${allow}`;
                let reqText = document.createElement('span');
                let text = '';
                for(let reqText in subSkillInformation[subSkillName][sub].allows[allow].required) {
                    let val = subSkillInformation[subSkillName][sub].allows[allow].required[reqText];
                    text += `</br>${reqText}: ${val}`
                }
                reqText.innerHTML = text
                subAllowsButton.appendChild(nameText);
                subAllowsButton.appendChild(reqText);
                subAllowsButton.id = allow;
                subAllowsButton.name = mainSkill;
                subAllowsButton.value = subSkillName;
                subAllowsButton.classList.add(sub)
                subAllowsButton.onclick = function() {
                    skills[mainSkill].specialFunction(subSkillInformation[subSkillName][sub].allows[allow], allow, mainSkill);
                }

                let subAllowsButtonDescription = document.createElement('span');
                subAllowsButtonDescription.classList.add('desc');
                subAllowsButtonDescription.innerHTML = subSkillInformation[subSkillName][sub].allows[allow].desc;
                subAllowsButtonDescription.style.display = "none";


                subAllowsButtonDiv.appendChild(subAllowsButton);
                subAllowsButtonDiv.appendChild(subAllowsButtonDescription);

                if(shouldButtonBeDisabled(subSkillInformation[subSkillName][sub].allows[allow])) {
                    subAllowsButton.disabled = false;
                } else {
                    subAllowsButton.disabled = true;
                }

                subAllowsButton.onmouseover = function() {
                    subAllowsButtonDescription.style.display = "block";
                };
                subAllowsButton.onmouseout = function() {
                    subAllowsButtonDescription.style.display = "none";
                };
                document.getElementById('subAllows').appendChild(subAllowsButtonDiv);

                if(skills[mainSkill].subSkills[subSkillName].level >= 0) {
                    createFocusButton({name: allow}, 
                        skills[mainSkill].specialFunction,
                        [subSkillInformation[subSkillName][sub].allows[allow], allow, mainSkill]
                    )
                }
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

function createSkillTabs(tabName) {
    if(!document.getElementById(tabName+'Button')) {
        let tab = document.createElement('button');
        tab.id = tabName+'Button';
        tab.innerHTML = tabName;

        tab.onclick = function() {
            if(skills[tabName]) {
                updateProgressBar({name: skills[tabName].name, skill: skills[tabName]});
            }
            let categoryWrapList = document.getElementsByClassName('categoryWrapper');
            for(let item of categoryWrapList) {
                item.parentNode.removeChild(item)
            }
            let skillList = updateSkillList();
            // console.log(tabName)
            checkForNewSkills();

            for(let skill of skillList) {
                if(skill.skill.category === tabName) {
                    createSkillButton(skill);
                } else if(skill.name === tabName) {
                    let categoryWrapper = document.createElement('div');
                    categoryWrapper.id = `${skill.name}Wrapper`;
                    categoryWrapper.classList.add('categoryWrapper');

                    document.getElementById('left').appendChild(categoryWrapper);
                    if(document.getElementById(`${skill.name}Wrapper`)) {
                        createSubSkillButtons(skill.skill)
                    }
                }
            }

            if(!document.getElementById('containerInfo')) {
                let wrapContainer = document.getElementById(categoryWrapList[0].id);
                let containerInfo = document.createElement('div');
                containerInfo.id = 'containerInfo';

                let containerHeader = document.createElement('h3');
                containerHeader.id = 'containerHeader';
                containerHeader.innerHTML = tabName;

                containerInfo.appendChild(containerHeader);
                wrapContainer.insertBefore(containerInfo, wrapContainer.firstChild)
            }
        }

        document.getElementById('skillButtonList').appendChild(tab);
    }
}

function createSkillButton(skill) {  
    if(!document.getElementById(`${skill.skill.category}Wrapper`)) {
        let categoryWrapper = document.createElement('div');
        categoryWrapper.id = `${skill.skill.category}Wrapper`;
        categoryWrapper.classList.add('categoryWrapper');
        document.getElementById('left').appendChild(categoryWrapper);
    }
    
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
        document.getElementById(`${skill.skill.category}Wrapper`).appendChild(wrapper);
        
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
        if(skill.skill.level >= skill.skill.focusUnlock) {
            createFocusButton({name: skill.name}, true, skill.skill.onclick)
        }
        updateProgressBar(skill);
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
    let categoryWrapper = document.getElementsByClassName('categoryWrapper');

    if(!document.getElementById(skillInformation.name + 'ProgressBarWrapper')) {
        let progressBarWrapper = document.createElement('div');
        progressBarWrapper.id = skillInformation.name + 'ProgressBarWrapper';
        progressBarWrapper.classList.add('progressBarWrapper');

        let progressSpan = document.createElement('span');
        progressSpan.id = skillInformation.name + 'ProgressSpan';
        progressSpan.classList.add('progressSpan');
        progressBarWrapper.appendChild(progressSpan);

        let progressBar = document.createElement('div');
        progressBar.id = skillInformation.name + 'ProgressBar';
        progressBar.classList.add('progressBar');
        progressBarWrapper.appendChild(progressBar);

        if(categoryWrapper.length > 0 && categoryWrapper[0].id.slice(0, -7) === skillInformation.name) {
            let mainContainer = document.getElementById(categoryWrapper[0].id);
            if(!document.getElementById('containerInfo')) {
                let containerInfo = document.createElement('div');
                containerInfo.id = 'containerInfo';
                mainContainer.insertBefore(containerInfo, mainContainer.firstChild);
            }

            let containerHeader = document.createElement('h3');
            containerHeader.innerHTML = categoryWrapper[0].id.slice(0, -7);

            document.getElementById('containerInfo').appendChild(containerHeader);
            document.getElementById('containerInfo').appendChild(progressBarWrapper); 
        } else if(document.getElementById(skillInformation.name + 'Wrapper')) {
            document.getElementById(skillInformation.name + 'Wrapper').appendChild(progressBarWrapper);
        }
    } 
    
    if(categoryWrapper.length > 0 && !document.getElementById(categoryWrapper[0].id.slice(0, -7) + 'ProgressBar') && skills[categoryWrapper[0].id.slice(0, -7)]) {
        let categoryName = categoryWrapper[0].id.slice(0, -7);
        updateProgressBar({name: categoryWrapper[0].id.slice(0, -7), skill: skills[categoryName]});
    }

    let progressWidth = (skillInformation.skill.currentXP / skillInformation.skill.XPToLevel) * 100;
    if(document.getElementById(skillInformation.name + 'ProgressBar')) {
        document.getElementById(skillInformation.name + 'ProgressBar').style.width = `${progressWidth}%`;
        document.getElementById(skillInformation.name + 'ProgressSpan').innerHTML = `${skillInformation.skill.currentXP.toFixed(2)}/${skillInformation.skill.XPToLevel.toFixed(2)}`;
    }
    
    if(categoryWrapper[0].id.slice(0, -7) === skillInformation.name && !document.getElementById(skillInformation.name + 'LevelInfo')) {
        let levelInfo = document.createElement('h4');
        levelInfo.id = skillInformation.name + 'LevelInfo';
        levelInfo.innerHTML = `Level: ${skillInformation.skill.level}`;
        document.getElementById('containerInfo').insertBefore(levelInfo, document.getElementById('containerInfo').lastChild);
    } else if(categoryWrapper[0].id.slice(0, -7) === skillInformation.name && document.getElementById(skillInformation.name + 'LevelInfo')) {
        document.getElementById(skillInformation.name + 'LevelInfo').innerHTML = `Level: ${skillInformation.skill.level}`;
    }
}

export { skills, shouldSkillBeActive, createSkillButton, updateSkillList, createSkillTabs, createSubSkillButtons, checkForNewSkills, updateProgressBar, createSubButtons, findSkillItem, createFocusButton }