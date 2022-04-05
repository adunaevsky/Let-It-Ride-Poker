export default {
    methods: {
        playDealSound() {
            this.soundDeal.pause();
            this.soundDeal.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundDeal.play() || nopromise).catch(function() {});
        },
        playCashSound() {
            this.soundCash.pause();
            this.soundCash.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundCash.play() || nopromise).catch(function() {});
        },
        playFlipSound() {
            this.soundDeal.pause();
            this.soundDeal.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundDeal.play() || nopromise).catch(function() {});
        },
        playStarSound() {
            if (this.pDeal) {
                this.soundStar.pause();
                this.soundStar.currentTime = 0;
                var nopromise = {
                    catch: new Function(),
                };
                (this.soundStar.play() || nopromise).catch(function() {});
            }
        },
        playBtnSound() {
            this.soundBtn.play()
            this.soundBtn.pause();
            this.soundBtn.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundBtn.play() || nopromise).catch(function() {});
        },
        playBetsPlease() {
            this.soundBets.pause();
            this.soundBets.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundBets.play() || nopromise).catch(function() {});
        },
        playChipClick() {
            this.soundChip.pause();
            this.soundChip.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundChip.play() || nopromise).catch(function() {});
        },
        playWinMsg() {
            this.soundPlayerWins.pause();
            this.soundPlayerWins.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundPlayerWins.play() || nopromise).catch(function() {});
        },
        endRound() {
            this.soundEndRound.pause();
            this.soundEndRound.currentTime = 0;
            var nopromise = {
                catch: new Function(),
            };
            (this.soundEndRound.play() || nopromise).catch(function() {});
        },
    },
    mounted() {



        this.soundFlip = document.getElementById("soundFlip");
        this.soundClearCards = document.getElementById("soundClearCards");
        this.soundDeal = document.getElementById("dSoundDeal");
        this.soundCash = document.getElementById("soundCashOut");
        this.soundStar = document.getElementById("soundStar");
        this.soundBtn = document.getElementById("soundBtnPress");
        this.soundBets = document.getElementById("betsPlease");
        this.soundChip = document.getElementById("chipClick");
        this.soundIntro = document.getElementById("loadingDone");
        this.soundPlayerWins = document.getElementById("playerWins");
        this.soundPlayerWins.volume = 0.5;
        this.soundEndRound = document.getElementById("soundLabel");
    }

}