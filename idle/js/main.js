let Player = {
    inventory: {}
};

//displayName
    //sets the display name for the skill button
//active
    //gets checked against its requiremnts
//level/currentXP/XPToLevel
    //updates when skill is used, might be fun to have the...
    //XPToLevel randomly generate 1.55-1.65ish
//onclick
    //the function that will run the skill
//requirements
    //skill: skill requirements require skills to be at a certain level before activating
    //item: item requirements require items to exists in the Players inventory before activating    


let skills = {
    Forage: {
        displayName: 'Forage',
        active: true,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        onclick: function() {
            thisSkill = skills.Forage;
            thisSkill.currentXP += 25;
            if(thisSkill.currentXP >= thisSkill.XPToLevel) {
                thisSkill.level++;
                thisSkill.currentXP = 0;
                thisSkill.XPToLevel *= 2;
            }
            if(!Player.inventory.Seed) {
                Player.inventory.Seed = { amount: 0 };
            }
            Player.inventory.Seed.amount++;

            updateButton(thisSkill);
        }
    },
    Woodcutting: {
        displayName: 'Woodcutting',
        active: undefined,
        level: 0,
        currentXP: 0,
        XPToLevel: 100,
        requirements: {
            skill: { Forage: 2 },
            item: { Seed: 5}
        },
        onclick: function() {
            
        }
    }
    // Farming: {
    //     displayName: 'Farming',
    //     active: undefined,
    //     level: 0,
    //     currentXP: 0,
    //     XPToLevel: 100,
    //     requirements: {
    //         item: { Seed: 1 }
    //     },
    //     onclick: function() {
            
    //     }
    // }
}

function updateButton(skill) {
    const skillButton = document.getElementById(`${skill.displayName}Button`);
    const skillButtonInfo = returnButtonInfo(skill);
    skillButton.innerHTML = skillButtonInfo.innerHTML;
}

function returnButtonInfo(skill, init) {
    const newSkillButton = {};
    newSkillButton.id = `${skill.displayName}Button`;
    newSkillButton.innerHTML = `${skill.displayName}<br> 
                                Level: ${skill.level}<br>
                                ${skill.currentXP}/${skill.XPToLevel}`;
    
    if(init) {
        newSkillButton.onclick = skill.onclick;
    }
    return newSkillButton;
}

function createSkillButton(skill) {
    if(!document.getElementById(`${skill.displayName}Button`)) {
        const buttonInfo = returnButtonInfo(skill, true);
        const newSkillButton = document.createElement('button');

        newSkillButton.id = buttonInfo.id;
        newSkillButton.innerHTML = buttonInfo.innerHTML;
        newSkillButton.onclick = buttonInfo.onclick;

        document.getElementById('skills').appendChild(newSkillButton);
    }
}

function checkIfSkillShouldBeActive(thisSkill) {
    let fullSkillCounter = 0;
    let fullItemCounter = 0;
    for(let k=0; k<Object.keys(thisSkill.requirements).length; k++) {
        if(Object.keys(thisSkill.requirements)[k] === 'skill') {
            const skillReq = thisSkill.requirements;
            let skillReqCounter = 0;
            for(let j=0; j<Object.keys(skillReq.skill).length; j++) {
                const skillName = Object.keys(skillReq.skill)[j];
                const skillLevel = Object.values(skillReq.skill)[j]
                if(skills[skillName].level >= skillLevel) {
                    skillReqCounter++;
                }
            }
            if(skillReqCounter === Object.keys(skillReq.skill).length) {
                fullSkillCounter++;
            }
        } else if(Object.keys(thisSkill.requirements)[k] === 'item') {
            const itemReq = thisSkill.requirements;
            let itemReqCounter = 0;
            for(let j=0; j<Object.keys(itemReq.item).length; j++) {
                const itemName = Object.keys(itemReq.item)[j];
                const itemAmount = Object.values(itemReq.item)[j];
                if(Player.inventory[itemName] && Player.inventory[itemName].amount>=itemAmount) {
                    itemReqCounter++
                }
            }
            if(itemReqCounter === Object.keys(itemReq.item).length) {
                fullItemCounter++;
            }
        }
    }
    if(Object.keys(thisSkill.requirements).length === fullSkillCounter+fullItemCounter){
        thisSkill.active = true;
    }
}

function checkSkills() {
    for(let i=0; i<Object.keys(skills).length; i++) {
        const thisSkill = Object.values(skills)[i];
        if(thisSkill.active) {
            createSkillButton(thisSkill);
        } else {
            checkIfSkillShouldBeActive(thisSkill);
        }
    }
}

function tick() {
    checkSkills();
}

function init() {
    console.log('Initialized');
    setInterval(function() {
        tick();
    }, 1000)
}

window.onload = function() {
    init();
}