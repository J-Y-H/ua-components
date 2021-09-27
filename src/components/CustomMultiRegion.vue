<!--
 * @Descripttion: 
 * @Date: 2021-09-27 15:23:22
 * @LastEditTime: 2021-09-27 16:10:22
-->
<template>
  <multi-picker label="name" field="code" ref="region"
    @columnChange="handleColumnChange"
    @pickerChage="handePickerChage"></multi-picker>
</template>

<script>
import MultiPicker from '@/components/MultiPicker'

import { area } from '@/constant/regoin/area'
import { city } from '@/constant/regoin/city'
import { province } from '@/constant/regoin/province'

export default {
  name: 'CustomMultiRegion',
  props: {
    // 默认选择的省市区数据，可以['浙江省', '杭州市', '滨江区'], [330000, 330100, 330108],根据下面的field字段来判断
    defaultRegion: {
      type: Array,
      default: () => []
    },
  },
  components: {
    MultiPicker
  },
  data () {
    return {
      columns: []
    }
  },
  watch: {
    defaultRegion: {
      handler(val) {
        if (val && val.length > 0) {
          this.initDefaultRegion()
        } else {
          this.init()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 初始化列数据
    init () {
      // 如果没有设置默认选中数据，则使用每列的第一列作为省市区数据
      this.columns = [province, city[province[0].code], area[city[province[0].code][0].code]]
      this.setColumnsData(this.columns)
    },
    // 设置默认已选省市区(回显)
    initDefaultRegion() {
      // 设置 省，市，区 列的数据
      this.columns[0] = province
      this.switchProvince(this.getRegionIdx(province, 0))
      this.switchCity(this.getRegionIdx(this.columns[1], 1))

      // 设置默认选中值
      this.setDefaultData(this.defaultRegion)
    },
    // 监听列变化
    handleColumnChange({ column, value, data }) {
      if (column === 0) {
        this.switchProvince(value)
      } else if (column === 1) {
        this.switchCity(value)
      }
      console.log('handleColumnChange---', column, value, data)
    },
    // 切换省，需要更改市，区域数据
    async switchProvince(value) {
      this.columns[1] = city[province[value].code]
      this.switchCity(0)
    },
    // 切换市, 需要更改区域数据
    async switchCity(value) {
      this.columns[2] = area[this.columns[1][value].code]

      this.setColumnsData(this.columns)
    },
    // 返回当前所选中【市】【区】的下标,用于匹配下一列数据
    // list: 当前列数据， n: 0：省数据 1：市数据 2：区数据
    getRegionIdx(list = [], n) {
      let idx = 0
      // 如果有默认选中项(回显时),则遍历获取对应的下标,否则使用每列的第一项
      if (this.defaultRegion.length > 0) {
        idx = list.findIndex((item) => item.code == this.defaultRegion[n])
      }
      if (idx < 0) {
        idx = 0
      }
      return idx
    },
    // 监听picker选择后变化，或者初始化时
    handePickerChage(list) {
      console.log('handePickerChage--', list)
      this.$emit('handePickerChage', list)
    },
    // 打开省市区picker
    open() {
      this.$refs.region.open()
    },
    // 设置列数据
    setColumnsData(list) {
      this.$nextTick(function() {
        this.$refs.region.setColumns(list)
      })
    },
    // 根据默认值设置列数据(回显)
    setDefaultData(list) {
      this.$nextTick(function() {
        this.$refs.region.initDefaultValue(list)
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>