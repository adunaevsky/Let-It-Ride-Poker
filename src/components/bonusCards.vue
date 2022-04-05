<template>
    <div class="mainCards">

        <transition name="cardAnimation" v-for="(cardPos,index) in cardPositions" :key="index + 'cardBonus'">
            <div v-if="showCard[index]" :class="[defaultClasses, cardPos, flip[index] ? 'flip' : '' ]" v-flip="cards[index]">
            </div>

        </transition>
    
    </div>
</template>

<script>

export default {
    name: 'bonusCards',
    props: ["flip", "cards", "showCard", "bonusNum", "multiplyNum", "cardPositions"],
    data() {
        return {
            defaultClasses: 'cSize flip-container'
        }
    }
}
</script>

<style>

</style>