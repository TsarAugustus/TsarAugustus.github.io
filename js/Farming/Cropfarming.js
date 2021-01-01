import { Seeding } from './Cropfarming/Seeding.js';

export let Cropfarming = {
    name: 'Cropfarming',
    parentSkill: 'Farming',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: {
        level: {
            Foraging: 2
        }
    },
    Cropfarming: {
        Seeding
    }
}