<template>
  <div id="mainCards" :class="{ cardArea: true, held: hold, unHeld: !hold }">
    <div class="mainCards">
      <transition name="cardAnimation">
        <div
          v-if="showCard"
          :class="[defaultClasses, cardPosition, flip ? 'flip' : '']"
        >
          <div class="flipper">
            <div class="front cBack1"></div>
            <div :class="cardRank"></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import bus from "./../bus";

export default {
  name: "mainCards",
  props: ["flip", "showCard", "cardPosition", "cardNum"],
  data() {
    return {
      defaultClasses: "cSize flip-container",
      cardRank: "",
      hold: false,
      /*       cardArea:"cardArea",
      held:' ' */
    };
  },
  methods: {},
  mounted() {
    bus.on("cardsUpdated", (c) => {
      if (c.cardNum === this.cardNum) {
        this.cardRank = "back " + c.newCard;
      }
    });
    bus.on("holdUpdated", (c) => {
      if (c.cardNum === this.cardNum) {
        this.hold = c.held;
      }
    });
    bus.on("resetHold", (c) => {
      this.hold = false;
    });
  },
};
</script>
