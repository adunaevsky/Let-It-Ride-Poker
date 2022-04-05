<template>
    <div class="buttonsMenu">
        <div class="btnBase menuBtnPos1 fullScreenBtn" v-on:click="fullScreen"></div>
        <div class="btnBase menuBtnPos2 infoBtn"  v-on:click="openInfo"></div>
    </div>
</template>

<script>
export default {
    name: 'menuBtns',
    methods: {
        openInfo: function() {
            this.$emit('openInfo');
        },
        fullScreen: function() {
            if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            ) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                var element = document.body;
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }
        }
    }
}

</script>

<style scoped>

 
  *:fullscreen,
  *:-webkit-full-screen,
  *:-moz-full-screen {
    background-color: rgba(4, 27, 163, 0);
  }

.btnBase {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    cursor: pointer;
}

.fullScreenBtn {
    background-image: url("../assets/buttons/FullScreen-1.svg");
}

.fullScreenBtn:hover {
    background-image: url("../assets/buttons/FullScreen-2.svg");
}

.fullScreenBtn:active {
    background-image: url("../assets/buttons/FullScreen-3.svg");
}

.infoBtn {
    background-image: url("../assets/buttons/Info-1.svg");
}

.infoBtn:hover {
    background-image: url("../assets/buttons/Info-2.svg");
}

.infoBtn:active {
    background-image: url("../assets/buttons/Info-3.svg");
}


@media all and (min-aspect-ratio: 970 / 600) {
    /*LANDSCAPE MODE*/
    .menuBtnPos1 {
        left: 1%;
        width: 7%;
        padding-bottom: 7%;
    }
    .menuBtnPos2 {
        left: 9%;
        width: 7%;
        padding-bottom: 7%;
    }
}

@media all and (max-aspect-ratio: 520 / 600) {
    /*PORTRAIT MODE*/
    .menuBtnPos1 {
        left: 1%;
        width: 10%;
        padding-bottom: 10%;
    }
    .menuBtnPos2 {
        left: 13%;
        width: 10%;
        padding-bottom: 10%;
    }
}

@media all and (max-aspect-ratio: 970 / 600) and (min-aspect-ratio: 520 / 600) {
    /*SQUARE (DESKTOP) MODE*/
    .menuBtnPos1 {
        left: 1%;
        width: 7%;
        padding-bottom: 7%;
    }
    .menuBtnPos2 {
        left: 10%;
        width: 7%;
        padding-bottom: 7%;
    }
}
</style>