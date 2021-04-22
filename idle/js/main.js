import { Player } from './Player.js'; 
import { checkButtonStatus } from './checkButtonStatus.js';
import { skills } from './skills/skills.js';
import { updateInventory } from './updateInventory.js';
import { ticker } from './ticker.js';

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
    if(!document.getElementById(`${skill.displayName}ButtonDiv`)) {

        const newSkillButtonDiv = document.createElement('div');
        newSkillButtonDiv.id = `${skill.displayName}ButtonDiv`;
        newSkillButtonDiv.classList.add('skill')

        const newSkillButton = document.createElement('button');
        newSkillButton.id = `${skill.displayName}Button`;
        newSkillButton.innerHTML = `${skill.displayName}<br>
                                    Level: ${skill.level}`;
        newSkillButton.onclick = skill.onclick;
        
        //progress bar stuff
        const newSkillBarWrapper = document.createElement('div');
        newSkillBarWrapper.id = `${skill.displayName}BarWrapper`;
        newSkillBarWrapper.classList.add('BarWrapper');

        const newSkillBarInfo = document.createElement('span');
        newSkillBarInfo.id = `${skill.displayName}BarInfo`;
        newSkillBarInfo.innerHTML = `${Math.round(skill.currentXP * 10) / 10}/${Math.round(skill.XPToLevel * 10) / 10} ${(skill.XPThisClick ? `+${skill.XPThisClick}` : '')}`;
        
        newSkillBarInfo.classList.add('SkillInfo');
        newSkillBarWrapper.appendChild(newSkillBarInfo);

        const newSkillBar = document.createElement('div');
        newSkillBar.id = `${skill.displayName}Bar`;
        newSkillBar.classList.add('bar');
        newSkillBarWrapper.appendChild(newSkillBar);

        const width = (skill.currentXP / skill.XPToLevel) * 100;
        newSkillBar.style.width = `${width}%`;

        newSkillButtonDiv.appendChild(newSkillButton);
        newSkillButtonDiv.appendChild(newSkillBarWrapper)
        document.getElementById('skills').appendChild(newSkillButtonDiv);
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

function calculateMigrationThresh() {
    const base = 0.9;
    let additiveThresh = 0;
    for(let item in Player.inventory) {
        if(Player.inventory[item].category === 'Well') {
            additiveThresh += Player.inventory[item].amount * Player.inventory[item].efficiency;
        }
        if(Player.inventory[item].category === "House") {
            additiveThresh += Player.Nation.maxPopulation - Player.Nation.population;
        }
    }

    let newThresh = Math.log(additiveThresh) / 10;
    if(!isFinite(newThresh)) {
        newThresh = 0;
    }

    return base - newThresh;
}

function populationLeech() {
    let populationEmigration = 0;
    if(!Player.Well) {
        populationEmigration += Player.Nation.population;
    } else if (Player.Well && Player.Well.current === 0 || Player.Well.change < 0) {
        populationEmigration += Player.Nation.population;
    }
    if(populationEmigration >= Player.Nation.population) {
        Player.Nation.population--;
        if(Player.Nation.population < 0) {
            Player.Nation.population = 0;
        }
        ticker('I should build a Well to increase immigration');
    } else {
        ticker('I should look to expand our Nations skills and resources.')
    }
}

function tick() {
    checkSkills();
    const viewedMainSkill = document.getElementsByClassName('ViewedSkill')
    const viewedSubSkill = document.getElementsByClassName('ViewedSubSkill');
    if(viewedSubSkill.length > 0) {
        const mainSkillName = viewedMainSkill[0].id.slice(0, -6).replace(/-/g, ' ');
        const subSkillName = viewedSubSkill[0].id.slice(0, -6).replace(/-/g, ' ');
        for(let i=0; i<=skills[mainSkillName].level; i++) {
            checkButtonStatus(skills[mainSkillName], subSkillName, undefined, i, true);
        }
    }

    if(Player.Well && Player.Well.current < Player.Well.capacity) {
        //this should be handled better when Firemaking is added.
        let wellDefault = 0;
        for(let item in Player.inventory) {
            if(Player.inventory[item].category === 'Well') {
                wellDefault = Player.inventory[item].amount * Player.inventory[item].efficiency;
            }
        }

        const oldCurrent = Player.Well.current;
        Player.Well.current += (wellDefault - (Math.floor(Player.Nation.population * 10) / 100));
        Player.Well.change = Player.Well.current - oldCurrent;
        
        if (Player.Well && Player.Well.current > Player.Well.capacity) {
            Player.Well.current = Player.Well.capacity;
        }
    } else if (Player.Well && Player.Well.current > Player.Well.capacity) {
        Player.Well.current = Player.Well.capacity;
    }

    if(Player.Nation.maxPopulation > Player.Nation.population) {
        const migrationChance = Math.random();
        const migrationThresh = calculateMigrationThresh();
        populationLeech();
        if(migrationChance > migrationThresh) {
            Player.Nation.population++;
        }
    }
    
    updateInventory();
    checkNation(true);
}

function checkNation(tick) {
    const nationTitles = [
        //Rural
        {name: "Roadhouse", population: 0},
        {name: "Homestead", population: 5},
        {name: "Neighbourhood", population: 25},
        {name: "Band", population: 50},
        {name: "Hamlet", population: 100},
        {name: "Tribe", population: 125},
        {name: "Village", population: 150},

        //Low Density
        {name:"Locality", population: 250},
        {name: "Suburb", population: 500},
        {name: "Township", population: 1000},
        {name: "Subdistrict", population: 10000},
        {name: "Shire", population: 50000},
        {name: "Town", population: 100000},

        //Medium Density
        {name: "Borough", population: 125000},
        {name: "District", population: 175000},
        {name: "County", population: 200000},
        {name: "Prefecture", population: 300000},
        {name: "City", population: 500000},
        {name: "Regiopolis", population: 850000},

        //High Density
        {name: "Municipality", population: 1000000},
        {name: "Metropolis", population: 3000000},
        {name: "Conurbation", population: 4000000},
        {name: "Global City", population: 5500000},
        {name: "Megacity", population: 7000000},
        {name: "Megalopolis", population: 10000000},

        //Extreme Density
        {name: "Ecumenopolis", population: 1000000000}
        
    ];

    if(!Player.Nation) {
        Player.Nation = {
            name: '',
            population: 0,
            maxPopulation: 0
        };
    }
    if(Player.Nation.name === '') {
        let nationName = prompt('What is the name of your Nation?');
        Player.Nation.name = nationName;
        let nationTitle; 
        for(let title in nationTitles) {
            if(Player.Nation.population >= nationTitles[title].population) {
                nationTitle = nationTitles[title].name;
            }
        }
        const nationNameHeader = document.createElement('p');
        nationNameHeader.id = 'NationNameHeader';
        nationNameHeader.innerHTML = `The ${nationTitle} of ${nationName}`;
        document.getElementById('nation').appendChild(nationNameHeader)
    }
    if(tick) {
        let nationTitle;
        for(let title in nationTitles) {
            if(Player.Nation.population >= nationTitles[title].population) {
                nationTitle = nationTitles[title].name;
            }
        }
        document.getElementById('NationNameHeader').innerHTML = `The ${nationTitle} of ${Player.Nation.name}`;
    }
}

function init() {
    console.log('Initialized');
    checkSkills();
    checkNation();
    ticker('I should Forage for materials.')
    setInterval(function() {
        tick();
    }, 1000)
}

window.onload = function() {
    init();
}