import { skills, shouldSkillBeActive } from './skills.js';
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
        let screenToRemove = document.getElementById('subSkillScreen');
        while(screenToRemove.firstChild) {
            screenToRemove.removeChild(screenToRemove.lastChild)
        }
        screenToRemove.parentNode.removeChild(screenToRemove);
    }

    let subSkillScreen = document.createElement('div');
    subSkillScreen.id = 'subSkillScreen';
    subSkillScreen.classList.add(mainSkill);
    document.getElementById('right').appendChild(subSkillScreen);

    for(let sub in subSkillInformation[subSkillName]) {
        if(subSkillInformation[subSkillName].active || shouldSkillBeActive(subSkillInformation[subSkillName][sub])) {
            let btn = document.createElement('button');
            btn.innerHTML = sub;
            document.getElementById('subSkillScreen').appendChild(btn);
        }
    }
}

function tick() {
    updatePlayer();
    let skillList = updateSkillList();
    checkForNewSkills();
    for(let skill of skillList) {
        createSkillButton(skill);
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