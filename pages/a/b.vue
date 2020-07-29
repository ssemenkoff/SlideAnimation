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
      routeName: 'a-b',
      rightPage: '/a/b/c',
      leftPage: '/a'
    }),
  ],
};
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