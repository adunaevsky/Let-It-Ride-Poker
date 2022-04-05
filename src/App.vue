<template>
  <div class="fullScreen" :style="bgImg">
    <div
      v-if="!option.invisibleSim"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
    >
      <pay-table
        v-show="!stage.placeCards"
        v-bind:baseBetValue="cash.coinValue"
      ></pay-table>
      <logo v-bind:bonus="stage.bonusMode"></logo>
      <menu-btns v-on:openInfo="openInfoBox"></menu-btns>
      <info v-on:closeInfo="infoBoxOpen = false" :open="infoBoxOpen"></info>
      <login v-on:startGame="gameOn = true" :open="!gameOn"></login>
      <cash-display
        v-bind:glow="stage.results || stage.newRound"
        v-on:updateBet="changeBet()"
        v-on:updateHands="updateHands()"
        v-bind:cash="cash"
        v-on:playWin="playWinMsg()"
        v-bind:showValue="stage.results || stage.showWin"
        v-bind:lockBet="false"
      ></cash-display>
      <water-mark1
        :style="{ display: showWater2 ? 'block' : 'none' }"
      ></water-mark1>
      <water-mark2
        :style="{ display: showWater ? 'block' : 'none' }"
      ></water-mark2>
      <water-mark3></water-mark3>

      <card
        v-for="(c, i) in primaryCards.deal"
        v-bind:key="i + 'primaryC'"
        v-bind:cardPosition="cPos[i]"
        v-bind:showCard="c"
        v-bind:flip="primaryCards.flip[i]"
        v-bind:cardNum="i"
        v-bind:cardType="'cards'"
        v-bind:cardBack="cardBack"
        v-bind:turboSpeed="option.turboSpeed"
        v-bind:location="3"
      ></card>

      <card
        v-for="(c, i) in dCards.deal"
        v-bind:key="i + 'dCcard'"
        v-bind:cardPosition="cPos[i]"
        v-bind:showCard="c"
        v-bind:flip="dCards.flip[i]"
        v-bind:cardNum="i"
        v-bind:cardType="'dCards'"
        v-bind:cardBack="cardBack"
        v-bind:turboSpeed="option.turboSpeed"
        v-bind:location="i > 4 ? 1 : 2"
      ></card>

      <div
        id="results"
        v-for="(r, cardNum) in results"
        v-bind:key="cardNum + 'result'"
        :class="{
          cardArea2: cardNum <= 4,
          cardArea: cardNum > 4,
        }"
      >
        <div v-if="r.payout > 0" class="mainCards">
          <div class="cSize" :class="[cPos[cardNum]]">
            <div style="padding-top: 0%; margin: 0 auto; cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 130">
                <rect
                  :style="{ fill: r.fill }"
                  x="4"
                  y="70"
                  rx="0"
                  width="82"
                  height="25"
                />
                <text
                  x="46"
                  y="91"
                  fill="#FFFFFF"
                  text-anchor="middle"
                  font-weight="bold"
                  font-size="25"
                  class="winValueLabel"
                >
                  ${{ r.win }}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!--       <div
        v-show="stage.placeCards"
        class="placeCardTop"
        style="position:absolute; width: 100%"
      >
        <place-card
          v-bind:cardOnTable="cardOnTableToPlace"
          v-bind:placePossible="placePossible"
        ></place-card>
      </div> -->
      <!-- 
      <div
        id="singleResult"
        v-for="(r, i) in checkStageResult(results, 0, 3)"
        :key="i + 'Hresult'"
        :class="{
          resultArea: i === 0,
          resultArea2: i === 1,
          resultArea3: i === 2,
        }"
      >
        <result-lable v-bind:r="r" />
      </div> -->

      <div
        id="dealOrRide"
        class="topBtn"
        :style="{
          display:
            stage.newRound || stage.ride1 || stage.ride2 ? 'block' : 'none',
        }"
      >
        <div class="topBtnBox" v-on:click="mainBtn()">
          <btn-right
            v-bind:specs="{
              clr: 'red',
              label: stage.newRound ? 'DEAL' : 'RIDE',
            }"
          ></btn-right>
        </div>
      </div>
      <div
        id="pull"
        class="bottomBtn"
        :style="{
          display: stage.ride1 || stage.ride2 ? 'block' : 'none',
        }"
      >
        <div class="bottomBtnBox" v-on:click="pull()">
          <btn-right
            v-bind:specs="{
              clr: 'green',
              label: 'PULL',
            }"
          ></btn-right>
        </div>
      </div>

      <!-- FOR DEV VERSION -->
      <div class="changeBG" @click="changeBG()"></div>
      LEAVE
      <div class="settings" @click="openSettings()"></div>

      <again v-if="stage.newGame" v-on:deal="deal"></again>
    </div>
    <!-- FOR TESTING (start) -->

    <div v-if="settingsOpen">
      <div class="topInfoBox">
        <button
          v-show="!simulationGoing && !option.simScript"
          @click="settingsOpen = false"
          style="
            position: absolute;
            right: 0.5em;
            top: 0.5em;
            width: 2em;
            height: 2em;
          "
        >
          X
        </button>
        <select class="settingBtn" v-model="presetCards">
          <option
            v-for="(o, i) in testScenarios"
            :value="i"
            v-bind:key="i + 'primeSet'"
          >
            {{ o.desc }}
          </option>
        </select>
        <!--   <div v-if="!option.invisibleSim && !option.simScript">
        
          <button
            class="settingBtn"
            @click="option.bestPlace = !option.bestPlace"
          >
            <span v-if="option.bestPlace">☑</span>
            <span v-if="!option.bestPlace">☐</span> Show best place
          </button>

          <button
            class="settingBtn"
            @click="option.bestTrade = !option.bestTrade"
          >
            <span v-if="option.bestTrade">☑</span>
            <span v-if="!option.bestTrade">☐</span> Show best trade
          </button>

          <button class="settingBtn" @click="toggleAutoplay()">
            <span v-if="option.autoPlay">☑</span>
            <span v-if="!option.autoPlay">☐</span> Auto play
          </button>
          <button
            class="settingBtn"
            @click="option.turboSpeed = !option.turboSpeed"
          >
            <span v-if="option.turboSpeed">☑</span>
            <span v-if="!option.turboSpeed">☐</span> Turbo speed
          </button>

          <button
            class="settingBtn"
            @click="option.showRTPStats = !option.showRTPStats"
          >
            <span v-if="option.showRTPStats">☑</span>
            <span v-if="!option.showRTPStats">☐</span> Show RTP stats
          </button>
        </div> -->

        <!--        <button
          v-show="!simulationGoing && !option.simScript"
          class="settingBtn"
          @click="toggleInvisibleSim()"
        >
          <span v-if="option.invisibleSim">☑</span>
          <span v-if="!option.invisibleSim">☐</span> Simulate game with no user
          interface & LIVE stats
        </button> -->

        <!--      <button
          v-show="!simScriptOn && !option.invisibleSim"
          class="settingBtn"
          @click="option.simScript = !option.simScript"
        >
          <span v-if="option.simScript">☑</span>
          <span v-if="!option.simScript">☐</span> Simulate game with no user interface & fixed number of rounds (fastest!)
        </button>-->
        <!--    <div v-if="option.simScript">script options go here.</div> -->
        <div v-if="option.invisibleSim">
          <!--     <label>Rounds to simulate:</label>
          <select class="settingBtn" v-model="picked.simRounds">
            <option v-for="(o,i) in option.simRounds" :value="o" v-bind:key="i + 'rounds'">{{o}}</option>
          </select>-->

          <button
            v-show="!simulationGoing"
            class="settingBtn"
            @click="startSimulation()"
          >
            Start simulation
          </button>
          <button
            v-show="simulationGoing"
            class="settingBtn"
            @click="stopSimulation()"
          >
            STOP simulator
          </button>
        </div>
      </div>
    </div>

    <div v-if="statsOpen">
      <div class="topInfoBox">
        <button
          @click="statsOpen = false"
          style="
            position: absolute;
            right: 0.5em;
            top: 0.5em;
            width: 2em;
            height: 2em;
          "
        >
          X
        </button>

        <h3>Live game stats</h3>
        <p>
          RTP:
          <b>{{ getRTP() }}%</b>
          <br />
          Rounds played: {{ formatNumber(RTP.round) }}
          <br />
          Total Bet: ${{ formatNumber(RTP.totalBet) }} | Total Win: ${{
            formatNumber(RTP.totalWin)
          }}
          | Trades: {{ formatNumber(RTP.tradeCount) }},
          {{
            RTP.round > 0
              ? ((RTP.tradeCount / RTP.round) * 100).toFixed(2)
              : "0"
          }}%
        </p>

        <table class="statsTbl" style="border-style: solid; border-width: 1">
          <tr>
            <th>Hand</th>
            <th>Reward</th>
            <th>
              Total count |
              <br />% of all rounds
            </th>
            <th>
              Win with no bonus |
              <br />% of all rounds
            </th>
            <th>
              Win with bonus |
              <br />% of all wins
            </th>
            <th>
              Win amount |
              <br />% of all wins
            </th>
          </tr>
          <tr v-for="(r, i) in stats" :key="i + 'stat'">
            <td>{{ r.hand }}</td>
            <td>{{ r.reward }}</td>
            <td>
              {{ formatNumber(r.totalCount) }} |
              {{ ((r.totalCount / RTP.round) * 100).toFixed(6) }}%
            </td>
            <td>
              {{ formatNumber(r.noBonus) }} |
              {{ ((r.noBonus / RTP.round) * 100).toFixed(6) }}%
            </td>
            <td>
              {{ formatNumber(r.fromBonus) }} |
              {{ ((r.fromBonus / RTP.round) * 100).toFixed(6) }}%
            </td>
            <td>
              ${{ formatNumber(r.winValue) }} |
              {{ ((r.winValue / RTP.totalWin) * 100).toFixed(6) }}%
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div
      v-if="
        option.bestPlace &&
        stage.placeCards &&
        !option.invisibleSim &&
        !option.autoPlay
      "
      style="
        position: absolute;
        bottom: 0.5%;
        left: 20.5rem;
        font-size: 1rem;
        cursor: pointer;
        color: lightyellow;
        background: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        padding-bottom: 0rem;
      "
    >
      <b>Best place highlighted!</b>
    </div>
    <div
      v-if="!statsOpen && option.showRTPStats"
      style="
        position: absolute;
        bottom: 0.5%;
        right: 3rem;
        font-size: 1rem;
        cursor: pointer;
        color: lightyellow;
        background: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        padding-bottom: 0rem;
      "
    >
      RTP:
      <b>{{ getRTP() }}%</b>
      <button @click="statsOpen = !statsOpen">View more stats</button>
    </div>
    <div
      v-if="
        option.bestTrade &&
        stage.pickTrade &&
        !option.invisibleSim &&
        !option.autoPlay
      "
      style="
        position: absolute;
        bottom: 0.5%;
        left: 20.5rem;
        font-size: 1rem;
        cursor: pointer;
        color: lightyellow;
        background: rgba(0, 0, 0, 0.5);
        padding: 0.5rem;
        padding-bottom: 0rem;
      "
    >
      <b>{{ autoTradeMsg }}</b>
    </div>

    <!-- ENDF TEST FILEDS -->

    <div style="display: none">
      <audio id="soundFlip">
        <source
          src="/static/sounds/cardFlip.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </audio>
      <audio id="soundLabel">
        <source
          src="/static/sounds/msmh_wand.mp3"
          type="audio/mpeg"
          preload="auto"
        />
        Your browser does not support the audio element.
      </audio>
      <audio id="dSoundDeal">
        <source
          src="/static/sounds/cardFlip2.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </audio>
      <audio id="soundClearCards">
        <source
          src="/static/sounds/mp_deal.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </audio>
      <audio id="playerWins">
        <source
          src="/static/sounds/m_multiCashOut.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </audio>
      <audio id="soundBtnPress">
        <source
          src="/static/sounds/button.ogg"
          type="audio/ogg"
          preload="auto"
        />
      </audio>
      <audio id="chipClick">
        <source
          src="/static/sounds/chipClick.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </audio>
      <audio id="endRound">
        <source
          src="/static/sounds/playerWins.mp3"
          type="audio/mpeg"
          preload="auto"
        />
      </audio>

      <img src="./assets/cards/AC.svg" />
      <img src="./assets/cards/JC.svg" />
      <img src="./assets/cards/JD.svg" />
      <img src="./assets/cards/JH.svg" />
      <img src="./assets/cards/JS.svg" />
      <img src="./assets/cards/KC.svg" />
      <img src="./assets/cards/KD.svg" />
      <img src="./assets/cards/KH.svg" />
      <img src="./assets/cards/KS.svg" />
      <img src="./assets/cards/QC.svg" />
      <img src="./assets/cards/QD.svg" />
      <img src="./assets/cards/QH.svg" />
      <img src="./assets/cards/QS.svg" />
      <!-- <img src="./assets/cards/cardBack2.svg"> -->
    </div>
  </div>
