// Game State Management
class GameState {
    constructor() {
        this.currentIndex = 0;
        this.answers = [];
        this.videoData = [];
    }

    setVideoData(data) {
        this.videoData = data;
    }

    getCurrentVideo() {
        return this.videoData[this.currentIndex];
    }

    getNextVideo() {
        return this.videoData[this.currentIndex + 1];
    }

    nextVideo() {
        this.currentIndex++;
    }

    addAnswer(question, answer, key, index) {
        this.answers.push({ 
            question, 
            answer, 
            key: key || `vid${this.currentIndex}`, 
            index 
        });
    }

    getAnswerByKey(key) {
        return this.answers.find(a => a.key === key);
    }

    getAllAnswers() {
        return this.answers;
    }

    setCurrentIndex(index) {
        this.currentIndex = Math.max(0, Math.min(index, this.videoData.length - 1));
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    getVideoDataLength() {
        return this.videoData.length;
    }
}

// Create global instance
const gameState = new GameState(); 