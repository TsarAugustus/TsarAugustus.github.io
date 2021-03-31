import { returnButtonInfo } from './returnButtonInfo.js';

export function updateButton(skill) {
    const skillButton = document.getElementById(`${skill.displayName}Button`);
    const skillButtonInfo = returnButtonInfo(skill);
    skillButton.innerHTML = skillButtonInfo.innerHTML;
};