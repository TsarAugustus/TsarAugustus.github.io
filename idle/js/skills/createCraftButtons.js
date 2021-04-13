import { checkButtonStatus } from '../checkButtonStatus.js';
import { Player } from '../Player.js';
import { updateInventory } from '../updateInventory.js';

function createItemButtonOnClickFunction(skill, item, subCraft) {
    let craftCounter = 0;
    const craftRequirementNumber = Object.keys(skill.craftItems[subCraft][item].requirements).length;
    const itemReq = skill.craftItems[subCraft][item].requirements;
    for(let req in skill.craftItems[subCraft][item].requirements) {
        const inventoryItem = Player.inventory[req];
        if(inventoryItem && inventoryItem.amount >= itemReq[req]) {
            craftCounter++;
        }
    }
    if(craftCounter === craftRequirementNumber) {
        for(let thisItem in skill.craftItems[subCraft][item].requirements) {
            Player.inventory[thisItem].amount -= itemReq[thisItem];
        }
        if(!Player.inventory[item]) {
            Player.inventory[item] = {
                amount: 0,
                type: (skill.craftItems[subCraft][item].type ? skill.craftItems[subCraft][item].type : 'Crafts'),
                category: (skill.craftItems[subCraft][item].category ? skill.craftItems[subCraft][item].category : false)
            }
        }
        Player.inventory[item].amount++;
        updateInventory();
    }
    checkButtonStatus(skill, subCraft, item, true);
}

function createSubCraftItemButtons(item, skill, subCraft) {
    const itemName = item.replace(/\s+/g, '-');
    const thisSubCraftButton = document.getElementById(`${subCraft.replace(/\s+/g, '-')}Button`);
    if(!document.getElementById(`${itemName}Button`) && thisSubCraftButton.classList.contains('ViewedSubSkill')) {
        const newItemButton = document.createElement('button');
        newItemButton.id = `${itemName}Button`;
        newItemButton.innerHTML = item;
        
        //appends requirement info for craft
        for(let attributes in skill.craftItems[subCraft][item].requirements) {
            if(attributes !== 'type' && attributes !== 'category') {
                newItemButton.innerHTML += `<br>${attributes}: ${skill.craftItems[subCraft][item].requirements[attributes]}`;
            }
        }
        
        newItemButton.onclick = function() {
            createItemButtonOnClickFunction(skill, item, subCraft);
        }
        
        const subCraftItemsDiv = document.getElementById('subCraftItemsDiv');
        subCraftItemsDiv.appendChild(newItemButton)
        checkButtonStatus(skill, subCraft, item);
    }
}

function subCraftButtonLogic(subCraft, skill) {
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
    
    for(let item in skill.craftItems[subCraft]) {
        createSubCraftItemButtons(item, skill, subCraft);
    }
}

function createSubCraftCategoryButtons(subCraft, skill) {
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
            subCraftButtonLogic(subCraft, skill)
        }
        
        subCraftDiv.appendChild(newSubCraftButton);
    }
}

export function createCraftButtons(skill) {
    for(let subCraft in skill.craftItems) {
        createSubCraftCategoryButtons(subCraft, skill);
    }
}