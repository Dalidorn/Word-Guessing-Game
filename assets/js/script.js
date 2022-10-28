//~~~GLOBAL VARIABLES~~~

//identify start button.
var startButton = document.querySelector(".start-button");
//identify reset button.
var resetButton = document.querySelector(".reset-button");
//delcare number of wins and losses.
var wins = 0;
var losses = 0;
//identify where to write wins and losses.
var winsText = document.querySelector(".win");
var lossesText = document.querySelector(".lose");
//detect if local storage have anything already on page load, if it does print it to the scores and set the wins and losses to what's stored
if(localStorage){
    winsText.textContent = localStorage.getItem("Wins");
    lossesText.textContent = localStorage.getItem("Losses");
    wins = localStorage.getItem("Wins");
    losses = localStorage.getItem("Losses");
}

//enable the reset button to clear those items in local storage, update the text.
resetButton.addEventListener("click", function(){
    localStorage.clear();
    winsText.textContent = localStorage.getItem("Wins");
    lossesText.textContent = localStorage.getItem("Losses");
    wins = localStorage.getItem("Wins");
    losses = localStorage.getItem("Losses");
});

//for game we listen for click on start button and start the game.
startButton.addEventListener("click", function(){
    
    //~~~VARIABLES~~~
    
    //declare how much time they have, starts at 60 in html file.
    var timeGiven = 60;
    //identify where we print time to.
    var timeRemaining = document.querySelector(".timer-count");
    //identify where we print main text string to.
    var mainText = document.querySelector(".word-blanks")
    //declare the words the game contains to an array.
    var wordOptions = ["Words", "That", "The", "Game", "Uses", "Are", "In", "This", "Variable", "Which", "Is", "An", "Array"];
    //declare the word we're using.
    var wordChoice = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    console.log(wordChoice);
    //add that words length to a var for later loops.
    var wordLength = wordChoice.length;
    //then make the word lowercase and split it into an array for comparison.
    var splitWord = wordChoice.toLowerCase().split('');
    //make a var for underscores.
    var underscores = [];
    

    //~~~TIMER LOGIC~~~
    var timer = setInterval(function(){
        //at the interval of every second we run the function to subtract from the total time given.
        timeGiven--;
        //also need to print the remaining time as it counts down.
        timeRemaining.textContent = timeGiven

        //now we check win/loss conditions each time we tick down to see if we should end the program.
        
        //since the only way to fail is run out of time, I want that first.
        if(timeGiven == 0) {
            clearInterval(timer);
            //we print game over because they ran out of time.
            mainText.textContent = "Game over!"
            //then we record their loss.
            losses++
            localStorage.setItem("Losses", losses);
            //then display it
            lossesText.textContent = localStorage.getItem("Losses");
        };
        
        //and we check each second if the var they're filling in = the word.
        if(underscores.join('') == wordChoice) {
            //then just like fail, we stop the timer.
            clearInterval(timer);
            //and print a message.
            mainText.textContent = "Great Job!"
            //then update the wins var.
            wins++
            localStorage.setItem("Wins", wins);
            //then display it
            winsText.textContent = localStorage.getItem("Wins");
        };
    }, 1000);

    //clear the main text section so we can fill it with the game text.
    mainText.textContent = "";

    //function to start the game.
    function startGame() {

        //~~~GAME LOGIC~~~

        //then we need to set the starting blanks for each character in the word choice, doing this in iteration makes it easy no matter the length of the word.
        for(i = 0; i < wordLength; i++) {
            underscores.push("_");
            //using .join will turn our array into a string that we can push, the input for the join method is what the items in the array with be seperated by, if left empty it would be commas.
            mainText.textContent = underscores.join(" ");
        };
        
        //now that the length of the word is visable we need to listen for keydown and assign the lowercase value to a variable.
        window.addEventListener("keydown", function(event){
            var key = event.key.toLowerCase();
            //now we check that value against the array of lowercase letters in the word.
            if(splitWord.includes(key)) {
                //then we need to check each letter of the array compared to key to find what position it's in.
                for(n = 0; n < wordLength; n++) {
                    if(splitWord[n] == key) {
                        //when we find where it is we update the underscore in that position to the character in that position from the original word in order to capture capital letters.
                        underscores[n] = wordChoice.charAt(n);
                        //then update text on the screen.
                        mainText.textContent = underscores.join(" ");
                    };
                };
            };
        });
    }; //end of the startGame function.

    //now that the function of the game is declared we need to call it to trigger it on clicking the button.
    startGame();
}); //end of event listener for start button.