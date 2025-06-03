// Main Application
class App {
    constructor() {
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            console.log('Initializing Interactive Video Story...');
            
            // Set video data from global videoData variable
            gameState.setVideoData(videoData);
            
            // Initialize UI components
            uiController.initializeStartButton();
            uiController.setupKeyboardControls();
            
            console.log('Application initialized successfully');
            this.initialized = true;
            
        } catch (error) {
            console.error('Error initializing application:', error);
        }
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
} else {
    // DOM is already loaded
    const app = new App();
    app.init();
} 