</template>

<script>
import bus from "./bus";
import logo from "./components/logo";
import waterMark1 from "./components/waterMark1";
import waterMark2 from "./components/waterMark2";
import waterMark3 from "./components/waterMark3";
import menuBtns from "./components/menuBtns";
import cashDisplay from "./components/cashDisplay";
import btnRight from "./components/btnRight";
//import buttons from "./components/buttons.vue";
import placeBtn from "./components/placeBtn.vue";
//import btnLeftBet from "./components/btnLeftBet";
import card from "./components/card";
//import placeCard from "./components/placeCard";
//import bonusCards from "./components/bonusCards";
import payTable from "./components/payTable";
//import slideBtns from "./components/slideBtns";
import resultLable from "./components/resultLable.vue";
//import resultLableV from "./components/resultLabelV.vue";
import dealerPerson from "./gameLogic/dealer";
import handResult from "./gameLogic/handResult.js";
import simulator from "./gameLogic/simulator.js";

import info from "./components/info";
import login from "./components/login";
import again from "./components/playAgain";
//import stringWins from "./components/stringWins";
//import tapLabels from "./components/tapLabels";
/*
import autoPlacer from "./gameLogic/autoPlacer";
import autoTrader from "./gameLogic/autoTrader"; */
import tests from "./gameLogic/testCases";
//import { ref } from "vue";
import soundMixins from "./soundMixin.js";

