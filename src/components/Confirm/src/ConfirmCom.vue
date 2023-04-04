<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Confirm from "../index"
const visible = ref(false)

const close = () => {
  visible.value = false
}

const onDestroy = () => {
  Confirm.close()
}

onMounted(() => {
  visible.value = true
})
</script>

<template>
  <transition name="messagebox-fade" @after-leave="onDestroy">
    <div class="confirm-over" v-show="visible">
      <button @click="close">11</button>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.confirm-over {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.messagebox-fade-enter-from,
.messagebox-fade-leave-to {
  opacity: 0;
}

.messagebox-fade-enter-active,
.messagebox-fade-leave-active {
  transition: opacity .3s ease-in-out;
}
</style>
