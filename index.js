console.log("Script loaded");

let jsonData;  // Declare jsonData variable outside the DOMContentLoaded callback

function testFunction() {
    console.log("Test function called");
}

function autoFill() {
    const searchBox = document.getElementById('searchBox');
    const autoFillContainer = document.getElementById('autoFillContainer');

    autoFillContainer.innerHTML = '';

    if (searchBox.value.trim() !== '') {
        const searchValue = searchBox.value.toLowerCase();
        const suggestions = jsonData.filter(entry => entry.name.toLowerCase().includes(searchValue));

        suggestions.forEach(entry => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = entry.name;
            suggestionItem.addEventListener('click', () => fillSearchBox(entry.name));
            autoFillContainer.appendChild(suggestionItem);
        });
    }
}

function fillSearchBox(value) {
    document.getElementById('searchBox').value = value;
    document.getElementById('autoFillContainer').innerHTML = '';
    document.getElementById('videoName').textContent = value;
    translateVideo();
}

function translateVideo() {
    const searchBox = document.getElementById('searchBox');
    const videoLinkContainer = document.getElementById('videoLinkContainer');

    const searchValue = searchBox.value.toLowerCase();
    const selectedEntry = jsonData.find(entry => entry.name.toLowerCase() === searchValue);

    videoLinkContainer.innerHTML = '';

    if (selectedEntry) {
        const videoElement = document.createElement('video');
        videoElement.src = selectedEntry.videolink;
        videoElement.controls = true;
        videoLinkContainer.appendChild(videoElement);
    } else {
        videoLinkContainer.innerHTML = '<p>Video not found for the entered name.</p>';
    }
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
