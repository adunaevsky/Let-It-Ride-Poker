<template>
    <div class="slideChoice">
         <svg class="againImg noSelect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40">

           <rect @click="slideRight()" class="rectChoice" fill="#3E9D00" x="1" y="1" rx="10" ry="10" width="75" height="25" />
            <text @click="slideRight()" text-anchor="middle" class="arrows glow" font-weight="bold" font-size="25" x="40" y="22" fill="#ffffff" >
               > > ></text>

           <rect  @click="slideLeft()" fill="#3E9D00" class="rectChoice" x="123" y="1" rx="10" ry="10" width="75" height="25" />
            <text @click="slideLeft()" text-anchor="middle" class="arrows glow" font-weight="bold" font-size="25" x="160" y="22" fill="#ffffff" >
               < < < </text>
        </svg>

    </div>
</template>


<script>
export default {
  name: "slideBtns",
  methods: {
    slideRight: function() {
      this.$emit("slideRight");
    },
    slideLeft: function() {
      this.$emit("slideLeft");
    }
  }
};
</script>

<style scoped>
.rectChoice {
  stroke: #bababa;
  stroke-miterlimit: 10;
}
.arrows {
  paint-order: stroke;
  stroke: #0e520b;
  /*  fill: #ffffff; */
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.slideChoice {
  position: relative;
}

.againImg {
  width: 100%;
  position: absolute;
}

@keyframes glow {
  0% { transform: translate(-0.1em); }
  50% {transform: translate(0.1em);}
  100% { transform: translate(-0.1em);}
}

.glow {
  -webkit-animation: glow 1s infinite; /* Safari 4+ */
  -moz-animation: glow 1s infinite; /* Fx 5+ */
  -o-animation: glow 1s infinite; /* Opera 12+ */
  animation: glow 1s infinite; /* IE 10+, Fx 29+ */
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .slideChoice {
    top: 56%;
    width: 56%;
    left: 22%;
    /*  margin: 0 auto; */
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .slideChoice {
    top: 55.5%;
    width: 95%;
    left: 2.5%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .slideChoice {
    top: 50%;
    width: 76%;
    left: 2%;
  }
}
</style>