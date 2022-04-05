import handResult from './handResult.js'

var checkFor = new handResult();


class autoPlacer {

    getTotalPayout(c) {

        var result = [];
        //console.log(c);
        result.push(checkFor.fiveCards(c.slice(0, 5)));
        result.push(checkFor.fiveCards(c.slice(5, 10)));
        result.push(checkFor.fiveCards(c.slice(10, 15)));
        var totalPayout = 0;
        result.forEach((r) => {
            totalPayout += r.payout
        })

        return totalPayout

    }

    setPlace(playerCards, cardToPlace) {

        var options = [];

        for (let cutPt = 0; cutPt < 15; cutPt++) {
            var opt = playerCards.slice(0, cutPt);
            opt.push(cardToPlace);

            var c = opt.concat(playerCards.slice(cutPt + 1, 15));

            options.push({
                position: cutPt,
                cards: c,
                winValue: this.getTotalPayout(c)
            });
        }



        options.sort((a, b) => {
            return b.winValue - a.winValue;
        });
        console.log(options);
        return options[0];

    }


}

export { autoPlacer as default }