import { Player } from './Player.js';
import { returnButtonInfo } from './returnButtonInfo.js';   
import { checkButtonStatus } from './checkButtonStatus.js';
import { skills } from './skills/skills.js';

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
//category
    //category to sort the skills by


function createCategoryButtons(skill, New) {
    const thisSkillButton = document.getElementById(`${skill.category}Button`);
    if(!thisSkillButton) {
        const categoryButton = document.createElement('button');
        
        categoryButton.id = `${skill.category}Button`;
        categoryButton.innerHTML = skill.category;
        categoryButton.classList.add('New');
        categoryButton.onclick = function() {
            document.getElementById('interaction').innerHTML = '';
            if(categoryButton.classList.contains('New')){
                categoryButton.classList.remove('New')
            }

            const previousFocus = document.getElementsByClassName('CategoryFocus');

            for(let i=0; i<previousFocus.length; i++) {
                previousFocus[i].classList.remove('CategoryFocus');
            }
            categoryButton.classList.add(`CategoryFocus`);
            document.getElementById('skills').innerHTML = '';

            for(let i=0; i<Object.values(skills).length; i++) {
                if(Object.values(skills)[i].category === skill.category && Object.values(skills)[i].active) {
                    createSkillButtons(Object.values(skills)[i])
                }
            }
        }
        document.getElementById('skillCategories').appendChild(categoryButton);
    } else if(New) {

        //gets the name of the CategoryFocus
        const currentCategoryFocus = document.getElementsByClassName('CategoryFocus');
        const currentCategoryFocusName = currentCategoryFocus[0].id.slice(0, -6);
        
        if(skill.category === currentCategoryFocusName) {
            createSkillButtons(skill);

        } else {
            thisSkillButton.classList.add('New');
        }
    }
}

function createSkillButtons(skill) {
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

    for(let skillRequirements in thisSkill.requirements) {
        if(skillRequirements === 'skill') {
            const skillReq = thisSkill.requirements;
            let skillReqCounter = 0;
            for(let items in skillReq) {
                const skillName = Object.keys(skillReq[items]);
                const skillLevel = Object.values(skillReq[items]);
                if(skills[skillName].level >= skillLevel) {
                    skillReqCounter++;
                }
            }
            if(skillReqCounter === Object.keys(skillReq.skill).length) {
                fullSkillCounter++; 
            }
        } else if(skillRequirements === 'item') {
            const itemReq = thisSkill.requirements;
            let itemReqCounter = 0;
            for(let items in itemReq) {
                const itemName = Object.keys(itemReq[items]);
                const itemAmount = Object.values(itemReq[items]);
                if(Player.inventory[itemName] && Player.inventory[itemName].amount>=itemAmount) {
                    itemReqCounter++
                }
            }
            if(itemReqCounter === Object.keys(itemReq.item).length) {
                fullItemCounter++;
            }
        } else if(skillRequirements === 'itemType') {
            const itemTypeReq = thisSkill.requirements.itemType;
            let itemTypeReqCounter = 0;
            for(let items in itemTypeReq) {
                if(findItemTypeOnPlayer(items)) {
                    itemTypeReqCounter++;
                }
            }
            if(itemTypeReqCounter === Object.keys(itemTypeReq).length) {
                fullItemCounter++;
            }
        }
    }

    if(Object.keys(thisSkill.requirements).length === fullSkillCounter+fullItemCounter){
        thisSkill.active = true;
        createCategoryButtons(thisSkill, true)
    }
}

function findItemTypeOnPlayer(itemType) {
    for(let items in Player.inventory) {
        if(Player.inventory[items].category && Player.inventory[items].category === itemType) {
            return true
        }
    }
    return false;
}

function checkSkills() {
    for(let skill in skills) {
        const thisSkill = skills[skill];
        if(thisSkill.active) {
            createCategoryButtons(thisSkill);
        } else {
            checkIfSkillShouldBeActive(thisSkill);
        }
    }
}

function tick() {
    checkSkills();
    const viewedMainSkill = document.getElementsByClassName('ViewedSkill')
    const viewedSubSkill = document.getElementsByClassName('ViewedSubSkill');
    if(viewedSubSkill.length > 0) {
        const mainSkillName = viewedMainSkill[0].id.slice(0, -6).replace(/-/g, ' ');
        const subSkillName = viewedSubSkill[0].id.slice(0, -6).replace(/-/g, ' ');
        for(let item in skills[mainSkillName].craftItems[subSkillName]) {
            checkButtonStatus(skills[mainSkillName], subSkillName, item)
        }
    }
}

function init() {
    console.log('Initialized');
    checkSkills();
    setInterval(function() {
        tick();
    }, 1000)
}

window.onload = function() {
    init();
}