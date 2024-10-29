<script setup lang="ts">
import { useRouter } from 'uni-mini-router'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  leftText: {
    type: String,
    default: '返回',
  },
})

const router = useRouter()

function handleBack() {
  console.log('rightClick')
}

function handleHome() {
  router.push('/pages/home/index')
}
</script>

<template>
  <view
    class="nav-container"
  >
    <up-navbar
      :left-text="props.leftText"
      :title="props.title"
      placeholder="true"
    >
      <template #left>
        <view class="nav-slot">
          <!-- TODO 图标不显示 -->
          <up-icon
            type="arrow-left"
            size="19"
            @click="handleBack"
          />
          <up-line
            direction="column"
            :hairline="false"
            length="16"
            margin="0 8px"
          />
          <up-icon
            name="home"
            size="20"
            @click="handleHome"
          />
        </view>
      </template>
    </up-navbar>
  </view>
</template>

<style lang="scss" scoped>
.nav-container {
  padding: 0;
  flex: 1;
  background-color: $u-bg-color;

  .nav-slot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 7px;
    border-width: 0.5px;
    border-color: $u-border-color;
    border-radius: 100px;
    opacity: 0.8;
  }
}
</style>
