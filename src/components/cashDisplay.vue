<template>
  <div class="cashDisplays">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 80">
      <rect
        id="balanceBox"
        style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;"
        x="46"
        y="0.5"
        rx="2"
        width="53.5"
        height="10"
      />

      <rect
        id="totalBetBox"
        style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;"
        x="46"
        y="12.5"
        rx="2"
        width="53.5"
        height="10"
      />

      <rect
        id="winBox"
        style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;"
        x="46"
        y="24.5"
        rx="2"
        width="53.5"
        height="10"
      />

      <rect
        id="b/hBox"
        style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;"
        x="46"
        y="36.5"
        rx="2"
        width="53.5"
        height="10"
        :class="{ glow: glow && !lockBet, noGlow: !glow }"
        @click="updateBet()"
      />
      <rect
        id="handsBox"
        style="fill:#231f20; stroke:#5b5b5b; stroke-miterlimit:10;"
        x="63"
        y="48.5"
        rx="2"
        width="36.5"
        height="10"
        @click="updateHands()"
        :class="{ glow: glow && !lockBet, noGlow: !glow }"
      />

      <text
        text-anchor="end"
        font-weight="bold"
        font-size="9"
        x="43"
        y="8.5"
        fill="#FFFFFF"
        opacity="0.8"
      >
        BAL
      </text>
      <text
        text-anchor="middle"
        font-weight="bold"
        font-size="9"
        x="73"
        y="8.5"
        fill="#FFFFFF"
        opacity="1"
      >
        {{ dollarFormat(cash.balance) }}
      </text>

      <text
        text-anchor="end"
        font-weight="bold"
        font-size="9"
        x="43"
        y="20.5"
        fill="#FFFFFF"
        opacity="0.8"
      >
        BET
      </text>
      <text
        id="totalBetValue"
        text-anchor="middle"
        font-weight="bold"
        font-size="9"
        x="73"
        y="20.5"
        fill="#FFFFFF"
        opacity="1"
        :class="{ pointer: glow && !lockBet }"
        @click="updateBet()"
      >
        {{ dollarFormat(cash.betsHeld * cash.coinValue * cash.hands) }}
      </text>

      <text
        text-anchor="end"
        font-weight="bold"
        font-size="9"
        x="43"
        y="32.5"
        fill="#FFFFFF"
        opacity="0.8"
      >
        WIN
      </text>

      <text
        text-anchor="end"
        font-weight="bold"
        font-size="9"
        x="43"
        y="44.5"
        fill="#FEED07"
        opacity="0.8"
        @click="updateBet()"
      >
        B/H
      </text>
      <text
        text-anchor="end"
        font-weight="bold"
        font-size="9"
        x="59"
        y="56.5"
        fill="#FEED07"
        opacity="0.8"
        @click="updateHands()"
      >
        HANDS
      </text>

      <text
        id="b/hVal"
        text-anchor="middle"
        font-weight="bold"
        :font-size="cash.coinValue >= 10 ? '6.5' : '8'"
        x="73"
        :y="cash.coinValue >= 10 ? '43.5' : '44'"
        fill="#FEED07"
        opacity="1"
        @click="updateBet()"
      >
        {{ getBetsView() }}
      </text>
      <text
        id="handsVal"
        text-anchor="middle"
        font-weight="bold"
        font-size="9"
        x="80"
        y="56.5"
        fill="#FEED07"
        opacity="1"
        @click="updateHands()"
      >
        {{ cash.hands }}
      </text>

      <text
        id="winVal"
        v-if="showValue"
        text-anchor="middle"
        font-weight="bold"
        font-size="9"
        x="73"
        y="32.5"
        fill="#00ff3b"
        opacity="1"
      >
        {{ dollarFormat(winDisplayed) }}
      </text>
    </svg>
  </div>
</template>

<script>
//import bus from "./../bus";
export default {
  name: "cashDisplay",
  props: ["cash", "showValue", "glow", "lockBet"],
  /*    props: ['baseBet', 'slideBet', 'bal', 'win', 'showValue'], */
  data() {
    return {
      winDisplayed: 0,
    };
  },
  methods: {
    getBetsView() {
      var moreText = "";

      if (this.cash.betsHeld === 3) {
        moreText =
          " + " + "$" + this.cash.coinValue + " + " + "$" + this.cash.coinValue;
      } else if (this.cash.betsHeld === 2) {
        moreText = " + " + "$" + this.cash.coinValue;
      }

      return "$" + this.cash.coinValue + moreText;
    },
    updateHands() {
      if (this.glow && !this.lockBet) {
        this.$emit("updateHands");
      }
    },
    updateBet() {
      if (this.glow && !this.lockBet) {
        this.$emit("updateBet");
      }
    },
    dollarFormat: function(x) {
      if (x === "") {
        return x;
      }
      return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    updateDisplay() {
      //   console.log(this.cash, this.cash.win);
      if (this.cash.win > 0) {
        this.winDisplayed = 0;
        var cashCounter = setInterval(() => {
          if (this.cash.win - this.winDisplayed >= 1000) {
            this.winDisplayed = this.winDisplayed + 995;
          }
          if (this.cash.win - this.winDisplayed >= 100) {
            this.winDisplayed = this.winDisplayed + 95;
          }
          if (this.cash.win - this.winDisplayed >= 10) {
            this.winDisplayed = this.winDisplayed + 5;
          }
          if (this.cash.win - this.winDisplayed >= 1) {
            this.winDisplayed++;
          }
          if (this.cash.win - this.winDisplayed >= 0.5) {
            this.winDisplayed += 0.5;
          }

          if (this.winDisplayed === this.cash.win) {
            /*      if (this.cash.win >= ((this.cash.coinValue * this.cash.playCost) + (this.cash.coinValue * this.cash.bonusCost))) {
              console.log('win??');

            } */
            this.$emit("playWin");
            clearInterval(cashCounter);
          }
          //  console.log(this.winDisplayed,  this.cash.win, (this.cash.coinValue * this.cash.playCost) + (this.cash.coinValue * this.cash.bonusCost));
        }, 30);
      } else {
        this.winDisplayed = 0;
        //console.log('lose??');
        // this.$emit("endRound");
      }
    },
  },

  watch: {
    "cash.win": function() {
      this.updateDisplay();
    },
  },
  /*   mounted() {
    bus.on("updateCashDisplay", (a) => {
      this.cash.win = a.win;
      this.updateDisplay();

      this.cash.win = a.win;
    });
  }, */
};
</script>

<style scoped>
@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .cashDisplays {
    width: 30%;
    float: right;
    margin-right: 1%;
    margin-top: 1%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .cashDisplays {
    width: 36%;
    float: right;
    margin-right: 1%;
    margin-top: 1%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .cashDisplays {
    width: 30%;
    float: right;
    margin-right: 1%;
    margin-top: 1%;
  }
}
</style>
