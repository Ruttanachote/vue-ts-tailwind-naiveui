<template>
	<div class="settings flex items-center justify-between">
		<div class="layout">
			<n-button quaternary circle @click="align = 'left'">
				<template #icon>
					<Icon>
						<Iconify :icon="AlignLeftActive" v-if="align === 'left'" />
						<Iconify :icon="AlignLeft" v-else />
					</Icon>
				</template>
			</n-button>
			<n-button quaternary circle @click="align = 'center'">
				<template #icon>
					<Icon>
						<Iconify :icon="AlignCenterActive" v-if="align === 'center'" />
						<Iconify :icon="AlignCenter" v-else />
					</Icon>
				</template>
			</n-button>
			<n-button quaternary circle @click="align = 'right'">
				<template #icon>
					<Icon>
						<Iconify :icon="AlignRightActive" v-if="align === 'right'" />
						<Iconify :icon="AlignRight" v-else />
					</Icon>
				</template>
			</n-button>
		</div>
		<div class="colors">
			<n-button quaternary circle v-for="color of colors" :key="color" @click="activeColor = color">
				<template #icon>
					<Icon :color="color">
						<Iconify :icon="SquareActive" v-if="activeColor === color" />
						<Iconify :icon="Square" v-else />
					</Icon>
				</template>
			</n-button>
			<n-button quaternary circle @click="activeColor = primaryColor">
				<template #icon>
					<Icon :color="primaryColor">
						<Iconify :icon="SquareActive" v-if="activeColor === primaryColor" />
						<Iconify :icon="Square" v-else />
					</Icon>
				</template>
			</n-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from "vue"
import { NButton } from "naive-ui"
import Icon from "@/components/common/Icon.vue"
import { Icon as Iconify } from "@iconify/vue"
import { useThemeStore } from "@/stores/theme"

const AlignLeft = "fluent:textbox-align-bottom-rotate-90-24-regular"
const AlignCenter = "fluent:textbox-align-middle-rotate-90-24-regular"
const AlignRight = "fluent:textbox-align-top-rotate-90-24-regular"
const AlignLeftActive = "fluent:textbox-align-bottom-rotate-90-24-filled"
const AlignCenterActive = "fluent:textbox-align-middle-rotate-90-24-filled"
const AlignRightActive = "fluent:textbox-align-top-rotate-90-24-filled"
const Square = "fluent:square-24-filled"
const SquareActive = "fluent:checkbox-indeterminate-24-regular"

export type Align = "left" | "center" | "right"

const align = defineModel<Align>("align", { default: "left" })
const activeColor = defineModel<string>("activeColor", { default: "" })

const themeStore = useThemeStore()

const colors = computed(() => themeStore.secondaryColors)
const primaryColor = computed(() => themeStore.primaryColor)

onBeforeMount(() => {
	activeColor.value = primaryColor.value
})
</script>

<style lang="scss" scoped>
.settings {
	position: fixed;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: var(--bg-secondary-color);
	height: 44px;
	width: 300px;
	border-radius: 50px;
	padding: 5px;
	z-index: 1;

	@media (max-width: 800px) {
		width: 112px;
		.colors {
			display: none;
		}
	}
}
</style>
