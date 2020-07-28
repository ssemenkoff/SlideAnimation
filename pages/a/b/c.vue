<template>
  <div>
    <div class="fullscreen c page">
      <n-link class="button" to="/a/b">Go to b</n-link>
      <n-link class="button" to="/a">Go to a</n-link>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style>
  .c {
    background: linear-gradient(90deg, rgba(209,195,2,1) 0%, rgba(255,247,134,1) 100%);
  }
</style>