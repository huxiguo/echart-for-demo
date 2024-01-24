<script setup lang="ts">
import { ref, computed } from "vue"
import echarts from "./echart/echart.config"

import Echart from "./echart/index.vue"
import btnGroup from "./components/btnGroup.vue"
import type { ECOption } from "./echart/echart.config"

const mapName = ref<string>("jiujiang")

// echart 配置
const options = computed<ECOption>(() => {
	return {
		tooltip: {
			trigger: "item",
			formatter: "{b}<br/>",
		},
		visualMap: {
			min: 800,
			max: 50000,
			text: ["High", "Low"],
			realtime: false,
			calculable: true,
			inRange: {
				color: ["#74e7e9", "#78d6d7", "#479ca8"],
			},
		},
		series: [
			{
				name: mapName.value,
				type: "map",
				map: mapName.value,
				roam: true,
				label: {
					show: true,
				},
				center: undefined,
				// 高亮效果
				emphasis: {
					label: {
						show: true,
						color: "red",
						fontSize: 20,
						fontWeight: "bold",
					},
				},
				data: dataMap[mapName.value],
			},
		],
	}
})

// echart ref
const EchartRef = ref<InstanceType<typeof Echart>>()

//  地图组件点击回调
const handleClick = (params: echarts.ECElementEvent) => {
	alert(params.name)
}

// 数据切换
const dataMap: any = {
	jiujiang: [
		{ name: "濂溪", value: 20057.34 },
		{ name: "修水", value: 15477.48 },
		{ name: "武宁", value: 31686.1 },
		{ name: "瑞昌", value: 6992.6 },
		{ name: "德安", value: 44045.49 },
		{ name: "共青城", value: 40689.64 },
		{ name: "永修", value: 37659.78 },
		{ name: "庐山", value: 45180.97 },
		{ name: "湖口", value: 15477.48 },
		{ name: "浔阳", value: 31686.1 },
		{ name: "都昌", value: 6992.6 },
		{ name: "彭泽", value: 44045.49 },
		{ name: "柴桑", value: 44045.49 },
	],
	lushanshi: [
		{ name: "赛阳镇", value: 20057.34 },
		{ name: "牯岭镇", value: 15477.48 },
		{ name: "海会镇", value: 31686.1 },
		{ name: "白鹿镇", value: 6992.6 },
		{ name: "东牯山林场", value: 44045.49 },
		{ name: "庐山茶科所", value: 40689.64 },
		{ name: "温泉镇", value: 37659.78 },
		{ name: "蛟塘镇", value: 45180.97 },
		{ name: "横塘镇", value: 15477.48 },
		{ name: "华林镇", value: 31686.1 },
		{ name: "蓼南乡", value: 6992.6 },
		{ name: "蓼花镇", value: 44045.49 },
		{ name: "南康镇", value: 44045.49 },
		{ name: "农科所", value: 44045.49 },
		{ name: "水稻良种场", value: 40689.64 },
		{ name: "沙湖山管理处", value: 37659.78 },
	],
	zixixian: [
		{ name: "高田乡", value: 20057.34 },
		{ name: "嵩市镇", value: 15477.48 },
		{ name: "石峡乡", value: 31686.1 },
		{ name: "高阜镇", value: 6992.6 },
		{ name: "马头山镇", value: 44045.49 },
		{ name: "鹤城镇", value: 40689.64 },
		{ name: "乌石镇", value: 37659.78 },
	],
}

// 按钮点击
const handleBtnItemClick = async (val: string) => {
	mapName.value = val
}
</script>
<template>
	<!-- title -->
	<div class="title">示例数据</div>
	<!-- map -->
	<div class="main">
		<Echart
			ref="EchartRef"
			:option="options"
			width="100%"
			height="800px"
			@item-click="handleClick"
			:name="mapName"
		/>
	</div>
	<!-- button -->
	<btnGroup @item-click="handleBtnItemClick" />
</template>

<style>
.title {
	width: 100%;
	text-align: center;
	font-size: 26px;
}
.main {
	height: 800px;
	width: 1000px;
	margin: 10px auto;
}
</style>
