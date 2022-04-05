<template>
    <div class="stringWin" v-if="showLabel">
         <svg class="stringWinImg noSelect" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
             <rect style="fill:#5b5b5b;" x="0.5" y="0.5" rx="2.5" width="99" height="6" />
             <rect style="fill:#FFE401;" x="1" y="1" rx="2" width="98" height="5" />

           <text text-anchor="middle" class="stringWinText" font-weight="bold" :font-size="dynamicSize" x="50" :y="vShift" fill="#fc142b" >
              Wins {{finalText}}</text>
            <!-- <text text-anchor="middle" class="stringWinText glow" font-weight="bold" font-size="8" x="50" y="16" fill="#D7522D" >
               Playing!</text> -->
        </svg>

    </div>
</template>


<script>
export default {
  name: "stringWins",
  props: ["stringWinText"],
  data() {
    return {
      showLabel: true
    };
  },
  computed: {
    finalText: function() {
      var result = "";
      if (this.stringWinText.length <= 1) {
        this.showLabel = false;
      } else {
        this.stringWinText.forEach((w, i, l) => {
          /*  if (i === 0) {
            result = w + ", ";
          } else */

          if (i === l.length - 1) {
            result = result + " $" + w;
          } else {
            result = result + "$" + w + " + ";
          }
        });
        this.showLabel = true;
      }
      return result;
    },
    dynamicSize: function() {
      if (this.stringWinText.length >= 7) {
        return 2;
      } else if (this.stringWinText.length < 5) {
        return 4;
      } else {
        return 3;
      }
    },
    vShift: function() {
      if (this.stringWinText.length < 5) {
        return 5;
      } else {
        return 4.5;
      }
    }
  }
};
</script>


<style>
.stringWinText {
  paint-order: stroke;
  stroke: #000000;
  /*  fill: #ffffff; */
  stroke-width: 0.8px;
  stroke-linecap: round;
  stroke-linejoin: round;
  font-weight: 800;
  font-family: Arial, Helvetica;
}

.stringWin {
  position: relative;
}

.stringWinImg {
  cursor: pointer;
  width: 100%;
  position: absolute;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .stringWin {
    top: 54%;
    width: 58%;
    left: 20%;
    /*  margin: 0 auto; */
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .stringWin {
    top: 51%;
    width: 95%;
    left: 2.5%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .stringWin {
    top: 42%;
    width: 80%;
    left: 0%;
  }
}
</style>