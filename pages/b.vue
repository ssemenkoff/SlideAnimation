<template>
  <div class="fullscreen b page">
    <n-link class="button" to="/a">Go to a</n-link>
  </div>
</template>
<style>
  .page {
    display: flex;
    align-items: center;
    justify-content: center;
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