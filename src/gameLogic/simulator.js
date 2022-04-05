import tableValues from './payTable.js'
var simulator = {
    data: function () {
        return {
            simulationGoing: false,
            stats: undefined,
            statsOpen: false,
            simScriptOn: false
        }
    },
    created: function () {
        this.stats = this.setStatsTable();
      },
    methods: {
        startSimulation() {
            this.simulationGoing = true;
            this.option.autoPlay = true;
            this.deal();
        },
        stopSimulation() {
            this.simulationGoing = false;
            this.option.autoPlay = false;
            this.deal();
        },
        setStatsTable() {

         var   result = {}
        
            tableValues.forEach((r) => {
        
                result[r.text] = {
                    hand:r.text,
                    reward: r.reward,
                    totalCount: 0,
                    fromBonus: 0,
                    noBonus: 0,
                    winValue: 0
                }
        
        
            })
            return result
        
        }
    }
}

export { simulator as default };