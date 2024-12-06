function handleSubmit(question) {
    var formData = new FormData();
    formData.append('question', question);
    document.getElementById('questionInput').value = '';
    var userQuestionElement = document.createElement('div');
    userQuestionElement.className = 'response';
    userQuestionElement.innerHTML = "<h3>You:</h3>" + question;
    document.getElementById('responseContainer').appendChild(userQuestionElement);
    document.getElementById('responseContainer').scrollTop = document.getElementById('responseContainer').scrollHeight;
    fetch('/ask', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        var serverResponseElement = document.createElement('div');
        serverResponseElement.className = 'response';
        serverResponseElement.innerHTML = "<h3>MarkGPT:</h3> " + data;
        document.getElementById('responseContainer').appendChild(serverResponseElement);
        document.getElementById('responseContainer').scrollTop = document.getElementById('responseContainer').scrollHeight;
    });
}

function validateForm() {
    var questionInput = document.getElementById('questionInput').value.trim();
    if (questionInput === '') {
        alert('Please enter your question');
        return false;
    }
    return true;
}

function askQuestion() {
    var questionInput = document.getElementById('questionInput').value.trim();
    if (questionInput === '') {
        alert('Please enter your question');
        return;
    }
    handleSubmit(questionInput);
}

document.getElementById('questionInput').addEventListener('input', function() {
    if (this.value === '') {
        document.getElementById('responseContainer').innerHTML = '';
    }
});

document.getElementById('clearButton').addEventListener('click', function() {
    document.getElementById('responseContainer').innerHTML = '';
});

document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    askQuestion();
});
