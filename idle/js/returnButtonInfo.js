export function returnButtonInfo(skill, init) {
    const newSkillButton = {};
    newSkillButton.id = `${skill.displayName}Button`;
    newSkillButton.innerHTML = `${skill.displayName}<br> 
                                Level: ${skill.level}<br>
                                ${skill.currentXP}/${skill.XPToLevel}`;
    
    if(init) {
        newSkillButton.onclick = skill.onclick;
    }
    return newSkillButton;
};