var finalResults = new handResult();

var primaryDeck = new dealerPerson(),
  cardPos = [
    "c1Pos",
    "c2Pos",
    "c3Pos",
    "c4Pos",
    "c5Pos",
    "c1Pos",
    "c2Pos",
    "c3Pos",
    "c4Pos",
    "c5Pos",
  ];

export default {
  name: "app",
  mixins: [simulator, soundMixins],
  components: {
    login,
    menuBtns,
    logo,
    waterMark1,
    waterMark2,
    waterMark3,
    cashDisplay,
    btnRight,
    //  btnLeftBet,
    //  mainCards,
    card,
    //    placeCard,
    //bonusCards,
    payTable,
    info,
    again,
    // tapLabels,
    //  slideBtns,
    //    stringWins,
    //  placeBtn,
    resultLable,
    //  resultLableV,
  },
  data() {
    return {
      results: [],
      gameOn: true,
      RTP: {
        totalWin: 0,
        totalBet: 0,
        round: 0,
        tradeCount: 0,
      },
      cardBack: "",
      showWater: true,
      showWater2: true,
      bgImg: "background-image: url('./static/BBGG1.jpg')",
      bgImgs: ["1", "2", "3"],
      currentImg: 2,
      testScenarios: tests,
      /*  stringSecenarios: stringTests,
      selectedString: stringTests[0].cards, */
      presetCards: 0, //CHANGE TO 0 for dev!
      option: {
        autoPlay: false,
        bestPlace: false,
        bestTrade: false,
        turboSpeed: false,
        showRTPStats: false,
        invisibleSim: false,
        simRounds: [1, 100, 1000, 10000],
        simScript: false,
      },
      picked: {
        simRounds: 100,
      },
      infoBoxOpen: false,
      stage: {
        newRound: true,
        animationDone: true,
        results: false,
        newGame: false,
        showWin: false,
        roundEnds: false,
        ride1: false,
        ride2: false,
      },
      /*  MDIndex: -1, */
      cash: {
        balance: 10000,
        totalBet: 0,
        betWin: 100,
        win: 0,
        hands: 5,
        coinValue: 1, // changes as active coin option changes.
        coinOptions: [1, 2, 5, 10, 20], // options
        activeCoinOption: 0, //selected option
        betsHeld: 3,
      },
      holdReason: "",
      primaryCards: {
        specs: primaryDeck.cards,
        deal: Array(4).fill(false),
        flip: Array(4).fill(false),
      },
      dCards: {
        specs: [],
        deal: [],
        flip: [],
      },
      cPos: cardPos,
      labelPos: ["label2", "label3", "label4"],
      //  selected: cardSelected,
      newBonus: false,
      bonusTable: 0,
      plusOne: false,
      /* holdHeldLabel: "HOLD", */
      stringWinText: [],
      tradesPicked: 0,
      placePossible: false,
      tradePossible: false,
      placeSpecs: {
        done: 0,
        need: 2,
      },
      cardOnTableToPlace: false,
      tradableHand: [true, true, true],
      bonusCardIndex: undefined,
      autoTradeMsg: "",
      settingsOpen: false,
    };
  },

  /*   setup(props) {
    console.log(props); // { user: '' }

    const myCards = ref([]);
    const getCards = () => {
      myCards.value = dealerPerson.getCard(0, "", "cards");
    };

    return { myCards, getCards };
  }, */
  /*   filters: {
    formatNumber: function(value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }, */
  methods: {
    pull() {
      this.cash.betsHeld--;
      this.cash.balance =
        this.cash.balance + this.cash.coinValue * this.cash.hands;

      this.mainBtn();
    },
    formatNumber: function (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    toggleAutoplay() {
      //option.autoPlay = !option.autoPlay
      if (!this.option.autoPlay) {
        this.option.autoPlay = true;
        this.option.bestPlace = true;
        this.option.bestTrade = true;
      } else {
        this.option.autoPlay = false;
        this.option.bestPlace = false;
        this.option.bestTrade = false;
      }
    },
    toggleInvisibleSim() {
      if (!this.option.invisibleSim) {
        this.option.invisibleSim = true;
        this.option.invisibleSim = true;
        this.option.showRTPStats = true;
        this.option.autoPlay = true;
        this.option.bestPlace = true;
        this.option.bestTrade = true;
        this.option.turboSpeed = true;
      } else {
        this.option.invisibleSim = false;
        this.option.invisibleSim = false;
        this.option.showRTPStats = false;
        this.option.autoPlay = false;
        this.option.bestPlace = false;
        this.option.bestTrade = false;
        this.option.turboSpeed = false;
      }
    },
    openSettings() {
      this.settingsOpen = !this.settingsOpen;
    },
    getRTP() {
      var result = (this.RTP.totalWin / this.RTP.totalBet) * 100;

      if (this.RTP.totalBet === 0) {
        return "TBD";
      } else return result.toFixed(2);
    },
    /*     checkStageResult(d, from, to) {
      return this.stage.results ? d.slice(from, to) : [];
    }, */
    /*     updateBonus() {
      this.playChipClick();
      if (this.bonusTable < 2) {
        this.bonusTable++;
      } else {
        this.bonusTable = 0;
      }
    }, */
    changeBet() {
      if (this.cash.activeCoinOption >= this.cash.coinOptions.length - 1) {
        this.cash.activeCoinOption = 0;
      } else {
        this.cash.activeCoinOption++;
      }
      this.playChipClick();
      this.cash.coinValue = this.cash.coinOptions[this.cash.activeCoinOption];
    },
    updateHands() {
      if (this.cash.hands === 10) {
        this.cash.hands = 1;
      } else {
        this.cash.hands++;
      }
      this.playChipClick();
    },
    /* removeRevCards(handNum) {
      var firstCard = this.slideOptions[this.originalSlide][handNum],
        lastCard = firstCard + 4;
      for (var s = 0; s < this.showMainCard.length; s++) {
        if (s < firstCard || s > lastCard) {
          this.showMainCard.splice(s, 1, false);
        }
      }
      this.playDealSound();
      return {
        lCard: lastCard,
        fCard: firstCard
      };
    }, */

    openInfoBox() {
      this.infoBoxOpen = true;
      document.getElementById("infoFrame").style.zIndex = "1";
    },
    mainBtn() {
      if (this.stage.newRound) {
        this.deal();
      } else if (this.stage.ride1) {
        this.ride1();
      } else {
        this.ride2();
      }
    },
    ride1() {
      this.stage.ride1 = false;
      this.primaryCards.deal.splice(3, 1, true);
      this.playDealSound();

      this.flipPrimaryCards(
        this.option.invisibleSim ? 0 : this.option.turboSpeed ? 30 : 300,
        [3],
        2
      );
    },
    ride2() {
      this.stage.ride2 = false;
      var cardsToFlip = [];
      for (let i = 0; i < this.cash.hands; i++) {
        cardsToFlip.push(i);
      }

      this.flipFinalCards(
        this.option.invisibleSim ? 0 : this.option.turboSpeed ? 30 : 300,
        cardsToFlip
      );
    },
    dealFinalCards() {
      //var cardsToFlip = [];
      for (let i = 0; i < this.cash.hands; i++) {
        // cardsToFlip.push(i);
        setTimeout(
          () => {
            this.dCards.deal.splice(i, 1, true);
            this.playDealSound();
            if (i === this.dCards.specs.length - 1) {
              // console.log("FLIP 3 cards here.");

              this.flipPrimaryCards(
                this.option.invisibleSim
                  ? 0
                  : this.option.turboSpeed
                  ? 30
                  : 300,
                [0, 1, 2],
                1
              );

              /*         this.flipFinalCards(
                this.option.invisibleSim
                  ? 0
                  : this.option.turboSpeed
                  ? 30
                  : 300,
                cardsToFlip
              ); */
            }
          },
          this.option.invisibleSim
            ? 0
            : this.option.turboSpeed
            ? i * 30
            : i * 200
        );
      }
    },
    flipFinalCards(initialDelay, cards) {
      cards.forEach((c, i, a) => {
        if (i <= a.length - 1) {
          bus.emit("cardsUpdated", {
            newCard: this.dCards.specs[c],
            cardNum: c,
            cardType: "dCards",
          });

          setTimeout(() => {
            this.dCards.flip.splice(c, 1, true);

            this.playFlipSound();

            setTimeout(
              () => {
                this.analyzeResults(this.dCards.specs[c], i);
              },
              this.option.invisibleSim ? 0 : this.option.turboSpeed ? 30 : 300
            );
          }, initialDelay);
          initialDelay =
            initialDelay +
            (this.option.invisibleSim ? 0 : this.option.turboSpeed ? 30 : 900);
        }
      });
    },
    endRound() {
      var totalwin = 0;

      this.results.forEach((r) => {
        if (r.payout > 0) {
          totalwin += r.win;
        }
      });

      this.stage.results = true;
      this.stage.newGame = true;
      this.stage.newRound = true;
      this.stage.roundEnds = true;
      this.cash.win = totalwin;
      this.cash.balance = this.cash.balance + totalwin;
      this.RTP.totalWin += totalwin;

      bus.emit("updateCashDisplay", this.cash);
    },
    deal() {
      if (this.gameOn) {
        if (this.stage.results) {
          this.stage.newGame = false;
          this.stage.newRound = false;
          this.reset();

          setTimeout(
            () => {
              this.dealPrimaryCards();
            },
            this.option.invisibleSim ? 0 : this.option.turboSpeed ? 90 : 900
          );
        } else {
          primaryDeck.newDeck([]);
          this.stage.newRound = false;
          this.dealPrimaryCards();
        }

        this.cash.totalBet =
          this.cash.betsHeld * this.cash.coinValue * this.cash.hands;
        this.cash.balance = this.cash.balance - this.cash.totalBet;
        this.RTP.totalBet += this.cash.totalBet;
        this.RTP.round++;

        this.playBtnSound();
      }
    },
    prepDCards() {
      var removedCards = {};
      this.primaryCards.specs.forEach((d) => {
        removedCards[d] = true;
      });

      // console.log(removedCards);

      var dealers = Array(this.cash.hands).fill(new dealerPerson());

      this.dCards.deal = Array(this.cash.hands).fill(false);
      this.dCards.flip = Array(this.cash.hands).fill(false);

      dealers.forEach((d) => {
        d.newDeck(removedCards);
        d.getCard(0, "", "cards");
        this.dCards.specs.push(d.cards[0]);
      });
      this.dealFinalCards();
    },
    dealPrimaryCards() {
      for (let i = 0; i < 4; i++) {
        if (this.primaryCards.specs[i] === "") {
          primaryDeck.getCard(
            i,
            this.testScenarios[this.presetCards].cards,
            "cards"
          );
        }

        setTimeout(
          () => {
            this.primaryCards.deal.splice(i, 1, true);
            this.playDealSound();

            if (i === 3) {
              setTimeout(
                () => {
                  this.prepDCards();
                },
                this.option.invisibleSim
                  ? 0
                  : this.option.turboSpeed
                  ? i * 30
                  : i * 200
              );
            }

            /*  if (i === 2) {
              this.flipPrimaryCards(
                this.option.invisibleSim
                  ? 0
                  : this.option.turboSpeed
                  ? 30
                  : 300,
                [0, 1, 2],
                1
              );
            } */
          },
          this.option.invisibleSim
            ? 0
            : this.option.turboSpeed
            ? i * 30
            : i * 200
        );
      }
    },

    analyzeResults(c, i) {
      var cards = [c];
      for (var j = 0; j < 4; j++) {
        cards.push(this.primaryCards.specs[j]);
      }
      /*     this.primaryCards.specs.forEach((s) => {
        cards.push(s);
      });
 */
      var result = finalResults.fiveCards(cards);
      if (result.payout > 0) {
        result.win =
          result.payout * this.cash.betsHeld * this.cash.coinValue +
          this.cash.betsHeld * this.cash.coinValue;
      }
      this.results.push(result);

      if (i === this.cash.hands - 1) {
        this.endRound();
      }

      /*

      var totalwin = 0;

      this.results.forEach((r) => {
        if (r.rank > 0) {
          this.stats[r.label].totalCount++;
          if (primaryDeck.bonusCardPlayed) {
            this.stats[r.label].fromBonus++;
          } else {
            this.stats[r.label].noBonus++;
          }
        }

        r.reward = this.cash.coinValue * r.payout;
        totalwin += r.reward;

        if (r.rank > 0) {
          this.stats[r.label].winValue += r.reward;
        }
      }); */

      // bus.emit("updateCashDisplay", this.cash);

      if (this.option.autoPlay) {
        setTimeout(
          () => {
            this.deal();
          },
          this.option.invisibleSim ? 0 : this.option.turboSpeed ? 200 : 2000
        );
      }
    },

    reset() {
      this.results = [];
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.primaryCards.specs.splice(i, 1, "");
          this.primaryCards.deal.splice(i, 1, false);
          this.primaryCards.flip.splice(i, 1, false);
        }
      });

      this.dCards.specs = [];
      this.dCards.deal = [];
      this.dCards.flip = [];
      this.cash.betsHeld = 3;

      this.soundClearCards.play();

      primaryDeck.newDeck([]);

      for (var key in this.stage) {
        this.stage[key] = false;
      }

      this.showWater = true;
      this.showWater2 = true;

      this.cash.win = 0;
    },
    flipPrimaryCards(initialDelay, cards, rideNum) {
      cards.forEach((c, i, a) => {
        if (i <= a.length - 1) {
          bus.emit("cardsUpdated", {
            newCard: this.primaryCards.specs[c],
            cardNum: c,
            cardType: "cards",
          });

          setTimeout(() => {
            this.primaryCards.flip.splice(c, 1, true);
            this.playFlipSound();
            if (i === a.length - 1) {
              //  this.prepDCards();

              setTimeout(
                () => {
                  if (rideNum === 1) {
                    this.stage.ride1 = true;
                  } else if (rideNum === 2) {
                    this.stage.ride2 = true;
                  }
                },
                this.option.invisibleSim ? 0 : this.option.turboSpeed ? 30 : 300
              );
            }
          }, initialDelay);
          initialDelay =
            initialDelay +
            (this.option.invisibleSim ? 0 : this.option.turboSpeed ? 30 : 100);
        }
      });
    },
    cycleBgImg() {
      setInterval(() => {
        this.changeBG();
      }, 180000);
    },
    changeBG() {
      if (this.currentImg >= this.bgImgs.length - 1) {
        this.currentImg = 0;
      } else {
        this.currentImg++;
      }
      this.bgImg =
        "background-image: url('./static/BBGG" +
        this.bgImgs[this.currentImg] +
        ".jpg')";
    },
    setCardBack() {
      var URL = window.location.href,
        hashIndex = URL.indexOf("#");
      if (hashIndex < 0) {
        this.cardBack = 'background-image: url("./static/cardBacks/RG.png")';
      } else {
        this.cardBack =
          'background-image: url("./static/cardBacks/' +
          URL.substr(hashIndex + 1, URL.length) +
          '.png")';
      }
    },
  },
  mounted() {
    this.cycleBgImg();
    this.setCardBack();
  },
};
</script>

<style>
@import url(./assets/app.css);
@import url(./assets/buttons.css);
</style>
