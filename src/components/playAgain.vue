<template>
  <div class="again">
    <svg
      @click="deal()"
      class="againImg noSelect"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
    >
      <text
        text-anchor="middle"
        class="againText glow"
        style="fill:red"
        font-weight="bold"
        font-size="8"
        x="50"
        y="8"
        fill="#D7522D"
      >
        Play Again!
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: "playAgain",
  methods: {
    deal: function() {
      this.$emit("deal");
    },
  },
};
</script>

<style>
.againText {
  paint-order: stroke;
  stroke: #ffffff;
  /*  fill: #ffffff; */
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.again {
  position: relative;
}

.againImg {
  cursor: pointer;
  width: 100%;
  position: absolute;
}

@-webkit-keyframes glow {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
@-moz-keyframes glow {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
@-o-keyframes glow {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}
@keyframes glow {
  0% {
    opacity: 0.1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.1;
  }
}

.glow {
  -webkit-animation: glow 1s infinite; /* Safari 4+ */
  -moz-animation: glow 1s infinite; /* Fx 5+ */
  -o-animation: glow 1s infinite; /* Opera 12+ */
  animation: glow 1s infinite; /* IE 10+, Fx 29+ */
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .again {
    top: 90%;
    width: 28%;
    left: 77%;
    /*  margin: 0 auto; */
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .again {
    top: 3%;
    width: 55%;
    left: 18%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .again {
    top: 90%;
    width: 36%;
    left: 22%;
  }
}
</style>
