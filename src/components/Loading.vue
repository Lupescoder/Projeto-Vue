<template>
  <div class="loading">
    <img src="../assets/loading.gif" alt="loading" />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingScreen",
});
</script>

<style>
.loading {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading img {
  width: 100%;
  height: 100%;
}
</style>
