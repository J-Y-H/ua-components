<!--
 * @Descripttion: 多列选择器
 * @Date: 2021-09-26 14:15:51
 * @LastEditTime: 2021-09-27 16:34:50
-->
<template>
  <page-layout ref="pageLayout" introduce="多列picker选择组件">
    <view class="picker-container">
      <view class="picker-title">省市区选择(此例只展示默认初始化固定列的数据，详情请参考【省市区选择器】里的多列)</view>
      <view class="picker-item" @click="open('region')">
        <text class="picker-label">所在地区：</text>
        <view class="picker-value">{{ regionData ? regionData : '请点击选择省市区' }}</view>
      </view>

      <view class="picker-title">时间选择(固定列数据,非联级选择)</view>
      <view class="picker-item" @click="open('time')">
        <text class="picker-label">值班时间：</text>
        <view class="picker-value">{{ timeStr ? timeStr : '请点击时间' }}</view>
      </view>
    </view>
    <multi-picker label="name" field="code" ref="region"
      @columnChange="handleColumnChange"
      @pickerChage="handePickerChage"></multi-picker>

    <multi-picker label="time" field="value" ref="time"
      @columnChange="handleColumnChange"
      @pickerChage="handePickerChage2"></multi-picker>
  </page-layout>
</template>

<script>
import PageLayout from '@/components/PageLayout'
import MultiPicker from '@/components/MultiPicker'

import { area } from '@/constant/regoin/area'
import { city } from '@/constant/regoin/city'
import { province } from '@/constant/regoin/province'
import { PICKER_DEMO_DATA } from '@/constant/data.js'

export default {
  name: 'MultiPickerIndex',
  props: {},
  components: {
    MultiPicker,
    PageLayout
  },
  data () {
    return {
      platform: uni.getEnv(),
      currentRef: '',

      columns: [],
      region: [], // 省市区选择数据

      timeData: PICKER_DEMO_DATA,
      time: []
    }
  },
  computed: {
    regionData() {
      let str = this.region.map(item => item.name).join(',')
      return str
    },
    timeStr() {
      let str = this.time.map(item => item.time).join(',')
      return str
    }
  },
  onLoad () {
    this.init()
  },
  methods: {
    // 监听列变化
    handleColumnChange({ column, value, data }) {
      // ref为region时，选择不同的省，则对应市和区的数据将相应的变化
      if (this.currentRef === 'region') {
        if (column === 0) {
          this.switchProvince(value)
        } else if (column === 1) {
          this.switchCity(value)
        }
      }
      console.log('handleColumnChange---', column, value, data)
      // ref为time时， 时间选择数据为固定的，所以列滚动后不需要再处理每列的数据
    },
    // 切换省，需要更改市，区域数据
    async switchProvince(value) {
      this.columns[1] = city[province[value].code]
      this.switchCity(0)
    },
    // 切换市, 需要更改区域数据
    async switchCity(value) {
      this.columns[2] = area[this.columns[1][value].code]

      this.setColumnsData(this.columns, 'region')
    },
    // 监听picker选择后变化，或者初始化时
    handePickerChage(list) {
      console.log('handePickerChage--', list)
      this.region = list
    },
    // 监听picker选择后变化，或者初始化时
    handePickerChage2(list) {
      console.log('handePickerChage--', list)
      this.time = list
    },
    // 初始化省市区默认列数据
    init() {
      this.columns = [province, city[province[0].code], area[city[province[0].code][0].code]]
      this.setColumnsData(this.columns, 'region')
      this.setDefaultData([110000, 110100, 110102], 'region')


      this.setColumnsData(this.timeData, 'time')
      // this.setDefaultData([1, 0], 'time')
    },
    // 打开省市区picker
    open(ref) {
      this.currentRef = ref
      if (this.platform === 'alipay') {
        this.$refs.pageLayout.$refs[ref].open()
      } else {
        this.$refs[ref].open()
      }
    },
    // 设置列数据
    setColumnsData(list, ref) {
      this.$nextTick(function() {
        if (this.platform === 'alipay') {
          setTimeout(() => {
            this.$refs.pageLayout.$refs[ref].setColumns(list)
          }, 100);
        } else {
          this.$refs[ref].setColumns(list)
        }
      })
    },
    // 根据默认值设置列数据(回显)
    setDefaultData(list, ref) {
      this.$nextTick(function() {
        if (this.platform === 'alipay') {
          setTimeout(() => {
            this.$refs.pageLayout.$refs[ref].initDefaultValue(list)
          }, 100);
        } else {
          this.$refs[ref].initDefaultValue(list)
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.picker-item {
  display: flex;
  color: #333;
  font-size: 30rpx;
  border-bottom: 2rpx solid #aaa;
  margin-bottom: 40rpx;
  text {
    flex-shrink: 0;
  }
}
.picker-value {
  flex: 1;
  color: #333;
}
.picker-title {
  color: #999;
  font-size: 26rpx;
  margin-bottom: 20rpx;
}
</style>