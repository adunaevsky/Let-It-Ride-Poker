<template>
  <div class="infoFrame" id="infoFrame">
    <transition name="fade">
      <div v-if="open" class="infoBox">
        <div class="tabBox">
          <div
            :key="index + 'tableTab'"
            v-on:click="updateTabs(index)"
            class="tableTab"
            v-for="(t, index) in tabs"
            :class="{ tabActive: t.active, tabinActive: !t.active }"
          >
            {{ t.label }}
          </div>
        </div>

        <div v-if="tabs[0].active">
          <div class="textBox">
            <p class="pText">
              <strong>Rules</strong>
            </p>

            <p class="pText">
              Ride Poker is a multi-hand stud based poker game where the player
              makes three equal wagers against a pay scale. The wagers include
              making a mandatory ante and two optional "pull" or "ride" bets.
            </p>
            <p class="pText">
              Upon receiving the initial three card deal, the player my "pull"
              their bet(s) which allows them to take it back, or they my "ride"
              the bet by keeping it actively in the game. The pull and ride
              decisions are made by the player after seeing the opening deal of
              three cards and after seeing the fourth revealed card.
            </p>
            <p class="pText">
              Wins in the game are compared to a predetermined pay scale and are
              awarded to the player upon completion of the game.
            </p>
            <!-- Mississippi Stud RULES
              <p class="pText">
             Mississippi Stud is a multi-hand stud based poker game where the player makes an opening ante wager and additional raise bets as the game progresses. 

            </p>
            <p class="pText">
          After placing the initial ante, the first two cards are revealed to the player. The player may raise x1, raise x2, raise x3, or fold depending on the initial deal. The raise x1 matches the amount of the ante, the raise x2 doubles the amount of the ante, and the raise x3 triples the amount of the ante. Once the player chooses which bet they prefer after the opening deal, the next card is shown to the player, which once again allows them to raise x1, x2, x3, or fold. The final card is shown which allows the player to bet one final time using the raise or fold betting structure. If the player decides to fold at any time during the game, the game ends with the player forfeiting the hand and any wagers on the table. 
  </p>
            <p class="pText">
           Wins in the game are compared to a predetermined pay scale and are awarded to the player upon completion of the game.
 </p> -->

            <p class="pText">
              For more video poker games, please visit
              <br />
              <strong>
                <a
                  href="http://www.realizegamingllc.com/"
                  target="_blank"
                  rel="noopener"
                  >www.realizegamingllc.com</a
                >
              </strong>
            </p>
          </div>
        </div>

        <div v-if="tabs[2].active">
          <div class="textBox">
            <p style="text-align:left; padding-left:10px;">
              Realize Gaming, LLC specializes in designing and inventing new
              video poker and slot game concepts. We are building a portfolio of
              gaming patents with the goal of licensing them to companies for
              use in online or land based casinos. Please feel free to reach out
              to me at
              <a href="mailto:tnottke@realizegamingllc.com" target="_blank"
                >tnottke@realizegamingllc.com</a
              >
              or visit my website
              <a href="http://www.realizegamingllc.com/" target="_blank"
                >www.realizegamingllc.com</a
              >
              to learn more about our products.
            </p>

            <br />
            <br />

            <img
              src="http://www.realizegamingllc.com/static/RealizeLogo.jpg"
              style="width:80%;"
            />
          </div>
        </div>

        <div v-if="tabs[1].active">
          <div class="textBox">
            <br />
            <br />
            <strong>Game Statistics</strong> <br />

            Game Statistics and analysis is found here:
            <a
              href="https://wizardofodds.com/games/let-it-ride/"
              target="_blank"
              >https://wizardofodds.com/games/let-it-ride/</a
            >. <br />
            Credit: Wizard of Odds website - thank you!

            <!--  -->
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="open" class="closeBox" v-on:click="closeBox">×</div>
    </transition>
  </div>
</template>

<script>
/* import cashCounter from '../services/cashAnalyzer'
import bus from '../services/bus' */

/* import bus from "./../bus"; */
//import sim from "../gameLogic/simResults.js";
export default {
  name: "info",
  props: ["open"],
  data() {
    return {
      openBOx: this.open,
      setImgWidth: "",
      tabs: [
        {
          label: "Rules",
          active: true,
        },
        {
          label: "Game Statistics",
          active: false,
        },
        {
          label: "About",
          active: false,
        },
      ],
      virtualTbl: [],
      options: {
        primaryHand: [],
        bonusHand: [],
      },
      selected: {
        primaryHand: 0,
        bonusHand: 0,
      },
    };
  },
  beforeMount() {},
  methods: {
    isLast: function(list, index) {
      return list.length - 1 === index ? false : true;
    },
    closeBox: function() {
      this.$emit("closeInfo");
      document.getElementById("infoFrame").style.zIndex = "-1";
    },
    updateTabs: function(index) {
      this.tabs.forEach((t, i) => {
        t.active = i === index ? true : false;
      });
    },
    /*     formatNumber: function(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, */

    /*     round7: function(value) {
      
      return isNaN(value.toFixed(8)) ? "0" : value.toFixed(8);
    }, */
  },
  watch: {
    open: function() {
      if (this.open) {
        var w = window.innerWidth;
        var h = window.innerHeight;
        var finalWidth = Math.min(w, h);
        this.setImgWidth = finalWidth + "px";
      }
    },
  },
  mounted() {},
  /*   filters: {

  } */
};
</script>

<style scoped>
.pText {
  text-align: left;
  margin-left: 2em;
  line-height: 1.5em;
  margin-right: 2em;
}

.infoText {
  padding: 0% 5%;
  font-size: 1em;
  color: white;
  text-align: left;
}

.tabBox {
  overflow: hidden;
  margin: auto;
  text-align: center;
  margin-top: 85px;
  margin-bottom: 20px;
}

.tabActive {
  background-color: #a0abff;
}

.tabinActive {
  background-color: #efefef;
}

.tabActive:hover {
  background-color: #a0abff;
}

.tabinActive:hover {
  background-color: #7e889e;
  color: #fff;
}

.tableTab {
  border-color: #0099cb;
  border-radius: 5px;
  cursor: pointer;
  color: #000000;
  font-size: 1em;
  text-align: center;
  border-style: none;
  padding: 4px 10px;
  margin-right: 15px;
  font-family: sans-serif;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
}

a:link {
  color: #7aceff;
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: #7aceff;
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: #bdbec9;
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: #91ffb5;
  background-color: transparent;
  text-decoration: underline;
}

.textBox {
  width: 100%;
  text-align: center;
}

.rulesList {
  width: 80%;
  margin: 0 auto;
  padding: 0px;
  padding-bottom: 20px;
  line-height: 1.2em;
  font-size: 1em;
  padding-left: 10px;
  padding-right: 10px;
}

.rulesList > li {
  padding-top: 10px;
}

.closeBox {
  position: absolute;
  top: 0px;
  right: 0px;
  margin-right: 30px;
  margin-top: 15px;
  background-color: rgba(0, 0, 0, 1);
  height: 50px;
  width: 50px;
  border: 6px solid white;
  border-radius: 30px;
  text-align: center;
  line-height: 50px;
  font-size: 60px;
  color: white;
  cursor: pointer;
}

.infoFrame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.infoBox {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  overflow: auto;
  height: 100%;
  font-size: 1em;
}

.payTblHeader {
  width: 10%;
  font-size: 1.05em;
}

.simTbl {
  margin: 0 auto;
}

.simTbl td,
.simTbl th {
  padding: 10px;
  font-size: 1em;
}
</style>
