let videoData;
let selectedVideos = [];


async function loadVideoData() {
    try {
        const response = await fetch('http://localhost:8080/extracted_data.json');
        if (!response.ok) {
            throw new Error(`Failed to load video data. Status: ${response.status}`);
        }
        videoData = await response.json();
        console.log('Video data loaded successfully:', videoData);
    } catch (error) {
        console.error('Error loading video data:', error);
    }
}

// Call the function to load video data when the script is executed
loadVideoData();

function handleInput() {
    const searchInput = document.getElementById('video-search');
    const suggestionsContainer = document.getElementById('suggestions');
    const searchTerm = searchInput.value.toLowerCase();

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    // Filter video names based on the input
    const matchingVideos = videoData.filter(video => video.name.toLowerCase().includes(searchTerm));

    // Display matching video names as suggestions
    matchingVideos.forEach(video => {
        const suggestion = document.createElement('div');
        suggestion.classList.add('suggestion');
        suggestion.textContent = video.name;
        suggestion.onclick = () => selectSuggestion(video.name);
        suggestionsContainer.appendChild(suggestion);
    });
}

function autoFill() {
    const suggestionsContainer = document.getElementById('suggestions');
    const firstSuggestion = suggestionsContainer.querySelector('.suggestion');

    if (firstSuggestion) {
        selectSuggestion(firstSuggestion.textContent);
    }
}

function selectSuggestion(selectedText) {
    const searchInput = document.getElementById('video-search');
    searchInput.value = ''; // Clear the input field
    const videoResultContainer = document.getElementById('video-result');
    
    const selectedVideo = videoData.find(video => video.name === selectedText);

    if (selectedVideo) {
        selectedVideos.push(selectedVideo); // Store the selected video
        updateSelectedVideosDisplay(); // Update the display of selected videos
    }
}

function updateSelectedVideosDisplay() {
    const videoResultContainer = document.getElementById('video-result');
    
    // Display the selected videos
    const selectedVideosHTML = selectedVideos.map((video, index) => {
        return `<p>${index + 1}. ${video.name}</p>`;
    }).join('');
    
    videoResultContainer.innerHTML = selectedVideosHTML;
}

function translateSelectedVideos() {
    const videoResultContainer = document.getElementById('video-result');
    
    // Display the selected videos in the order they were selected
    const translatedVideosHTML = selectedVideos.map(video => {
        return `<p>Selected Video: ${video.name}</p><iframe width="560" height="315" src="${video.videolink}" frameborder="0" allowfullscreen></iframe>`;
    }).join('');
    
    videoResultContainer.innerHTML = translatedVideosHTML;
}
