// add varvariable that will track of the total cards point value for the dealer
var dealerSum = 0;
// add varvariable that will track of the total cards point value for the user
var yourSum = 0;
//keep track of the aces the dealer have
var dealerAceCount = 0;
//keep track of the aces the user have
var yourAceCount = 0;

//add a variable for hidden, this will keep track of the dealer hidden card
var hidden;
var deck;

//add a variable of "can hit", this will allow user to draw while user Sum is less or equal 21
var canHit = true;

//when the page is loading the deck should build, create a function for shuffling our cards
window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame(); 
}

//create a function called "buildDeck", and inside the function add a list of values(number and names of cards). Also list of types of the cards and then call "deck"
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Q", "J", "K"]; //A-Ace, Q-Queen, J-Joker and K-King
    let types = ["C", "D", "H", "S"]; //C-Club, D-Diamond, H-Heart and S-Spade
    deck = [];
    //use a double for loop, to loop through these arrays
    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //let our deck to push values of "j" plus types of "i". Loop from A to K, looping a card value with card type A-C -> K-C, A-D -> K-D and so on until we have all 52 cards
        }
    }
    //console.log(deck); //now we have all our 52 cards
}

//define our shuffle function
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); //random is going to give a number betbetween (0 and 1), then multiply that by length(number) of the deck which is 52 and is going to give us a betwbetween (0 and 51.9) since it doedoesn't include 52.
        let temp = deck[i];   //everytime you refresh our cards will shuffle
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}
//Determin our hidden function, hidden is a variable that keeps track of the hidden card
function startGame() {
    hidden = deck.pop(); //pop will remove a card from the end of the ray
    dealerSum += getValue(hidden); //get a value of the hidden card
    dealerAceCount += checkAce(hidden); //check if the hidden card is an Ace "A"
    //console.log(hidden);
    //console.log(dealerSum);
    //deal cards for the dealer unless they have a sum greater than or equal to 17, 
    while (dealerSum < 17) {
        
        let cardimg = document.createElement("img"); //create an img tag
        let card = deck.pop(); //get a card from the deck
        cardimg.src = card + ".png"; //set a source of the img tag
        dealerSum += getValue(card); //increment the dealer sum
        dealerAceCount += checkAce(card); //counting "ace"
        document.getElementById("dealer-cards").append(cardimg); //appending the img tag to dealer-cards
    }
    console.log(dealerSum);
    
    for (let i =0; i < 2; i++) {
        let cardimg = document.createElement("img"); //create an img tag
        let card = deck.pop(); //get a card from the deck
        cardimg.src = card + ".png"; //set a source of the img tag
        yourSum += getValue(card); //increment the your sum
        yourAceCount += checkAce(card); //counting "ace"
        document.getElementById("your-cards").append(cardimg); //appending the img tag to your-cards
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit); //get an element from HTML documents, and add an event that will listen when the hit button is being clicked.
    document.getElementById("stay").addEventListener("click", stay);
    
}

function hit() {
    if (!canHit) {
        return;
    }
    let cardimg = document.createElement("img"); //create an img tag
    let card = deck.pop(); //get a card from the deck
    cardimg.src = card + ".png"; //set a source of the img tag
    yourSum += getValue(card); //increment the your sum
    yourAceCount += checkAce(card); //increment "ace" count
    document.getElementById("your-cards").append(cardimg); //appending the img tag to your-cards
    
    if (reduceAce(yourSum, yourAceCount) > 21) {  //reduces Ace and check Sum
        canHit = false;
    }
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount); //when clicking stay button, it will total up the number of cards
    yourSum = reduceAce(yourSum, yourAceCount);
    
    canHit = false;
    document.getElementById("hidden").src = hidden + "png"; //reveal the  hidden card
    
    let message = "";
    if (yourSum > 21) {    //if the player sum is grerater than 21, it will display a message "You lose!"
        message = "You lose!";
    }
    //else if the dealer have a sum that is greater than, display a memessage You win!
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //else if both dealer and player have a number greater or equal to 21 but total is the same, display a message Tie!
    else if (yourSum == dealerSum) {
        message = "Tie";
    }
    //else if player sum is greater than the dealer sum, display message You win!.
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    //else if player sum is less than dealer sum, display message You lose!
    else if (yourSum < dealerSum) {
        message = "YOu Lose!";
    }
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message; //display a our messages, well this one i still struggle to underunderstand but i will defidefinitely ask my coach(Sasha).
}


function getValue(card) {
    let data = card.split("-"); // splitting values into two parts
    let value = data[0];
    
    if (isNaN(value)) {      //if value is not a number for Club cards which is "C"
        if (value == "A") {  //if the value is equal equal "A", return "11" otherwise return 10. Because if the value is not a number it could be A, J, Q or K.
            return 11;
        }
        return 10;
    }
    return parseInt(value);  // if we dont return a a value from retun 11 and 10, it mean we have a number. So it will return what number is.
}

// determine checkAce function
function checkAce(card) {
    if (card[0] == "A") {  //if card of "0" equal equal "A", then return "1" else "0"
        return 1;
    }
    return 0;
}
//reduce Ace from 11 to 1, only if player sum is above 21
function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}
