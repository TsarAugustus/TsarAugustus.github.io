export function ticker(info) {
    const tickerDiv = document.getElementById('ticker');
    if(!document.getElementById('tickInfo')) {
        const tickInfo = document.createElement('p');
        tickInfo.id = 'tickInfo';
        tickInfo.classList.add('tickInfo')
        tickerDiv.appendChild(tickInfo);
    }
    
    const tickInfo = document.getElementById('tickInfo');
    tickInfo.innerHTML = info;
}