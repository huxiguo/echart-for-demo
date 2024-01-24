<script setup lang="ts">
import { ref } from "vue"
const activeItem = ref(0)
const btnList = ref([
	{
		label: "九江市",
		value: "jiujiang",
	},
	{
		label: "庐山市",
		value: "lushanshi",
	},
	{
		label: "资溪县",
		value: "zixixian",
	},
])
const emit = defineEmits<{
	itemClick: [value: string]
}>()
const handleBtnClick = (val: string, index: number) => {
	activeItem.value = index
	emit("itemClick", val)
}
</script>
<template>
	<div class="btn-group">
		<div
			class="btn"
			v-for="(item, index) in btnList"
			:key="item.label"
			:class="index === activeItem ? 'active' : ''"
			@click="handleBtnClick(item.value, index)"
		>
			{{ item.label }}
		</div>
	</div>
</template>

<style>
.btn-group {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.btn-group .btn {
	width: 120px;
	text-align: center;
	padding: 10px 0;
	border-radius: 5px;
	background: rgba(82, 151, 207, 0.653);
	color: #fff;
	cursor: pointer;
	margin: 0 15px;
}
.btn-group .btn:hover {
	background: rgb(37, 133, 212);
}
.btn-group .active {
	background: #0a7ede;
}
</style>
