<!--
 * @Descripttion: 主体布局
 * @Date: 2021-09-24 14:14:58
 * @LastEditTime: 2021-09-27 15:11:42
-->
<template>
  <view class="layout">
    <view class="layout-top">
      <slot name="top">{{ introduce }}</slot>
    </view>
    <view class="layout-body">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
    introduce: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-top {
  font-size: 30rpx;
  text-align: center;
  background: #f1f1f1;
  padding: 60rpx 40rpx;
  word-break: break-all;
  box-sizing: border-box;
}
.layout-body {
  padding: 40rpx 30rpx;
  box-sizing: border-box;
}
</style>
