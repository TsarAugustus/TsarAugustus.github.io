import { Player } from '../../Player.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';
import { checkTools } from '../checkTools.js';

export let Farming = {
    displayName: 'Farming',
    active: true,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    XPOnClick: 25,
    XPClickBonus: 1,
    XPThisClick: 0,
    category: 'Agriculture',
    collectable: items,
    onclick: function() {
        const interactionDiv = document.getElementById('interaction');
        if(!document.getElementById('FarmingStuff')) {
            const farmingStuffDiv = document.createElement('div');
            farmingStuffDiv.id = 'FarmingStuff';
            interactionDiv.appendChild(farmingStuffDiv);
        }
        const farmingStuffDiv = document.getElementById('FarmingStuff');

        if(!document.getElementById('CreatePlot')) {
            const plotThresh = 1;
            const createPlot = document.createElement('button');
            createPlot.id = 'CreatePlot';
            createPlot.innerHTML = `<b>Create Plot</b><br>
                                    Cost: ${plotThresh} Free Land`;
            createPlot.onclick = function() {
                if(Player.inventory['Free Land'] && Player.inventory['Free Land'].amount >= plotThresh) {
                    if(!Player.inventory['Arable Land']) {
                        Player.inventory['Arable Land'] = { amount: 0, type: 'Land' }
                    }
                    Player.inventory['Arable Land'].amount++;
                    Player.inventory['Free Land'].amount--;
                }
                
                updateInventory();
            }
            farmingStuffDiv.appendChild(createPlot);
        }
        function createFarmPlot() {
            if(!document.getElementById('FarmPlot')) {
                const farmPlot = document.createElement('button');
                farmPlot.id = 'FarmPlot';
                farmPlot.innerHTML = `<b>Farm Plot</b><br>
                                        Cost: 1 Seed`;
                farmPlot.onclick = function() {
                    if(Player.inventory['Seed'] && Player.inventory['Seed'].amount >= 1) {
                        if(!Player.inventory['Wheat']) {
                            Player.inventory['Wheat'] = { amount: 0, type: 'Food' }
                        }
                        Player.inventory['Wheat'].amount++;
                        Player.inventory['Seed'].amount--;
                    }
                }
                farmingStuffDiv.appendChild(farmPlot);
            }
        }
    }
};

Farming.XPThisClick = Farming.XPOnClick + (Farming.XPClickBonus * checkTools('', '') / 10);