<template>
  <div class="loginFrame" id="loginFrame">
    <transition name="fade">
      <div v-if="open" class="loginBox">
        <div style="margin: 0 auto; text-align:center; padding: 2em;">
          Password <input type="text" v-model="tryString" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
var mnDay = new Date().getDate();
export default {
  name: "login",
  props: ["open"],
  data() {
    return {
      tryString: "",
    };
  },
  beforeMount() {},
  methods: {
    closeBox: function() {
      this.$emit("startGame");
      document.getElementById("loginFrame").style.zIndex = "-1";
    },
  },
  watch: {
    tryString: function(d) {
      if (d === "TimAlex" + mnDay) {
        this.closeBox();
      }
    },
  },
  mounted() {
    if (window.location.hostname === "localhost") {
      this.closeBox();
    }
    this.closeBox();
  },
};
</script>

<style scoped>
.loginFrame {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
}

.loginBox {
  position: relative;
  width: 100%;
  background: rgba(0, 0, 0, 1);
  color: white;
  overflow: auto;
  height: 100%;
  font-size: 1em;
}
</style>
