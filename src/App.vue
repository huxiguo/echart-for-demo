<script setup lang="ts">
import { ref } from "vue"
import echarts from "./echart/echart.config"

import Echart from "./echart/index.vue"
import type { ECOption } from "./echart/echart.config"

const options = ref<ECOption>({
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
			color: ["lightskyblue", "yellow", "orangered"],
		},
	},
	series: [
		{
			name: "jiujiang",
			type: "map",
			map: "jiujiang",
			roam: true,
			label: {
				show: true,
			},

			// 高亮效果
			emphasis: {
				label: {
					show: true,
					color: "red",
					fontSize: 20,
					fontWeight: "bold",
				},
			},
			data: [
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
		},
	],
})
const handleClick = (params: echarts.ECElementEvent) => {
	alert(params.name)
}
</script>
<template>
	<div style="min-width: 600px">
		<Echart
			:option="options"
			width="100%"
			height="800px"
			@item-click="handleClick"
		/>
	</div>
</template>
