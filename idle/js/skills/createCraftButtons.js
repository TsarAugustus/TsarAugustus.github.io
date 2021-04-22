import { checkButtonStatus } from '../checkButtonStatus.js';
import { Player } from '../Player.js';
import { updateInventory } from '../updateInventory.js';
import { updateButton } from '../updateButton.js';

function createItemButtonOnClickFunction(skill, item, subCraft, level) {
    let craftCounter = 0;
    const craftRequirementNumber = Object.keys(skill.craftItems[level][subCraft][item].requirements).length;
    const itemReq = skill.craftItems[level][subCraft][item].requirements;
    for(let req in skill.craftItems[level][subCraft][item].requirements) {
        const inventoryItem = Player.inventory[req];
        if(inventoryItem && inventoryItem.amount >= itemReq[req]) {
            craftCounter++;
        }
    }
    if(craftCounter === craftRequirementNumber) {
        for(let thisItem in skill.craftItems[level][subCraft][item].requirements) {
            Player.inventory[thisItem].amount -= itemReq[thisItem];
        }
        //deals with wells and fires
        const thisItem = skill.craftItems[level][subCraft][item];
        if(thisItem.capacity) {
            if(thisItem.category === 'House') {
                Player.Nation.maxPopulation += thisItem.capacity;
            } else if(thisItem.category === 'Well') {
                if(!Player.Well) {
                    Player.Well = {
                        current: 0,
                        change: 0,
                        capacity: 0
                    }
                }
                Player.Well.change = thisItem.change;
                Player.Well.capacity += thisItem.capacity;
            }
        }


        if(!Player.inventory[item]) {
            Player.inventory[item] = {
                amount: 0,
                type: (skill.craftItems[level][subCraft][item].type ? skill.craftItems[level][subCraft][item].type : 'Crafts'),
                category: (skill.craftItems[level][subCraft][item].category ? skill.craftItems[level][subCraft][item].category : false),
                efficiency: (skill.craftItems[level][subCraft][item].efficiency ? skill.craftItems[level][subCraft][item].efficiency : 0)
            }   
        }
        Player.inventory[item].amount++;
        skill.currentXP += skill.craftItems[level][subCraft][item].XP;
        if(skill.currentXP >= skill.XPToLevel) {
            skill.level++;
            const remainder = Math.round(skill.currentXP - skill.XPToLevel);
            skill.currentXP = 0;
            skill.currentXP += remainder;
            skill.XPToLevel *= 1.6;
            if(skill.craftItems[skill.level]) {
                for(let craftName in skill.craftItems[skill.level]) {
                    createSubCraftCategoryButtons(craftName, skill, skill.level);
                }
            }
        }
        updateButton(skill);
        updateInventory();
    }
    checkButtonStatus(skill, subCraft, item, level, true);
}

function createSubCraftItemButtons(item, skill, subCraft, level) {
    const itemName = item.replace(/\s+/g, '-');
    const thisSubCraftButton = document.getElementById(`${subCraft.replace(/\s+/g, '-')}Button`);
    if(!document.getElementById(`${itemName}Button`) && thisSubCraftButton.classList.contains('ViewedSubSkill')) {
        const newItemButton = document.createElement('button');
        newItemButton.id = `${itemName}Button`;
        let newItemButtonString = ``;
        newItemButtonString += `<b>${item}</b>`;
        
        //appends requirement info for craft
        for(let attributes in skill.craftItems[level][subCraft][item].requirements) {
            if(attributes !== 'type' && attributes !== 'category') {
                newItemButtonString += `<br>${attributes}: ${skill.craftItems[level][subCraft][item].requirements[attributes]}`;
            }
        }
        newItemButton.innerHTML = newItemButtonString;
        
        newItemButton.onclick = function() {
            createItemButtonOnClickFunction(skill, item, subCraft, level);
            updateInventory()
        }
        
        const subCraftItemsDiv = document.getElementById('subCraftItemsDiv');
        subCraftItemsDiv.appendChild(newItemButton)
        checkButtonStatus(skill, subCraft, item, level);
    }
}

function subCraftButtonLogic(subCraft, skill, level) {
    const subCraftItemsDiv = document.getElementById('subCraftItemsDiv');
    
    const thisButton = document.getElementById(`${subCraft.replace(/\s+/g, '-')}Button`);
    
    thisButton.classList.toggle('ViewedSubSkill');
    const previousViewedSubSkill = document.getElementsByClassName('ViewedSubSkill');
    for(let button of previousViewedSubSkill) {
        if(button != thisButton) {
            button.classList.remove('ViewedSubSkill');
        }
    }
    if(!thisButton.classList.contains('ViewedSubSkill')) {
        document.getElementById('subCraftItemsDiv').remove();
    }
    
    if(!subCraftItemsDiv) {
        const interactionDiv = document.getElementById('interaction');
        const subCraftItemsDiv = document.createElement('div');
        subCraftItemsDiv.id = 'subCraftItemsDiv';
        interactionDiv.appendChild(subCraftItemsDiv);
    }
    
    for(let item in skill.craftItems[level][subCraft]) {
        createSubCraftItemButtons(item, skill, subCraft, level);
    }
}

function createSubCraftCategoryButtons(subCraft, skill, level) {
    const interactionDiv = document.getElementById('interaction');
    const subCraftDiv = document.getElementById('subCraftDiv');
    const subCraftName = subCraft.replace(/\s+/g, '-');

    if(!subCraftDiv) {
        const newSubCraftDiv = document.createElement('div');
        newSubCraftDiv.id = 'subCraftDiv';
        interactionDiv.appendChild(newSubCraftDiv);
    }
    
    if(!document.getElementById(`${subCraftName}Button`)) {
        //idk why I have to declare this again inside here
        //if i dont, it wont append the button
        //ces't la vie
        const subCraftDiv = document.getElementById('subCraftDiv');
        const newSubCraftButton = document.createElement('button');
        newSubCraftButton.id = `${subCraftName}Button`;
        newSubCraftButton.classList.add('subCraft')
        newSubCraftButton.innerHTML = `${subCraft}`;
        
        
        newSubCraftButton.onclick = function() {
            const subCraftItemsDiv = document.getElementById('subCraftItemsDiv');
            if(subCraftItemsDiv) {
                while(subCraftItemsDiv.lastChild) {
                    subCraftItemsDiv.removeChild(subCraftItemsDiv.lastChild);
                }
            }
            subCraftButtonLogic(subCraft, skill, level)
        }
        
        subCraftDiv.appendChild(newSubCraftButton);
    }
}

export function createCraftButtons(skill) {
    for(let subCraftLevel in skill.craftItems) {
        if(skill.level >= parseInt(subCraftLevel)) {
            for(let craft in skill.craftItems[subCraftLevel]) {
                createSubCraftCategoryButtons(craft, skill, parseInt(subCraftLevel));
            }
        }
    }
}