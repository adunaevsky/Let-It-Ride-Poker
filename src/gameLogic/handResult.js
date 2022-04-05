import tableValues from './payTable'
import sortBy from 'lodash/sortBy';

/* import dealerP from './dealer';


var dealer = new dealerP(); */
//dealer.setMultiplyChances();

class handResult {

    fiveCards(pCards) {

        var cards = [],
            r = {}
        pCards.forEach((a) => {
            cards.push({
                suit: a.charAt(0),
                value: parseInt(a.slice(1, a.length))
            });
        });

        r.rank = 1;

        if (this.royal(cards)) {
            r.label = tableValues[0].text;
            r.payout = tableValues[0].reward;
            r.fill = tableValues[0].clr;
        } else if (this.straightFlush(cards)) {
            r.label = tableValues[1].text;
            r.payout = tableValues[1].reward;
            r.fill = tableValues[1].clr;
        } else if (this.fourOfKind(cards)) {
            r.label = tableValues[2].text;
            r.payout = tableValues[2].reward;
            r.fill = tableValues[2].clr;
        } else if (this.fullHouse(cards)) {
            r.label = tableValues[3].text;
            r.payout = tableValues[3].reward;
            r.fill = tableValues[3].clr;
        } else if (this.flush(cards)) {
            r.label = tableValues[4].text;
            r.payout = tableValues[4].reward;
            r.fill = tableValues[4].clr;
        } else if (this.straight(cards)) {
            r.label = tableValues[5].text;
            r.payout = tableValues[5].reward;
            r.fill = tableValues[5].clr;
        } else if (this.threeOfKind(cards)) {
            r.label = tableValues[6].text;
            r.payout = tableValues[6].reward;
            r.fill = tableValues[6].clr;
        } else if (this.twoPair(cards)) {
            r.label = tableValues[7].text;
            r.payout = tableValues[7].reward;
            r.fill = tableValues[7].clr;
        } else if (this.pair(cards)) {
            r.label = tableValues[8].text;
            r.payout = tableValues[8].reward;
            r.fill = tableValues[8].clr;

        } else {
            r.label = 'High Card';
            r.payout = 0;
            r.fill = '#424242';
            r.rank = 0;
        }

        //  r.payMultiply = dealer.getMultiply();
        //  console.log(r);

        return r;
    }



    royal(card) {
        var result = true;
        var sameSuits = this.findSameSuits(card);
        if (sameSuits.length === 5) {
            var reqValues = [10, 11, 12, 13, 14];
            reqValues.forEach((v) => {
                var valueCheck = sameSuits.indexOf(v);
                if (valueCheck === -1) { result = false; }
            });
        } else {
            result = false;
        }
        return result;
    }

    straightFlush(card) {

        var result = false;
        if (this.findSameSuits(card).length === 5) {

            result = this.straight(card);
        }
        return result;

    }

    straight(card) {
        var result = false,
            aceFound = false;
        var finalResult = false;

        if (this.orderedValues(card) ? true : false) {
            result = true;
        } else {
            card.forEach((c) => {
                if (c.value === 14) {
                    aceFound = true;
                    c.value = 1;
                }
            });
        }
        if (result) {
            finalResult = true;
        }

        var result2 = true;
        if (aceFound) {

            //  console.log('got to ace case of striaght');
            card.forEach((c) => {
                if (c.value === 14) { c.value = 1; }
            });

            // var sortedCards = card.sort((a, b) => { return a.value - b.value; });
            var sortedCards = sortBy(card, [function(c) { return c.value; }]);

            sortedCards.forEach((c, i) => {
                if (i > 0 && c.value !== sortedCards[i - 1].value + 1) { result2 = false; }
            });
            card.forEach((c) => {
                if (c.value === 1) { c.value = 14 }
            });

            if (result2) {
                finalResult = true;
            }
        }

        return finalResult;
    }

    fourOfKind(card) {
        var result = false;
        var valueCounts = this.getValueCounts(card);
        for (var key in valueCounts) {
            if (valueCounts[key] === 4) {
                result = true;
            }
        }
        return result;
    }



    threeOfKind(card) {
        var result = false;
        var valueCounts = this.getValueCounts(card);
        for (var key in valueCounts) {
            if (valueCounts[key] === 3) {
                result = true;
            }
        }
        return result;
    }

    fullHouse(card) {
        var threeOfaKind = false;
        var pair = false;
        var result = false;
        var valueCounts = this.getValueCounts(card);
        for (var key in valueCounts) {
            if (valueCounts[key] === 3) {
                threeOfaKind = true;
            }
            if (valueCounts[key] === 2) {
                pair = true;
            }
        }
        if (threeOfaKind && pair) {
            result = true;
        }
        return result;
    }

    flush(card) {
        return this.findSameSuits(card).length === 5 ? true : false;
    }

    twoPair(card) {
        var result = false,
            pairsFound = 0,
            valueCounts = this.getValueCounts(card);
        for (var key in valueCounts) {
            if (valueCounts[key] === 2) { pairsFound++; }
        }
        if (pairsFound === 2) { result = true; }
        return result;
    }

    pair(card) {
        var result = false;
        var valueCounts = card.reduce((acc, c) => {
            if (c.value > 9) {
                if (typeof acc[c.value] === 'undefined') {
                    acc[c.value] = 1;
                } else {
                    acc[c.value] = acc[c.value] + 1;
                }
            }
            return acc;
        }, {});
        for (var key in valueCounts) {
            if (valueCounts[key] === 2) {
                result = true;
            }
        }
        return result;
    }


    getValueCounts(card) {
        return card.reduce((acc, c) => {
            if (typeof acc[c.value] === 'undefined') {
                acc[c.value] = 1;
            } else {
                acc[c.value] = acc[c.value] + 1;
            }
            return acc;
        }, {});
    }


    orderedValues(card) {
        var result = true;
        //        var sortedCards = card.sort((a, b) => { return a.value - b.value; });
        var sortedCards = sortBy(card, [function(c) { return c.value; }]);

        sortedCards.forEach((c, i) => {
            if (i > 0 && c.value !== sortedCards[i - 1].value + 1) { result = false; }
        });
        return result;
    }

    findSameSuits(card) {
        var sameSuits = [];
        card.forEach((c, i) => {
            if (i === 0) {
                sameSuits.push(c.value);
            } else if (c.suit === card[i - 1].suit) {
                sameSuits.push(c.value);
            }
        });
        return sameSuits;
    }

}

export { handResult as default }