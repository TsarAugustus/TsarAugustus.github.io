import { skills } from './skills.js';

export function createUI() {
    //Create a holding DIV for all skills
    if(!document.getElementById('skillDiv')) {
        let skillDiv = document.createElement('div');
        skillDiv.id = 'skillDiv';
        document.body.appendChild(skillDiv);
    }

    //Create the skill buttons
    skills.forEach(skill => {
        if(!skill.locked) { createSkillButton(skill) }
    })
}

function createSkillButton(skill) {
    let skillButton = document.getElementById(`${skill.name}Button`)
    if(!skillButton) {
        skillButton = document.createElement('button');
        skillButton.id = `${skill.name}Button`;
        skillButton.addEventListener('click', function() { skillButtonClick(skill) });
        
        document.getElementById('skillDiv').appendChild(skillButton);
    }
    updateSkillButton(skill);
}

function skillButtonClick(skill) {
    skill.currentXP += skill.XPOnClick;
    if(skill.currentXP >= skill.maxXP) {
        skill.level++;
        skill.currentXP = 0;
        skill.maxXP *= 1.6;
    }
    updateSkillButton(skill);
}

function updateSkillButton(skill) {
    let skillButton = document.getElementById(`${skill.name}Button`);
    skillButton.innerHTML = `${skill.name}<br>
                            Level: ${skill.level}<br>
                            ${skill.currentXP}/${skill.maxXP}`;
}