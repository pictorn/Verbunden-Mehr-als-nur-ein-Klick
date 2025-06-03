// Question Handler Management
class QuestionHandler {
    showQuestion(entry) {
        let question, options;
        
        if (entry.conditional) {
            const answerData = gameState.getAnswerByKey(entry.conditional);
            const index = answerData ? answerData.index : 0;
            question = entry.variants[index].question;
            options = entry.variants[index].options;
        } else {
            question = entry.question;
            options = entry.options;
        }
        
        // Set question text
        dom.questionText.textContent = question;
        dom.clearContainer(dom.optionsContainer);
        
        // Create option buttons
        options.forEach((option, index) => {
            const button = this.createOptionButton(option, index, question, entry.conditional);
            dom.optionsContainer.appendChild(button);
        });
        
        // Show question container
        dom.showElement(dom.questionContainer, 'block');
    }

    createOptionButton(optionText, optionIndex, question, conditionalKey) {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = optionText;
        
        button.onclick = () => {
            gameState.addAnswer(question, optionText, conditionalKey, optionIndex);
            gameState.nextVideo();
            videoPlayer.playVideo();
        };
        
        return button;
    }
}

// Create global instance
const questionHandler = new QuestionHandler(); 