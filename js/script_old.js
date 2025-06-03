// videoData is now loaded from videoData.js via script tag
let currentIndex = 0;
let answers = [];

const splash = document.getElementById('splash');
const startBtn = document.getElementById('start-button');
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('video');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const makingOfBtn = document.getElementById('makingof-button');
const showImageBtn = document.getElementById('show-image-button');
const makingOfImg = document.getElementById('makingof-image');
const log = document.getElementById('log');

// Initialize the application
startBtn.onclick = () => {
    if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
    splash.style.display = 'none'; 
    videoContainer.style.display = 'block'; 
    playVideo();
};

function playVideo() {
    const entry = videoData[currentIndex];

    if (entry.src === null) {
        handleEnd(entry);
        return;
    }

    questionContainer.style.display = 'none'; optionsContainer.innerHTML = '';
    makingOfBtn.style.display = 'none'; showImageBtn.style.display = 'none'; makingOfImg.style.display = 'none';
    video.onended = () => handleEnd(entry);
    video.src = entry.src;
    video.style.display = 'block'; makingOfImg.style.display = 'none';

    video.load(); video.play(); updateLog();
}

function handleEnd(entry) {
    console.log('Video ended:', entry);
    if (entry.makingOf) {
        console.log('Making Of video ended');

        // Check if there's another makingOf video next
        const nextEntry = videoData[currentIndex + 1];
        if (nextEntry && nextEntry.makingOf) {
            // Show "Extras" button after first making-of video
            showImageBtn.style.display = 'block';
            showImageBtn.textContent = 'Extras';
            showImageBtn.onclick = () => {
                showImageBtn.style.display = 'none';
                currentIndex++;
                playVideo();
            };
            return;
        }

        // This is the last makingOf video, show button and image
        makingOfBtn.style.display = 'block';
        makingOfBtn.onclick = () => {
            // show the making of image
            makingOfImg.style.display = 'block';
            video.style.display = 'none';
        };
        return;
    }
    if (entry.question || entry.conditional) {
        console.log('Showing question:', entry);
        showQuestion(entry);
    }
    else if (entry.extras) {
        showImageBtn.style.display = 'block';
        showImageBtn.onclick = () => {
            showImageBtn.style.display = 'none'; makingOfBtn.style.display = 'block';
            currentIndex++; playVideo();
        };
        return;
    }
    else {
        console.log('Video ended, moving to next video');
        currentIndex++; playVideo();
    }
}

function showQuestion(entry) {
    let question, opts;
    if (entry.conditional) {
        const idx = answers.find(a => a.key === entry.conditional)?.index || 0;
        question = entry.variants[idx].question; opts = entry.variants[idx].options;
    } else { question = entry.question; opts = entry.options; }
    questionText.textContent = question; optionsContainer.innerHTML = '';
    opts.forEach((opt, i) => {
        const btn = document.createElement('button'); btn.className = 'option-button'; btn.textContent = opt;
        btn.onclick = () => { answers.push({ question, answer: opt, key: entry.conditional || `vid${currentIndex}`, index: i }); currentIndex++; playVideo(); };
        optionsContainer.appendChild(btn);
    });
    questionContainer.style.display = 'block';
}

function updateLog() {
    log.innerHTML = answers.map(a => `<div><strong>${a.question}</strong><br>${a.answer}</div>`).join('<hr>');
}

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { currentIndex = Math.min(currentIndex + 1, videoData.length - 1); playVideo(); }
    if (e.key === 'ArrowLeft') { currentIndex = Math.max(currentIndex - 1, 0); playVideo(); }
}); 