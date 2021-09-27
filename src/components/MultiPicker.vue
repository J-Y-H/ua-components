<!--
 * @Descripttion: 多列选择器
 * @Date: 2021-09-26 14:00:17
 * @LastEditTime: 2021-09-27 15:08:45
-->
<template>
  <uni-popup ref="popup" type="bottom">
    <slot name="top">
      <view class="picker-top">
        <view class="picker-top-left" :style="{ color: cancelColor }" @click="close">{{ cancelText }}</view>
        <view class="picker-top-center">{{ title }}</view>
        <view class="picker-top-right" :style="{ color: okColor }" @click="handleSure">{{ okText }}</view>
      </view>
    </slot>
    <picker-view :style="{ height }" indicator-class="multi-picker"
      :indicator-style="indicatorStyle" :value="value"
      class="picker-view"
      @change="bindChange">
      <picker-view-column v-for="(item, idx) in columns" :key="idx">
        <view class="multi-picker-item" v-for="(ite, index) in item" :key="index">{{ ite[label] }}</view>
      </picker-view-column>
    </picker-view>
  </uni-popup>
</template>

<script>
import UniPopup from '@/components/plugs/uni-popup/uni-popup.vue'

export default {
  name: 'MultiPicker',
  components: {
    UniPopup
  },
  props: {
    // 取消按钮文字
    cancelText: {
      type: String,
      default: '取消'
    },
    // 确认按钮文字
    okText: {
      type: String,
      default: '确定'
    },
    // 取消按钮颜色
    cancelColor: {
      type: String,
      default: '#888'
    },
    // 确认按钮颜色
    okColor: {
      type: String,
      default: '#007aff'
    },
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 滚动容器高度
    height: {
      type: String,
      default: '500rpx'
    },
    // 根据该字段来显示容器中的值
    label: {
      require: true,
      type: String,
      default: ''
    },
    // 根据该字段来遍历回显内容
    field: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      indicatorStyle: `height: 40px;`,
      value: [], // 默认选中项，根据下标来确定
      currentValue: [], // 记录当前选中的下标
      columns: []
    }
  },
  methods: {
    // 设置列数据(由于使用watch+props的形式无效，改为直接调用方法赋值)
    setColumns(list) {
      this.columns = list
      if (this.value.length === 0) {
        this.value = new Array(list.length).fill(0)
        this.currentValue = this.value
      }
      this.$forceUpdate()
    },
    // 回显时，根据传入的field字段来匹配对应每一列的下标，再设置value
    initDefaultValue(value) {
      if (this.columns.length > 0) {
        let idxs = []
        let items = []
        for (let i = 0; i < this.columns.length; i++) {
          let current = this.columns[i]
          let idx = current.findIndex((item) => item[this.field] == value[i])
          items.push(current[idx])
          idxs.push(idx)
        }
        this.value = idxs
        this.currentValue = this.value
        this.$emit('pickerChage', items)
      }
    },
    // picker列滚动选择触发事件
    bindChange ({ detail }) {
      const val = detail.value
      let idx = this.getChangeColumn(val)
      this.$emit('columnChange', { column: idx, value: val[idx], data: this.columns[idx][val[idx]] })
      this.currentValue = val
    },
    // 对比获取当前切换滚动的是哪一列
    getChangeColumn(list) {
      let idx
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== this.currentValue[i]) {
          idx = i
          break
        }
      }
      return idx
    },
    // 点击确认按钮
    handleSure() {
      let list = []
      for (let i = 0; i < this.columns.length; i++) {
        list.push(this.columns[i][this.currentValue[i]])
      }
      this.$emit('pickerChage', list)
      this.value = this.currentValue
      this.close()
    },
    // 显示picker-view弹窗
    open() {
      this.$refs.popup.open()
    },
    // 关闭picker-view弹窗
    close() {
      this.$refs.popup.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.picker-view {
  width: 750rpx;
  background: #FFF;
}
.multi-picker-item {
  height: 80rpx !important;
  line-height: 80rpx;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 4px;
  box-sizing: border-box;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.picker-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background: #FFF;
  border-bottom: 2rpx solid #e5e5e5;
  font-size: 34rpx;
  color: #333;
}
</style>