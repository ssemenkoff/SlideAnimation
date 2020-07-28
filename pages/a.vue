<template>
  <div
    v-touch:moved="movedHandler"
    v-touch:moving="movingHandler"
    v-touch:end="endHandler"
  >
    <keep-alive>
      <div class="fullscreen a page">
        <n-link class="button" to="/a/b">Go to b</n-link>
        <n-link class="button" to="/a/b/c">Go to c</n-link>
      </div>
    </keep-alive>
    <div
      class="fullscreen"
      :class="!!touchStartTimestamp ? 'no-animation' : ''"
    >
      <nuxt-child
        class="overlapping-child"
        :class="computedClasses"
        :style="computedStyles"
      />
    </div>
  </div>
</template>
<script>
const THRESHOLD = 0.6;
const SWIPE_DURATION_TOLERANCE = 250;

export default {
  data() {
    return {
      offset: 0,
      touchX: 0,
      navigated: this.$route.name === 'a'? false : true,
      touchStartTimestamp: null,
      showTransition: false,
    };
  },
  methods: {
    movedHandler(event) {
      if (this.navigated) return;
      if (!event || event.type !== 'touchmove') {
        return;
      }

      const { clientX } = event.touches[0];
      this.touchX = clientX;
      this.touchStartTimestamp = event.timeStamp;
      this.$router.push('/a/b/');
    },
    movingHandler(event) {
      if (this.navigated) return;
      if (!event || event.type !== 'touchmove') {
        return;
      }

      const { clientX } = event.touches[0];
      this.offset = this.touchX - clientX;
    },
    endHandler(event) {
      if (this.navigated || !this.touchStartTimestamp) return;
      const touchDuration = event.timeStamp - this.touchStartTimestamp;
      const touchOffsetAbs = Math.abs(this.offset);

      if (touchOffsetAbs > 30 && touchDuration < SWIPE_DURATION_TOLERANCE) {
        this.confirmNavigation();
        return;
      }

      if (this.$el.clientWidth * THRESHOLD < touchOffsetAbs) {
        this.confirmNavigation();
        return;
      }

      this.revertNavigation();
    },
    revertNavigation() {
      this.$router.replace('/a');
      this.navigated = false;
      this.touchX = 0;
      this.touchStartTimestamp = null;
      
      this.offset = 0;
      this.showTransition = true;
      setTimeout(() => {
        this.showTransition = false;
      }, 500);
    },
    confirmNavigation() {
      this.navigated = true;
      this.navigatedBySwipe = true;

      this.touchX = 0;
      this.touchStartTimestamp = null;
      this.offset = 0;
      this.showTransition = true;
      setTimeout(() => {
        this.showTransition = false;
      }, 500);
    },
  },
  computed: {
    computedStyles() {
      if (this.navigated) {
        return null;
      }
      return {
        transform: `translateX(calc(100% - ${this.offset}px))`,
      }
    },
    computedClasses() {
      return this.showTransition ? 'navigation-animation' : '';
    },
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'a') {
      this.navigated = false;
    } else {
      if(!this.touchStartTimestamp) {
        this.navigated = true;
      }
    }
    next();
  }
};
</script>
<style>
  .a {
    background: linear-gradient(90deg, rgba(18,13,120,1) 0%, rgba(47,36,233,1) 100%);
  }

  .overlapping-child {
    height: 100%;
    width: 100%;
    position: relative;
    top: 0;
    left: 0;
  }

  .navigation-animation {
    transition: transform 300ms;
  }
</style>