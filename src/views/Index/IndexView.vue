<script setup lang="ts">
import Confirm from '@/components/Confirm';

const test = () => {
  Confirm.open()
}
</script>

<template>
  <div>
    首页
    <button @click="test">测试</button>
  </div>
</template>

<style lang="scss" scoped></style>
