<template>
  <svg
    class="lblBase lblSizeSmall rFillEffect"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 175.4 190"
  >
    <g id="sideTradeBtn">
      <rect
        @click="place()"
        :class="{glow:placePossible}"
        class="sideBtn rFillEffect"
        style="stroke: #fff; stroke-width: 6;; opacity: 0.8"
        x="6"
        y="10"
        width="800.4"
        height="100"
        rx="50"
        ry="50"
      />
      <text
        @click="place()"
        class="sideBtn"
        style=" opacity: 0.8"
        text-anchor="middle"
        font-weight="bold"
        font-size="40"
        x="95"
        y="60"
        fill="#fff"
      >PLACE</text>
      <text
        @click="place()"
        class="sideBtn"
        style=" opacity: 0.8"
        text-anchor="middle"
        font-weight="bold"
        font-size="40"
        x="95"
        y="95"
        fill="#fff"
      >{{placeSpecs.done + 1}}/{{placeSpecs.need}}</text>
    </g>
    <g id="verticalTradeBtn">
      <rect
        @click="place()"
        :class="{glow:placePossible}"
        class="bottomBtn rFillEffect"
        style="stroke: #fff; stroke-width:4; opacity: 0.8"
        x="50"
        y="5"
        width="75"
        height="370"
        rx="35"
        ry="35"
      />
      <text
        @click="place()"
        class="bottomBtn"
        style=" opacity: 0.8"
        text-anchor="middle"
        font-weight="bold"
        font-size="18"
        x="87"
        y="40"
        fill="#fff"
      >PLACE</text>
      <text
        @click="place()"
        class="bottomBtn"
        style=" opacity: 0.8"
        text-anchor="middle"
        font-weight="bold"
        font-size="18"
        x="87"
        y="60"
        fill="#fff"
      >{{placeSpecs.done + 1}}/{{placeSpecs.need}}</text>
    </g>
  </svg>
</template>

<script>
export default {
  name: "placeBtn",
  props: ["placePossible",'placeSpecs'],
  methods: {
    place() {
      if (this.placePossible) {
        this.$parent.place();
      }
    }
  }
};
</script>

<style>
/* .lFillEffect {
  fill: rgb(16, 47, 7);
}

.lFillEffect:hover {
  fill: rgb(2, 91, 14);
}
.lFillEffect:active {
  fill: rgb(48, 135, 21);
} */
</style>