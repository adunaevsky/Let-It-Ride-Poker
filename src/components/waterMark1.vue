<template>

      <svg class="waterMark waterSet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50">
           <!--  <text text-anchor="middle" font-weight="bold" font-size="7" x="50" y="6" fill="#FFFFFF" opacity="0.15">
                PRIMARY HAND
                </text> -->
        </svg>  
</template>


<script>
export default {
  name: "waterMark"
};
</script>

<style>
.waterSet {
  position: absolute;
}

@media all and (min-aspect-ratio: 970 / 600) {
  /*LANDSCAPE MODE*/
  .waterSet {
    width: 33%;
    left: 30%;
  }
  .waterMark {
    top: 75%;
  }
  .waterMark2 {
    top: 38%;
  }
  .waterMark3 {
    top: 90%;
  }
}

@media all and (max-aspect-ratio: 520 / 600) {
  /*PORTRAIT MODE*/
  .waterSet {
    width: 50%;
    left: 25%;
  }
  .waterMark {
    top: 65%;
  }
  .waterMark2 {
    top: 45%;
  }
  .waterMark3 {
    top: 3%;
  }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
  /*SQUARE (DESKTOP) MODE*/
  .waterSet {
    width: 56%;
    left: 18%;
  }
  .waterMark {
    top: 62%;
  }
  .waterMark2 {
    top: 32%;
  }
  .waterMark3 {
    top: 82%;
  }
}
</style>