<template>
  <div class="logo">
    <!--    <img class="logoImg" src="../assets/MissPoker.svg" /> -->
    <img class="logoImg" src="../assets/LIR.svg" />
  </div>
</template>

<script>
export default {
  name: "logo",
  props: ["bonus"],
};
</script>

<style>
.logo {
  position: relative;
}

.logoImg {
  width: 100%;
  position: absolute;
}

.buttonsMenu {
  position: relative;
  top: 1%;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .logo {
    top: 5%;
    width: 50%;
    left: 22%;
    /*  margin: 0 auto; */
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .logo {
    top: 12%;
    width: 65%;
    left: 3%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .logo {
    top: 4%;
    width: 56%;
    left: 18%;
  }
}
</style>
