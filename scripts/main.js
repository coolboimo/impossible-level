import {levels} from "../data/levels.js";

let mainContent = document.querySelector(".js-main-content");
const searchBox = document.querySelector(".search-box");
const searchButton = document.getElementById("searchButton");

function renderLevels(filteredLevels) {
    if (filteredLevels.length === 0) {
        mainContent.innerHTML = '<h3 class="no-results">No matches found</h3>';
        return;
    }

    let levelsHTML = '';
    filteredLevels.forEach(level => {
        const originalIndex = levels.findIndex(l => l.codename === level.codename);
        
        levelsHTML += `
            <a href="levels/${(originalIndex + 1)}.html">
                <div class="level-tag">
                    <div class="photo-container">
                        <img src="images/${level.codename}.png">
                    </div>
                    <div class="name-tag-container">
                        <h2>#${(originalIndex + 1)} - ${level.name}</h2>
                        <h5>${level.creator}</h5>
                    </div>
                </div>
            </a>
        `;
    });
    
    mainContent.innerHTML = levelsHTML;
}

function searchLevels(searchTerm) {
    if (!searchTerm) {
        renderLevels(levels);
        return;
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    const filteredLevels = levels.filter(level => {
        const firstWord = level.name.toLowerCase().split(' ')[0];
        return firstWord.startsWith(searchTermLower);
    });
    
    renderLevels(filteredLevels);
}

searchBox.addEventListener('input', (e) => {
    searchLevels(e.target.value);
});

searchButton.addEventListener('click', () => {
    const searchTerm = searchBox.value;
    searchLevels(searchTerm);
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchBox.value;
        searchLevels(searchTerm);
    }
});

renderLevels(levels);
