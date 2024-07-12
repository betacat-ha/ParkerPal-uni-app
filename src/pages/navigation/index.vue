<template>
  <!-- <MapView /> -->
  <view>
    <map
      longitude="113.327043"
      latitude="23.132086"
      markers=""
      enable-indoor-map="true"
      style="width: 100%; height: 300px;"
    />
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';
</script>

<style scoped lang="scss"></style>
