<template>
  <div 
    v-touch:moved="movedHandler"
    v-touch:moving="movingHandler"
    v-touch:end="endHandler"
    :style="pageStyles"
    :class="computedClasses"
  >
    <keep-alive>
      <div class="fullscreen b page">
        <n-link class="button" to="/a">Go to a</n-link>
        <n-link class="button" to="/a/b/c">Go to c</n-link>
      </div>
    </keep-alive>
    <nuxt-child
      class="overlapping-child"
      :class="computedClasses"
      :style="computedStyles"
    />
  </div>
</template>
<script>
const THRESHOLD = 0.6;
const SWIPE_DURATION_TOLERANCE = 250;

export default {
  transition: {
    beforeEnter(el) {
      console.log(this.swiped);
      console.log(el);
      if (this.swiped) {
        console.log('From swipe');
      }
      else {
        console.log('From button');
      }
    }
  },
  props: {
    swiped: Boolean,
  },
  data() {
    return {
      offset: 0,
      touchX: 0,
      navigated: this.$route.name === 'a-b'? false : true,
      touchStartTimestamp: null,
      showTransition: false,
      direction: null,
      leaved: false,
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
    },
    movingHandler(event) {
      if (this.navigated) return;
      if (!event || event.type !== 'touchmove') {
        return;
      }

      const { clientX } = event.touches[0];
      this.offset = this.touchX - clientX;

      if (!this.direction) {
        if (this.offset > 0) {
          this.direction = 'forward';
          this.$router.push('/a/b/c');
        } else if (this.offset < 0) {
          this.direction = 'back';
        }
      }
    },
    endHandler(event) {
      if (this.navigated) return;
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
      if (this.direction === 'forward') {
        this.$router.replace('/a/b');
      }
      this.navigated = false;
      this.reset();
    },
    confirmNavigation() {
      if (this.direction === 'back') {
        this.leaved = true;
        this.$router.replace('/a')
      } else {
        this.navigated = true;        
      }
      this.reset();
    },
    reset() {
      this.direction = null;
      this.touchX = 0;
      this.touchStartTimestamp = null;

      this.offset = 0;
      this.showTransition = true;
      setTimeout(() => {
        this.showTransition = false;
      }, 500);
    }
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
    pageStyles() {
      if (this.leaved) {
        return {
          transform:  `translateX(100%)`,
        }
      }
      if (this.direction === 'back') {
        return {
          transform: `translateX(${Math.abs(this.offset)}px)`,
        }
      } else {
        return null;
      }
    },
    computedClasses() {
      return this.showTransition ? 'navigation-animation' : '';
    },
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === 'a-b') {
      this.navigated = false;
    } else {
      if(!this.touchStartTimestamp) {
        this.navigated = true;
      }
    }
    next();
  }
}
</script>
<style>
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  }

  .b {
    background: linear-gradient(90deg, rgba(103,14,14,1) 0%, rgba(199,31,31,1) 100%);
  }

  .button {
    display: block;
    padding: 10px 20px;
    background-color: white;
    border: 1px solid silver;
    border-radius: 9999px;
    color: black;
    text-decoration: none;
  }

  .button:focus {
    outline: none;
    user-select: none;
  }
</style>