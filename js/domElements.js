// DOM Elements Management
class DOMElements {
    constructor() {
        this.splash = document.getElementById('splash');
        this.startBtn = document.getElementById('start-button');
        this.videoContainer = document.getElementById('video-container');
        this.video = document.getElementById('video');
        this.questionContainer = document.getElementById('question-container');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options');
        this.makingOfBtn = document.getElementById('makingof-button');
        this.showImageBtn = document.getElementById('show-image-button');
        this.makingOfImg = document.getElementById('makingof-image');
        this.log = document.getElementById('log');
    }

    hideElement(element) {
        element.style.display = 'none';
    }

    showElement(element, displayType = 'block') {
        element.style.display = displayType;
    }

    clearContainer(container) {
        container.innerHTML = '';
    }
}

// Create global instance
const dom = new DOMElements(); 