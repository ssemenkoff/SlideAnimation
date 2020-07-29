<template>
<div 
    v-touch:moved="movedHandler"
    v-touch:moving="movingHandler"
    v-touch:end="endHandler"
    :style="pageStyles"
    :class="computedClasses"
  >
    <keep-alive>
      <div class="fullscreen c page">
        <n-link class="button" to="/a/b">Go to b</n-link>
        <n-link class="button" to="/a">Go to a</n-link>
      </div>
    </keep-alive>
  </div>
</template>
<script>
import navigationMixin from '~/components/navigationAnimationMixin';

export default {
  mixins: [
    navigationMixin({
      routeName: 'a-b-c',
      leftPage: '/a/b',
      rightPage: null
    }),
  ],
};
</script>
<style>
  .c {
    background: linear-gradient(90deg, rgba(209,195,2,1) 0%, rgba(255,247,134,1) 100%);
  }
</style>