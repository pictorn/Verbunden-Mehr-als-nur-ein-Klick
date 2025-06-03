// Video Player Management
class VideoPlayer {
    constructor() {
        this.video = dom.video;
    }

    playVideo() {
        const entry = gameState.getCurrentVideo();

        if (entry.src === null) {
            this.handleVideoEnd(entry);
            return;
        }

        // Reset UI
        dom.hideElement(dom.questionContainer);
        dom.clearContainer(dom.optionsContainer);
        dom.hideElement(dom.makingOfBtn);
        dom.hideElement(dom.showImageBtn);
        dom.hideElement(dom.makingOfImg);

        // Setup video
        this.video.onended = () => this.handleVideoEnd(entry);
        this.video.src = entry.src;
        dom.showElement(this.video, 'block');
        dom.hideElement(dom.makingOfImg);

        this.video.load();
        this.video.play();
        
        // Update log
        uiController.updateLog();
    }

    handleVideoEnd(entry) {
        console.log('Video ended:', entry);
        
        if (entry.makingOf) {
            this.handleMakingOfEnd();
            return;
        }
        
        if (entry.question || entry.conditional) {
            console.log('Showing question:', entry);
            questionHandler.showQuestion(entry);
            return;
        } 
        
        if (entry.extras) {
            this.handleExtras();
            return;
        }
        
        // Continue to next video
        console.log('Video ended, moving to next video');
        gameState.nextVideo();
        this.playVideo();
    }

    handleMakingOfEnd() {
        console.log('Making Of video ended');
        
        const nextEntry = gameState.getNextVideo();
        if (nextEntry && nextEntry.makingOf) {
            // Show "Extras" button after first making-of video
            dom.showElement(dom.showImageBtn);
            dom.showImageBtn.textContent = 'Extras';
            dom.showImageBtn.onclick = () => {
                dom.hideElement(dom.showImageBtn);
                gameState.nextVideo();
                this.playVideo();
            };
            return;
        }
        
        // This is the last makingOf video, show button and image
        dom.showElement(dom.makingOfBtn);
        dom.makingOfBtn.onclick = () => {
            dom.showElement(dom.makingOfImg);
            dom.hideElement(this.video);
        };
    }

    handleExtras() {
        dom.showElement(dom.showImageBtn);
        dom.showImageBtn.onclick = () => {
            dom.hideElement(dom.showImageBtn);
            dom.showElement(dom.makingOfBtn);
            gameState.nextVideo();
            this.playVideo();
        };
    }
}

// Create global instance
const videoPlayer = new VideoPlayer(); 