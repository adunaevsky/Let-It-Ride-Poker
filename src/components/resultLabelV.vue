<template>
  <div  v-if="r.rank > 0" style="position:absolute;  width: 30%;" :style="{left: i === 0 ? '8%' : i === 1 ? '32%' : '54%'}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 160">
      <g transform="rotate(-90 95 74)">
        <rect
          :fill="r.fill"
          style="stroke:#bababa; stroke-miterlimit:10;fill-opacity:0.5"
          x="30"
          y="25"
          rx="2"
          width="105"
          height="10"
        />
        <text
         
          class="payTableText"
          text-anchor="middle"
          font-weight="bold"
          font-size="7"
          x="70"
          y="32.5"
          fill="#ffffff"
        >{{r.label}}</text>
<!--         <text
          v-if="r.rank === 0"
          class="payTableText"
          text-anchor="middle"
          font-weight="bold"
          font-size="8"
          x="82"
          y="32.5"
          fill="#ffffff"
        >{{r.label}}</text> -->
        <text
          v-if="r.rank > 0"
          class="labelCash payTableText"
          text-anchor="end"
          font-weight="bold"
          font-size="7"
          x="120"
          y="32.5"
          fill="#02F53A"
        >{{dollarFormat(r.reward)}}</text>
      </g>
    </svg>
  </div>
  <!--    </div> -->
  <!--   </div> -->
</template>
<script>
export default {
  name: "resultLableV",
  props: ["r","i"],
  methods: {
    dollarFormat(x) {
      if (x === "") {
        return x;
      }
      return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
};
</script>