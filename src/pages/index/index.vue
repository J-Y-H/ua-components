<!--
 * @Descripttion: 
 * @Date: 2021-09-23 18:23:35
 * @LastEditTime: 2021-09-26 14:21:59
-->
<template>
  <view class="home-container">
    <view class="home-title">uniapp组件自定义demo示例</view>
    <view class="home-demo-list">
      <view
        v-for="(item, idx) in demoList"
        :key="idx"
        class="home-demo-item"
        @click="handleJump(item)"
      >
        <view class="home-demo-left">{{ item.label }}</view>
        <view class="home-demo-right iconfont icon-you"></view>
        <view class="home-demo-right iconfont icon-you">&#xe689;</view>
      </view>
    </view>
  </view>
</template>

<script>
import { DEMO_LIST } from '@/constant/data.js'

export default {
  name: 'HomeIndex',
  components: {},
  data() {
    return {
      demoList: DEMO_LIST
    }
  },
  computed: {},
  mounted() {},
  onLoad() {},
  onUnload() {},
  onShow() {},
  onHide() {},
  watch: {},
  methods: {
    // 点击跳转对应demo页面
    handleJump(item) {
      uni.navigateTo({
        url: item.path
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: #f8f8f8;
}
.home-title {
  height: 160rpx;
  line-height: 160rpx;
  text-align: center;
  font-size: 40rpx;
  font-weight: bold;
  background: #f1f1f1;
}
.home-demo-list {
  padding: 20rpx 30rpx 40rpx;
}
.home-demo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100rpx;
  line-height: 100rpx;
  color: #000;
  font-size: 28rpx;
  background: #fff;
  border-radius: 8rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
  margin-bottom: 30rpx;
}
</style>
