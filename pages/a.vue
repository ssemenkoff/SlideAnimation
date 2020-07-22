<template>
  <div>
    <keep-alive>
      <div class="fullscreen a page">
        <n-link class="button" to="/a/b">Go to b</n-link>
        <n-link class="button" to="/a/b/c">Go to c</n-link>
      </div>
    </keep-alive>
    <nuxt-child class="overlapping-child" />
  </div>
</template>
<script>
export default {
}
</script>
<style>
  .a {
    background: linear-gradient(90deg, rgba(18,13,120,1) 0%, rgba(47,36,233,1) 100%);
  }

  .overlapping-child {
    position: absolute;
    top: 0;
  }
</style>