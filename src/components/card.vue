<template>
  <div
    id="cards"
    :class="{
      cardArea: location === 1,
      cardArea2: location === 2,
      cardArea3: location === 3,
      held: hold,
      fadeOut: checkFadeout(),
    }"
  >
    <div class="mainCards" v-if="!isSafari">
      <transition :name="turboSpeed ? '' : 'cardAnimation'">
        <div
          v-if="showCard"
          :class="[defaultClasses, cardPosition, flip ? 'flip' : '']"
        >
          <div
            class="flipper"
            :style="{ transition: turboSpeed ? '0s' : '0.6s' }"
          >
            <div class="front cBack1" :style="cardBack"></div>
            <div :class="cardRank"></div>
          </div>
        </div>
      </transition>
    </div>


    <div class="mainCards" v-else>
      <div
        v-if="showCard"
        :class="[defaultClasses, cardPosition]"
      >
        <div
         class="flipper"
        >
          <div v-show="!flip" class="front cBack1" :style="cardBack"></div>
          <div v-show="flip" :class="safariRank"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import bus from "./../bus";

export default {
  name: "mainCards",
  props: [
    "flip",
    "showCard",
    "cardPosition",
    "cardNum",
    "cardType",
    "held",
    "fadeOut",
    "cardBack",
    "turboSpeed",
    "location",
  ],
  data() {
    return {
      defaultClasses: "cSize flip-container",
      cardRank: "",
      hold: this.held,
      isSafari: false,
      safariRank:''
    };
  },
  methods: {
    checkFadeout() {
      return this.fadeOut;
    },
  },
  mounted() {
    if (
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
    ) {
      this.isSafari = true;
    }

    /* testing safari */
   // this.isSafari = true;

    bus.on("cardsUpdated", (c) => {
      if (c.cardNum === this.cardNum && c.cardType === this.cardType) {
        this.cardRank = "back " + c.newCard;
        this.safariRank = "safariBack " +c.newCard;
      }
    });
    bus.on("holdUpdated", (c) => {
      if (c.cardNum === this.cardNum && c.cardType === this.cardType) {
        this.hold = c.held;
      }
    });
    bus.on("resetHold", (c) => {
      if (c.cardType === this.cardType) {
        this.hold = c.hold;
      }
    });
  },
};
</script>

<style>
.cardAnimationAppear {
  transform: scale(1);
  transform-origin: 0% 0%;
  opacity: 1;
  /* animation: cardAnimation-in 0s; */
}

.cardAnimation-enter-active {
  animation: cardAnimation-in 0.5s;
}

.cardAnimation-leave-active {
  animation: cardAnimation-out 0.2s;
}

@keyframes cardAnimation-in {
  0% {
    transform: scale(1.4);
    transform-origin: 0% 500%;
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    transform-origin: 0% 0%;
    opacity: 1;
  }
}

@keyframes cardAnimation-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
    transform-origin: 0% -500%;
    opacity: 0.5;
  }
}
</style>
