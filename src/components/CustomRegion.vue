<!--
 * @Descripttion: 自定义省市区选择组件
 * @Date: 2021-09-17 11:00:14
 * @LastEditTime: 2021-09-26 10:12:09
-->
<template>
  <picker
    class="addr-picker"
    mode="multiSelector"
    :value="defaultValue"
    :range="range"
    range-key="name"
    @change="bindDateChange"
    @columnchange="bindColumnchange"
  >
    <view :class="{ 'addr__text--placeholder': !(pickerData && pickerData.length > 0) }">{{
      pickerData && pickerData.length > 0 ? pickerData.join() : '请选择省市区'
    }}</view>
  </picker>
</template>

<script>
import { area } from '@/constant/regoin/area'
import { city } from '@/constant/regoin/city'
import { province } from '@/constant/regoin/province'

export default {
  name: 'CustomRegion',
  props: {
    // 默认选择的省市区数据，可以['浙江省', '杭州市', '滨江区'], [330000, 330100, 330108],根据下面的field字段来判断
    defaultRegion: {
      type: Array,
      default: () => []
    },
    // 用于设置默认值时，根据该字段获取数据
    field: {
      type: String,
      default: 'code'
    }
  },
  data() {
    return {
      pickerData: [], // 已选择展示数据
      defaultValue: [], // 回显时默认选中项
      range: [] // picker数据
    }
  },
  mounted() {
    this.initPickerColumnData()
  },
  methods: {
    // picker组件点击确定
    bindDateChange(event) {
      let [x = 0, y = 0, z = 0] = [...event.detail.value]
      let list = []
      list[0] = this.range[0][x]
      list[1] = this.range[1][y]
      list[2] = this.range[2][z]
      this.pickerData = list.map((item) => item.name)
      this.$emit('handleRegion', list)
    },
    // 切换选择某一列
    bindColumnchange(event) {
      // console.log('bindColumnchange--', event.detail)
      this.handleSwitchPicker(event.detail)
    },
    // 某列切换选择时，变化处理picker数据
    handleSwitchPicker({ column, value }) {
      if (column === 0) {
        // 第一列切换 || 省
        this.switchProvince(value)
      } else if (column === 1) {
        // 第二列切换 || 市
        this.switchCity(value)
      }
    },
    // 初始化picker的每列数据
    async initPickerColumnData() {
      this.range[0] = province
      this.switchProvince(this.getRegionIdx(this.range[0], 0))
    },
    // 切换省，需要更改市，区域数据
    async switchProvince(value) {
      // this.handleAdjustHeight(1)
      this.range[1] = city[province[value].code]
      this.switchCity(this.getRegionIdx(this.range[1], 1))
    },
    // 切换市, 需要更改区域数据
    async switchCity(value) {
      // this.handleAdjustHeight(2)
      this.range[2] = area[this.range[1][value].code]
      this.$forceUpdate()
      if (this.defaultRegion.length > 0) {
        this.initDefaultRegion()
      }
    },
    // 设置默认已选省市区(回显)
    initDefaultRegion() {
      if (this.defaultValue.length === 0) {
        let [x = 0, y = 0, z = 0] = [...this.defaultRegion]
        let pIdx = this.range[0].findIndex((item) => item[this.field] == x)
        let cIdx = this.range[1].findIndex((item) => item[this.field] == y)
        let aIdx = this.range[2].findIndex((item) => item[this.field] == z)
        this.defaultValue = [pIdx, cIdx, aIdx]
        this.pickerData = [
          this.range[0][pIdx].name,
          this.range[1][cIdx].name,
          this.range[2][aIdx].name
        ]
      }
    },
    // 返回当前所选中【市】【区】的下标,用于匹配下一列数据
    // list: 当前列数据， n: 0：省数据 1：市数据 2：区数据
    getRegionIdx(list = [], n) {
      let idx = 0
      // 如果有默认选中项(回显时),则遍历获取对应的下标,否则使用每列的第一项
      if (this.defaultRegion.length > 0) {
        idx = list.findIndex((item) => item[this.field] == this.defaultRegion[n])
      }
      if (idx < 0) {
        idx = 0
      }
      return idx
    },
    // 设置每列的滚动高度，目前用于重置高度，（由于调用该方法后，会出现一些样式跳动的问题，暂时不调用）
    handleAdjustHeight(idx, h = 0) {
      let els = document.querySelectorAll('.uni-picker-view-content')
      if (els && els.length > 0) {
        setTimeout(() => {
          els[idx].style.transform = `translateY(${h}px) translateZ(0px)`
        }, 100)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addr-picker {
  width: 100%;
  height: 100%;
}
.addr__text--placeholder {
  color: #999;
}
</style>
