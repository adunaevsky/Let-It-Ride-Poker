<template>
  <div class="payTable">
    <div
      :class="showTable"
      class="payTblW oneColumn"
      :id="id.primaryOne"
      v-show="viewPrimary"
    ></div>
    <div
      :class="showTable"
      class="payTblW threeColumn"
      :id="id.primaryThree"
      v-show="viewPrimary"
    ></div>
  </div>
</template>

<script>
import tableMix1 from "./payTableMix1";
import tableMix3 from "./payTableMix3";
import tableValues from "../gameLogic/payTable";

export default {
  name: "payTable",
  data() {
    return {
      showTable: "",
      tableSwitch: true,
      table1: "",
      table2: "",
      id: {
        primaryOne: "oneCol",
        discardOne: "dOneCol",
        primaryThree: "threeCol",
        discardThree: "dThreeCol",
      },
      payTable: 0,
      viewPrimary: true,
      bonusValues: [],
    };
  },
  methods: {
    /*     changeTableView() {
      this.viewPrimary = !this.viewPrimary;
    }, */
    /*     changeBonus() {
      if (this.payTable < 2) {
        this.payTable++;
      } else {
        this.payTable = 0;
      }
      this.rendertables();
      console.log("update bonsu?!?!");
      this.$emit("updateBonus");
    }, */
    rendertables() {
      tableMix1(
        tableValues,
        this.baseBetValue,
        this.id.primaryOne,
        this.payTable
      );
      tableMix3(
        tableValues,
        this.baseBetValue,
        this.id.primaryThree,
        this.payTable
      );
      /*  dPayTbl1(this.bonusValues, this.baseBetValue, this.id.discardOne, this.payTable);
      dPayTbl3(this.bonusValues, this.baseBetValue, this.id.discardThree, this.payTable); */
    },
  },
  watch: {
    baseBetValue: function() {
      this.rendertables();
    },
  },
  props: ["baseBetValue"],
  mounted() {
    setTimeout(() => {
      this.rendertables();
      setTimeout(() => {
        this.showTable = "tblAnimation-enter-active loaded swap";
      }, 0);
    }, 0);
  },
};
</script>

<style scoped>
@-webkit-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@-moz-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@-o-keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}
@keyframes glow {
  0% {
    opacity: 0.5;
    fill: #ff004c;
  }
  50% {
    opacity: 1;
    fill: #231f20;
  }
  100% {
    opacity: 0.5;
    fill: #ff004c;
  }
}

.glow {
  fill: #231f20;
}
.pointer {
  cursor: pointer;
}
.glow {
  cursor: pointer;
  -webkit-animation: glow 1s infinite; /* Safari 4+ */
  -moz-animation: glow 1s infinite; /* Fx 5+ */
  -o-animation: glow 1s infinite; /* Opera 12+ */
  animation: glow 1s infinite; /* IE 10+, Fx 29+ */
}

@-webkit-keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-o-keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes swap {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.swap {
  -webkit-animation: swap 4s infinite; /* Safari 4+ */
  -moz-animation: swap 4s infinite; /* Fx 5+ */
  -o-animation: swap 4s infinite; /* Opera 12+ */
  animation: swap 4s infinite; /* IE 10+, Fx 29+ */
}

@supports (-ms-ime-align: auto) {
  .payTableText,
  .againText,
  .tapText {
    stroke-width: 0.4px !important;
  }
}

.tblAnimation-enter-active {
  animation: tblAnimation-in 0.5s;
}

.payTblW {
  opacity: 0;
  -moz-transition: opacity 1.5s;
  -webkit-transition: opacity 1.5s;
  -o-transition: opacity 1.5s;
  transition: opacity 1.5s;
}

.loaded {
  opacity: 1 !important;
}

@keyframes tblAnimation-in {
  0% {
    transform: scale(0.4);
    height: 0;
  }
  100% {
    transform: scale(1);
    height: 100%;
  }
}
@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .payTblW {
    position: absolute;
    width: 100%;
  }
  .payTable {
    width: 21.5%;
    top: 18%;
    left: 0.5%;
  }
  .threeColumn {
    display: none;
  }
  .oneColumn {
    display: block;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .payTblW {
    position: absolute;
    left: 0.5%;
    width: 98%;
  }
  .payTable {
    width: 100%;
    top: 19%;
  }
  .threeColumn {
    display: block;
  }
  .oneColumn {
    display: none;
  }

  /*   .changeBonus {
    top: 18rem;
    right: 1%;
  } */
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .payTblW {
    position: absolute;
    width: 100%;
  }

  .payTable {
    width: 18%;
    top: 31%;
    left: 83.5%;
  }
  .threeColumn {
    display: none;
  }
  .oneColumn {
    display: block;
  }
}
</style>
