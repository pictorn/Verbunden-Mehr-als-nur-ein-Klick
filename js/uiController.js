// UI Controller Management
class UIController {
    updateLog() {
        const answers = gameState.getAllAnswers();
        dom.log.innerHTML = answers
            .map(answer => `<div><strong>${answer.question}</strong><br>${answer.answer}</div>`)
            .join('<hr>');
    }

    startGame() {
        // Request fullscreen if available
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
        
        // Hide splash and show video container
        dom.hideElement(dom.splash);
        dom.showElement(dom.videoContainer, 'block');
        
        // Start playing videos
        videoPlayer.playVideo();
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                const newIndex = Math.min(
                    gameState.getCurrentIndex() + 1, 
                    gameState.getVideoDataLength() - 1
                );
                gameState.setCurrentIndex(newIndex);
                videoPlayer.playVideo();
            }
            
            if (e.key === 'ArrowLeft') {
                const newIndex = Math.max(gameState.getCurrentIndex() - 1, 0);
                gameState.setCurrentIndex(newIndex);
                videoPlayer.playVideo();
            }
        });
    }

    initializeStartButton() {
        dom.startBtn.onclick = () => this.startGame();
    }
}

// Create global instance
const uiController = new UIController(); 