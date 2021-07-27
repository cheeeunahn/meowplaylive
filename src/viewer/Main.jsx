import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './component/App';

function runApp(RootElement) {
    ReactDOM.render(<App />, RootElement);
}

// Run the app on YouTube. (Chrome extension)
function runAppOnYouTube() {
    const YouTubeColumns = document.querySelector('#columns');
    let isHTMLInjected = false;

    // When we click 'inject' button on the popup,
    // render our app on YouTube.
    chrome.runtime.onMessage.addListener((request) => {
        if (request === 'goyangi-inject-html') {
            if (!isHTMLInjected) {
                const RootElement = document.createElement('div');
                YouTubeColumns.appendChild(RootElement);
                isHTMLInjected = true;
                runApp(RootElement);
            }
        }
    });
}

// Run the app on public/human/app/standalone.html (for testing).
function runAppOnTestFile() {
    runApp(document.querySelector('.goyangi'));
}

// Check whether we're running on YouTube (i.e Chrome extension mode).
if (location.hostname.includes('www.youtube.com')) {
    runAppOnYouTube();
} else {
    runAppOnTestFile();
}
