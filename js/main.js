import { skills, shouldSkillBeActive, createSubSkillButtons } from './skills.js';
import { player } from './player.js';

window.onload = function() {
    init();
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
        button.innerHTML = skill.name;
        button.onclick = function() {
            skills[this.id].onclick();
        }
        wrapper.appendChild(button);
        document.getElementById('skills').appendChild(wrapper);
    }
}

function checkForNewSkills() {
    for(let skill in skills) {
        if(skills[skill].active === false) {
            shouldSkillBeActive(skills[skill]);
        }
    }
}

function updatePlayer() {
    let playerDiv = document.getElementById('player');
    for(let item in player) {
        if(!document.getElementById(item)){
            let itemDiv = document.createElement('span');
            itemDiv.id = item;
            itemDiv.innerHTML = `${item}: ${player[item].amount}`;
            playerDiv.appendChild(itemDiv);
        } else {
            document.getElementById(item).innerHTML = `${item}: ${player[item].amount}`;
        }
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
        if(subSkillInformation[subSkillName].active || shouldSkillBeActive(subSkillInformation[subSkillName][sub])) {
            createSubButtons(sub, subSkillName, subSkillInformation);
        }
    }
}

function createSubButtons(sub, subSkillName, subSkillInformation) {
    let subButton = document.createElement('button');
    subButton.innerHTML = sub;
    subButton.onclick = function() {
        if(document.getElementById('subAllows')) {
            removeElementAndChildren('subAllows');
        }
        let subAllows = document.createElement('div');
        subAllows.id = 'subAllows';
        document.getElementById('subSkillScreen').appendChild(subAllows);

        for(let allow in subSkillInformation[subSkillName][sub].allows) {
            let subAllowsButton = document.createElement('button');
            let text = `${allow}`
            for(let reqText in subSkillInformation[subSkillName][sub].allows[allow].required) {
                let val = subSkillInformation[subSkillName][sub].allows[allow].required[reqText];
                text += `</br>${reqText}: ${val}`
            }
            subAllowsButton.innerHTML = text;
            subAllowsButton.onclick = function() {
                craftItem(subSkillInformation[subSkillName][sub].allows[allow].required, allow);
            }
            document.getElementById('subAllows').appendChild(subAllowsButton);
        }
    }
    document.getElementById('subSkillScreen').appendChild(subButton);
}

function craftItem(requiredItems, newItem) {
    let reqContainer = [];
    for(let item in requiredItems) {
        if(player[item] && player[item].amount >= requiredItems[item]) {
            reqContainer.push(true);
        }
    }
    if(reqContainer.length === Object.values(requiredItems).length) {
        for(let item in requiredItems) {
            player[item].amount -= requiredItems[item];
        }
        if(!player[newItem]) {
            player[newItem] = { amount: 0 };
        }
        player[newItem].amount++;
    }
}

function removeElementAndChildren(el) {
    let elName = document.getElementById(el);
    while(elName.firstChild) {
        elName.removeChild(elName.lastChild);
    }
    elName.parentNode.removeChild(elName);
}

function tick() {
    updatePlayer();
    let skillList = updateSkillList();
    checkForNewSkills();
    for(let skill of skillList) {
        createSkillButton(skill);
    }
    let shownElement = document.getElementsByClassName('show');
    if(shownElement[0]) {
        let shownSkill = shownElement[0].id.slice(0, -7);
        createSubSkillButtons(skills[shownSkill])
        
    }
}

function init() {  
    setInterval(function() {
        tick();
    }, 1000)
}

export { createSubSkillScreen }

//gather seeds

//grow crops

//bake apple pie

//create the universe