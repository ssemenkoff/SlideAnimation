<template>
  <div>
    <div class="fullscreen d page">
      <n-link class="button" to="/a/b">Go to b</n-link>
      <n-link class="button" to="/a">Go to a</n-link>
      <n-link class="button" to="/a/b/c">Go to c</n-link>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style>
  .d {
    background: linear-gradient(90deg, rgba(160,2,209,1) 0%, rgba(218,134,255,1) 100%);
  }
</style>