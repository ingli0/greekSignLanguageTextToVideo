console.log("Script loaded");

let jsonData;
let selectedWords = [];

function autoFill() {
    const searchBox = document.getElementById('searchBox');
    const autoFillContainer = document.getElementById('autoFillContainer');
    const translateButton = document.getElementById('translateButton');

    autoFillContainer.innerHTML = '';

    if (searchBox.value.trim() !== '') {
        const searchValue = searchBox.value.toLowerCase();
        const suggestions = jsonData.filter(entry => entry.name.toLowerCase().includes(searchValue));

        suggestions.forEach(entry => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = entry.name;
            suggestionItem.addEventListener('click', () => toggleSelect(entry.name));
            autoFillContainer.appendChild(suggestionItem);
        });

        // Show the translate button when there are search results
        translateButton.style.display = 'inline-block';
    } else {
        // Hide the translate button when the search box is empty
        translateButton.style.display = 'none';
    }
}

function toggleSelect(word) {
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(selectedWord => selectedWord !== word);
    } else {
        selectedWords.push(word);
    }

    // Display selected words in the 'selectedWords' div
    const selectedWordsDiv = document.getElementById('selectedWords');
    selectedWordsDiv.innerHTML = selectedWords.map(word => `<span>${word}</span>`).join(', ');

    console.log('Selected words:', selectedWords);
}


function translateVideo() {
    const videoLinkContainer = document.getElementById('videoLink');

    // Clear existing content
    videoLinkContainer.innerHTML = '';

    // Add some space at the top of videoLinkContainer
    videoLinkContainer.style.marginTop = '40px';

    selectedWords.forEach(word => {
        const selectedEntry = jsonData.find(entry => entry.name.toLowerCase() === word.toLowerCase());

        if (selectedEntry) {
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `<h3>${word}</h3><video src="${selectedEntry.videolink}" controls></video>`;
            videoLinkContainer.appendChild(videoElement);
        }
    });

    if (selectedWords.length === 0) {
        videoLinkContainer.innerHTML = '<p>No words selected.</p>';
    }

    // Scroll to the top of videoLinkContainer
    videoLinkContainer.scrollIntoView({ behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', () => {
    fetch('/extracted_data.json')
        .then(response => response.json())
        .then(data => {
            jsonData = data;
            autoFill();
        })
        .catch(error => console.error('Error fetching JSON:', error));

    document.getElementById('searchBox').addEventListener('input', autoFill);
    document.getElementById('translateButton').addEventListener('click', translateVideo);
});
