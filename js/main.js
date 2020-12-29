import { skills, updateProgressBar, updateSkillList, createSkillButton, createSubSkillButtons, checkForNewSkills} from './skills.js';
import { player } from './player.js';

window.onload = function() {
    init();
}

function updatePlayer() {
    let playerDiv = document.getElementById('player');
    for(let item in player) {
        if(!document.getElementById(item)) {
            console.log(player[item])
            if(!document.getElementById(player[item].type + 'InventoryWrapper')) {
                let typeDiv = document.createElement('div');
                typeDiv.id = player[item].type + 'InventoryWrapper';
                let header = document.createElement('h3');
                header.innerHTML = player[item].type;
                typeDiv.appendChild(header)
                playerDiv.appendChild(typeDiv);
            }
            
            let itemDiv = document.createElement('span');
            itemDiv.id = item;
            itemDiv.innerHTML = `${item}: ${player[item].amount}`;
            
            document.getElementById(player[item].type + 'InventoryWrapper').appendChild(itemDiv);
        } else {
            document.getElementById(item).innerHTML = `${item}: ${player[item].amount}`;
        }
    }
}

function tick() {
    updatePlayer();
    let skillList = updateSkillList();
    checkForNewSkills();
    for(let skill of skillList) {
        createSkillButton(skill);
        // updateProgressBar(skill);
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

export {  }

//gather seeds

//grow crops

//bake apple pie

//create the universe