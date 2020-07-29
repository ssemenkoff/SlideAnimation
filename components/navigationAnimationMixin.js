const THRESHOLD = 0.6;
const SWIPE_DURATION_TOLERANCE = 250;

export default ({ routeName, rightPage, leftPage }) => ({
  data() {
    return {
      offset: 0,
      touchX: 0,
      navigated: this.$route.name === routeName ? false : true,
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
      let offset = this.touchX - clientX;

      if (!this.direction) {
        if (offset > 0) {
          this.direction = 'forward';

          if (!rightPage) return;
          this.$router.push(rightPage);
        } else if (offset < 0) {
          this.direction = 'back';
          if (!leftPage) return;
        }
      }

      if((this.direction === 'forward' && !rightPage)
        || (this.direction === 'back' && !leftPage))
      {
        return
      }

      this.offset = offset;
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
      if (this.direction === 'forward' && rightPage) {
        this.$router.replace({
          name: routeName
        });
      }
      this.navigated = false;
      this.reset();
    },
    confirmNavigation() {
      if (this.direction === 'back') {
        this.leaved = true;
        this.$router.replace(leftPage);
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
          transform: `translateX(100%)`,
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
    if (to.name === routeName) {
      this.navigated = false;
    } else {
      if(!this.touchStartTimestamp) {
        this.navigated = true;
      }
    }
    next();
  }
});