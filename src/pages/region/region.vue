<!--
 * @Descripttion: 省市区选择器
 * @Date: 2021-09-24 10:32:15
 * @LastEditTime: 2021-09-27 16:14:12
-->
<template>
  <page-layout :introduce="introduce" ref="pageLayout">
    <view class="region">
      <view class="region-label">(支持h5、微信)默认为空</view>
      <view class="region-item">
        <text>所在地区：</text>
        <custom-region @handleRegion="handleRegion"></custom-region>
      </view>
      
      <view class="region-label">(支持h5、微信)默认选中：浙江省，杭州市，滨江区</view>
      <view class="region-item">
        <text>所在地区：</text>
        <custom-region :default-region="defaultRegion" @handleRegion="handleRegion"></custom-region>
      </view>

      <view class="region-label">
        <view>多列模式，支持h5、微信、支付宝</view>
        <view>默认选中：浙江省，杭州市，滨江区</view>
      </view>
      <view class="region-item" @click="handleClick">
        <text>所在地区：</text>
        <view class="">{{ regionStr ? regionStr : '请点击选择省市区' }}</view>
      </view>
      <custom-multi-region :default-region="defaultRegion" ref="multiRegion"
        @handePickerChage="handePickerChage"></custom-multi-region>
    </view>
  </page-layout>
</template>

<script>
import CustomRegion from '@/components/CustomRegion.vue'
import PageLayout from '@/components/PageLayout'
import CustomMultiRegion from '@/components/CustomMultiRegion'


export default {
  name: 'Region',
  components: {
    CustomRegion,
    PageLayout,
    CustomMultiRegion
  },
  data() {
    return {
      platform: uni.getEnv(),
      introduce: '省市区选择器',
      defaultRegion: [330000, 330100, 330108], // 浙江省，杭州市，滨江区
      regionList: [],
      region: []
    }
  },
  computed: {
    regionStr() {
      let str = this.region.map(item => item.name).join()
      return str
    }
  },
  methods: {
    // 省市区组件选择后，事件派发
    handleRegion(list) {
      console.log('list---', list)
      this.regionList = list
    },
    // 打开多列省市区选择
    handleClick() {
      if (this.platform === 'alipay') {
        this.$refs.pageLayout.$refs.multiRegion.open()
      } else {
        this.$refs.multiRegion.open()
      }
    },
    // 多列省市区选择点击确认或设置默认值
    handePickerChage(list) {
      this.region = list
    }
  }
}
</script>

<style lang="scss" scoped>
.region-item {
  display: flex;
  color: #333;
  font-size: 30rpx;
  border-bottom: 2rpx solid #aaa;
  margin-bottom: 40rpx;
  text {
    flex-shrink: 0;
  }
}
.region-label {
  font-size: 26rpx;
  color: #666;
  margin-bottom: 20rpx;
}
</style>
