let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

let setHiddenFields = () => {
    let rand = Math.floor((Math.random() * 9999)).toString();
    while(rand.length < 4){
        rand = `0${rand}`;
    }
    answer = rand;
    attempt = 0;
};

let setMessage = (message) => {
    document.getElementById('message').innerHTML(message);
};

let validateInput = (message) => {
    if(message.length !== 4){
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
    else{
        return true;
    }
};

let getResults = (guess) => {
    let resultDiv = `<div class="row">
                     <span class="col-md-6">${guess}</span>
                     <div class="col-md-6">`;
    
    let checkCount = 0;
    
    for(let i = 0; i < guess.length; i++){
        if(guess[i] === answer[i]){
            resultDiv += '<span class="glyphicon glyphicon-ok"></span>';
            checkCount++;
        }
        else if(answer.includes(guess[i])){
            resultDiv += '<span class="glyphicon glyphicon-transfer"></span>';
        }
        else{
            resultDiv += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    resultDiv += '</div></div>';
    document.getElementById('results').innerHTML(resultDiv);

    if(checkCount === 4) return true;
    else return false;
};

let showAnswer = (checkWin) => {
    let codeBox = document.getElementById('code');
    codeBox.innerHTML(answer);
    if(checkWin) codeBox.className += ' success';
    else codeBox.className += ' failure'
};

let showReplay = () => {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
};

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(attempt === '' || answer === ''){
        setHiddenFields();
    }

    if(validateInput(input.value)){
        attempt++;
    }
    else{
        return false;
    }

    if(getResults(input.value)){
        setMessage('You Win! :)');
        showAnswer(true);
    }
    else if(!getResults(input.value) && attempt >= 10){
        setMessage('You Lose! :(');
        showAnswer(false);
    }
    else setMessage('Incorrect, try again.');
}

//implement new functions here