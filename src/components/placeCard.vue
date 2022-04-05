<template>
  <div class="placeCardArea" :class="{ placeCardArea: true }">
    <div class="placeCardText">
      <svg
        style="width: 12%"
        class="lblBase lblSizeSmall rFillDeal"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 50"
        v-if="!placePossible"
      >
        <text
          class="placeTextTop"
          style=" opacity: 0.8"
          text-anchor="middle"
          font-weight="bold"
          font-size="15"
          x="50"
          y="15"
          fill="#fff"
        >
          PICK WHERE
        </text>
        <text
          class="placeTextTop"
          style=" opacity: 0.8"
          text-anchor="middle"
          font-weight="bold"
          font-size="15"
          x="50"
          y="45"
          fill="#fff"
        >
          TO PLACE
        </text>
      </svg>
    </div>
    <div class="placeCard">
      <transition name="cardAnimation">
        <div v-show="cardOnTable" class="cSize flip-container flip">
          <div class="flipper">
            <div
              class="front cBack1"
              style='background-image: url("./static/cardBacks/RG.png");'
            ></div>
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
  name: "placeCard",
  props: ["cardSpecs", "cardOnTable", "placePossible"],
  data() {
    return {
      defaultClasses: "cSize flip-container",
      cardRank: "back H8",
      hold: this.held,
      /*       cardArea:"cardArea",
      held:' ' */
    };
  },
  mounted() {
    bus.on("cardPlaceUpdated", (c) => {
      this.cardRank = "back " + c.newCard;
    });
  },
};
</script>

<style></style>
