import handResult from './handResult.js'

var checkFor = new handResult();



class autoTrader {


    handCompareTo = [
        [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        [0, 1, 2, 3, 4, 10, 11, 12, 13, 14],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    ];

    getHandNum(i) {
        if (i < 5) {
            return 0;
        } else if (i < 10) {
            return 1;
        } else {
            return 2;
        }
    }

    setTrade(playerCards) {

        //  console.log(playerCards);

        var options = [];
        var cutPt = 1;
        for (let i = 1; i < 15; i++) {

            var handNum = this.getHandNum(i - 1);
            var indexCardrsToCheck = this.handCompareTo[handNum];
            //console.log(indexCardrsToCheck, handNum);

            var cards = playerCards.slice(0, cutPt);
            var swap1Index = cards.length - 1;
            var swapCard1 = cards[swap1Index];
            var staticCards1 = playerCards.slice(0, swap1Index)
            var compareTo = playerCards.slice(cutPt, 15);

            /*          var compareTo = [];
                     indexCardrsToCheck.forEach((compCard)=>{
                       compareTo.push(playerCards[compCard]);
                     }); */

            for (let swap2Index = 0; swap2Index < compareTo.length; swap2Index++) {

                var compareIndexCard = playerCards.indexOf(compareTo[swap2Index]);

                if (indexCardrsToCheck.indexOf(compareIndexCard) > -1) {
                    var swapCard2 = compareTo[swap2Index];
                    var staticCards2 = compareTo.slice(0, swap2Index);
                    var staticCards3 = compareTo.slice(swap2Index + 1, 15);
                    //  console.log( staticCards1, swapCard1, staticCards2, swapCard2, staticCards3);

                    var cardCombo = staticCards1.concat(swapCard2);


                    Array.prototype.push.apply(cardCombo, staticCards2);
                    cardCombo.push(swapCard1)
                    Array.prototype.push.apply(cardCombo, staticCards3);
                    //console.log(swapCard1, swapCard2);
                    options.push({
                        swap1: swapCard1,
                        swap2: swapCard2,
                        winValue: this.getTotalPayout(cardCombo)
                    });

                }

            }

            cutPt++;

        }


        options.sort((a, b) => {
            return b.winValue - a.winValue;
        })
        console.log(options);
        var noSwapValue = this.getTotalPayout(playerCards);

        var finalresult = noSwapValue > options[0].winValue ? false : [playerCards.indexOf(options[0].swap1), playerCards.indexOf(options[0].swap2)];
        //console.log(options[0]);
        // console.log(finalresult);

        return finalresult;
    }



    getTotalPayout(c) {

        var result = [];

        result.push(checkFor.fiveCards(c.slice(0, 5)));
        result.push(checkFor.fiveCards(c.slice(5, 10)));
        result.push(checkFor.fiveCards(c.slice(10, 15)));

        /*         result.push(checkFor.threeCards([c[0], c[3], c[6]]));
                result.push(checkFor.threeCards([c[1], c[4], c[7]]));
                result.push(checkFor.threeCards([c[2], c[5], c[8]]));
         */
        var totalPayout = 0;
        result.forEach((r) => {
            totalPayout += r.payout
        })

        return totalPayout

    }


}

export { autoTrader as default }