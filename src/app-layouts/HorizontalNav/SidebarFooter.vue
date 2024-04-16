<template>
	<div class="sidebar-footer" :class="{ collapsed }">
		<n-menu :options="menuOptions" :collapsed="collapsed" :collapsed-width="collapsedWidth" />
	</div>
</template>

<script lang="ts" setup>
import { computed, h, ref, toRefs } from "vue"
import { NMenu } from "naive-ui"
import { useThemeStore } from "@/stores/theme"
import { renderIcon } from "@/utils"

const UserIcon = "ion:person-outline"

defineOptions({
	name: "SidebarFooter"
})

const props = withDefaults(
	defineProps<{
		collapsed?: boolean
	}>(),
	{ collapsed: false }
)
const { collapsed } = toRefs(props)

const menuOptions = ref([
	{
		label: () =>
			h(
				"a",
				{
					href: "https://github.com/Ruttanachote",
					target: "_blank",
					rel: "noopenner noreferrer"
				},
				"Ruttanachot Kaeyai"
			),
		key: "profile",
		icon: renderIcon(UserIcon)
	}
])

const themeStore = useThemeStore()

const collapsedWidth = computed<number>(() => themeStore.sidebar.closeWidth - 16)
</script>

<style lang="scss" scoped>
.sidebar-footer {
	margin: 8px;
	background-color: var(--bg-body);
	border-radius: var(--border-radius);
	padding: 3px 0;
	transition: all 0.3s;

	:deep() {
		.n-menu {
			.n-menu-item-content.n-menu-item-content--selected::before {
				background-color: transparent !important;
			}
		}
	}
}
</style>
