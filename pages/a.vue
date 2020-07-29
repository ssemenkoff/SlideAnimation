<template>
  <div
    v-touch:moved="movedHandler"
    v-touch:moving="movingHandler"
    v-touch:end="endHandler"
    :style="pageStyles"
    :class="computedClasses"
  >
    <keep-alive>
      <div class="fullscreen a page">
        <n-link class="button" to="/a/b">Go to b</n-link>
        <n-link class="button" to="/a/b/c">Go to c</n-link>
      </div>
    </keep-alive>
    <div
      class="fullscreen"
      :class="!touchStartTimestamp ? 'with-animation' : ''"
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
import navigationMixin from '~/components/navigationAnimationMixin';

export default {
  mixins: [
    navigationMixin({
      routeName: 'a',
      rightPage: '/a/b',
    }),
  ],
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