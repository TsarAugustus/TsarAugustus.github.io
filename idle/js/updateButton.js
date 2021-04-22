export function updateButton(skill) {
    const skillButton = document.getElementById(`${skill.displayName}Button`);
    skillButton.innerHTML = `${skill.displayName}<br>
                            Level: ${skill.level}`;

    const skillInfo = document.getElementById(`${skill.displayName}BarInfo`);
    skillInfo.innerHTML = `${Math.round(skill.currentXP * 10) / 10}/${skill.XPToLevel} ${(skill.XPThisClick ? `+${skill.XPThisClick}` : '')}`;
    
    const skillBar = document.getElementById(`${skill.displayName}Bar`);
    const width = (skill.currentXP / skill.XPToLevel) * 100;
    skillBar.style.width = `${width}%`;
};