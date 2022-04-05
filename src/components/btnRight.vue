<template>
  <svg
    class="lblBase lblSizeSmall"
    :class="{
      rFillDeal: specs.clr === 'red',
      rFillEffect: specs.clr === 'green',
    }"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 175.4 185"
  >
    <rect
      class="sideBtn"
      style="stroke: #fff; stroke-width: 6; opacity: 1"
      x="10"
      y="10"
      width="800.4"
      height="170"
      rx="85"
      ry="85"
    />
    <text
      class="sideBtn"
      style=" opacity: 0.8"
      text-anchor="middle"
      font-weight="bold"
      font-size="40"
      x="90"
      y="105"
      fill="#fff"
    >
      {{ specs.label }}
    </text>

    <rect
      class="bottomBtn"
      style="stroke: #fff; stroke-width: 6;; opacity: 0.8"
      x="30"
      y="10"
      width="140"
      height="370"
      rx="70"
      ry="70"
    />
    <text
      class="bottomBtn"
      style=" opacity: 0.8"
      text-anchor="middle"
      font-weight="bold"
      font-size="30"
      x="100"
      y="75"
      fill="#fff"
    >
      {{ specs.label }}
    </text>
  </svg>
</template>

<script>
export default {
  name: "btn",
  props: ["specs"],
};
</script>
