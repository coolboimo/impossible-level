// levelGenerator.js
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const fs = require('fs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import levels from your levels.js file
import { levels } from '../data/levels.js';

function generateHtmlTemplate(level, index) {
    return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${level.name}</title>
                <link rel="stylesheet" href="../../styles/level.css">
                <link rel="stylesheet" href="../../styles/header.css">
                <link rel="stylesheet" href="../../styles/general.css">
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Gamja+Flower&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </head>
            <body>
                <header class="js-header-content"></header>
                <main>
                    <div class="level-info">
                        <div class="level-thumbnail-container">
                            <h1>${level.name}</h1>
                            <p><span data-i18n="by">By</span> ${level.creator}</p>
                            <div class="level-video-container">
                                <iframe  
                                    src="https://www.youtube.com/embed/${level.videoCode}"
                                    title="YouTube video player" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                        <div class="level-info-content">
                            <div class="rank-box">
                                <span class="span-title" data-i18n="title">Rank</span>
                                <span class="span-info">${index + 1}</span>
                            </div>
                            <div class="id-box">
                                <span class="span-title" data-i18n="id">ID</span>
                                <span class="span-info">${level.id}</span>
                            </div>
                            <div class="fps-box">
                                <span class="span-title" data-i18n="fps">FPS</span>
                                <span class="span-info">${level.fps}</span>
                            </div>
                            <div class="music-box">
                                <span class="span-title" data-i18n="song">Song</span>
                                <span class="span-info">${level.music}</span>
                            </div>
                            <div class="record-box">
                                <span class="span-title" data-i18n="worldRecord">World Record</span>
                                <span class="span-info">${level.worldRecord}</span>
                            </div>
                        </div>
                    </div>
                </main>
                <script type="module" src="../../scripts/headerFunctions.js"></script>
            </body>
            </html>`;
}

function createLevelPages() {
    try {
        const outputDir = join(__dirname, '../html/levels');
        
        // Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log(`Created directory: ${outputDir}`);
        }

        // Create HTML files for each 
        levels.forEach((level, index) => {
            const filePath = join(outputDir, `${index + 1}.html`);
            fs.writeFileSync(filePath, generateHtmlTemplate(level, index), 'utf8');
            console.log(`Created level page: ${index + 1}.html`);
        });

        console.log(`\nSuccessfully created ${levels.length} level pages in ${outputDir}`);
    } catch (error) {
        console.error('Error creating level pages:', error.message);
    }
}

// Create the level pages
createLevelPages();