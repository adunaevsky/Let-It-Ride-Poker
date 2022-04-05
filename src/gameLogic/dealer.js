class dealerPerson {
    cards = ['', '', '', '', ];
    deck;


    getCard(cardNum, testCase, cardTypes) {

        if (typeof testCase === 'object' && cardTypes === 'cards' && testCase.length > 0) {
            this.cards[cardNum] = testCase[cardNum];

            var cardInDeck = this.deck.indexOf(this.cards[cardNum]);
            this.deck.splice(cardInDeck, 1);
        } else if (cardTypes === 'cards') {
            this.cards[cardNum] = this.deck[this.deck.length - 1];

            this.deck.pop();

        }

    }


    newDeck(removedCards) {

        var suits = ['C', 'H', 'S', 'D'];
        this.deck = [];
        for (var s = 0; s < suits.length; s++) {
            for (var r = 2; r <= 14; r++) {
                if (!removedCards[suits[s] + r]) {
                    this.deck.push(suits[s] + r);
                }

            }
        }
        this.shuffle(this.deck);
    }

    shuffle(array) {
        var i = 0,
            j = 0,
            temp = null
        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1))
            temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
    }
    constructor() {}

}

export { dealerPerson as default }