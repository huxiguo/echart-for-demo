import * as echarts from "echarts/core"
// 引入用到的图表
import {
	LineChart,
	MapChart,
	type LineSeriesOption,
	type MapSeriesOption,
} from "echarts/charts"
// 引入提示框、数据集等组件
import {
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	VisualMapComponent,
	type TooltipComponentOption,
	type TitleComponentOption,
	type GridComponentOption,
	type LegendComponentOption,
	type VisualMapComponentOption,
} from "echarts/components"
// 引入标签自动布局、全局过渡动画等特性
import { LabelLayout } from "echarts/features"
// 引入 Canvas 渲染器，必须
import { CanvasRenderer } from "echarts/renderers"

//
import type { ComposeOption } from "echarts/core"

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
	| LineSeriesOption
	| MapSeriesOption
	| GridComponentOption
	| TitleComponentOption
	| TooltipComponentOption
	| LegendComponentOption
	| VisualMapComponentOption
>

// 注册必须的组件
echarts.use([
	LineChart,
	TitleComponent,
	TooltipComponent,
	GridComponent,
	CanvasRenderer,
	LabelLayout,
	LegendComponent,
	VisualMapComponent,
	MapChart,
])

export default echarts
