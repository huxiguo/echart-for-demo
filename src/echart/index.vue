<script setup lang="ts">
import { ref, markRaw, watch, onMounted, onBeforeUnmount } from "vue"
import { useDebounceFn } from "@vueuse/core"
import echarts from "./echart.config"
import axios from "axios"

import type { EChartsType } from "echarts/core"
import type { ECOption } from "./echart.config"

interface Props {
	option: ECOption
	theme?: Object | string
	width: string
	height: string
	// 直接传入 geoJson 数据
	geoJson?: any
	// 通过 url 加载 geoJson 数据
	geoJsonUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
	theme: "",
})

const chartRef = ref<HTMLDivElement>()
const chartInstance = ref<EChartsType>()

// 绘制图表
const draw = async () => {
	if (chartInstance.value) {
		let geoJsonData = null
		if (props.geoJsonUrl) {
			const res = await axios.get(`${props.geoJsonUrl}`)
			geoJsonData = res.data
		} else if (props.geoJson) {
			geoJsonData = props.geoJson
		}
		echarts.registerMap("jiujiang", geoJsonData as any)
		chartInstance.value.setOption(props.option, { notMerge: true })
	}
}

// 初始化
const init = () => {
	if (!chartRef.value) return
	// 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
	chartInstance.value = echarts.getInstanceByDom(chartRef.value)
	if (!chartInstance.value) {
		chartInstance.value = markRaw(
			echarts.init(chartRef.value, props.theme, { renderer: "canvas" })
		)
		draw()
	}
}

watch(props, () => {
	draw()
})

onMounted(() => {
	init()
})

onBeforeUnmount(() => {
	// 销毁实例
	chartInstance.value?.dispose()
})

// 窗口自适应，开启过度
const resize = () => {
	if (chartInstance.value) {
		chartInstance.value.resize({ animation: { duration: 300 } })
	}
}

// 自适应防抖优化
const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 })

onMounted(() => {
	window.addEventListener("resize", debouncedResize)
})

onBeforeUnmount(() => {
	window.removeEventListener("resize", debouncedResize)
})

const emit = defineEmits<{
	itemClick: [params: echarts.ECElementEvent]
}>()

const handleClick = () => {
	// 防止重复绑定
	chartInstance.value?.off("click")
	chartInstance.value?.on("click", (params) => {
		emit("itemClick", params)
	})
}
</script>

<template>
	<div
		id="echart"
		ref="chartRef"
		:style="{ width: props.width, height: props.height }"
		@click="handleClick"
	/>
</template>
