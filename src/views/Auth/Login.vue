<template>
	<div class="page-auth">
		<div class="flex wrapper justify-center" v-if="!isLogged">
			<div class="image-box basis-2/3" v-if="align === 'right'"></div>
			<div class="form-box basis-1/3 flex items-center justify-center" :class="{ centered: align === 'center' }">
				<AuthForm :type="type" />
			</div>
			<div class="image-box basis-2/3" v-if="align === 'left'"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import AuthForm from "@/components/AuthForm/index.vue"
import { ref, computed, onBeforeMount, toRefs } from "vue"
import { useRoute } from "vue-router"
import { useAuthStore } from "@/stores/auth"
import type { FormType } from "@/components/AuthForm/index.vue"

const props = defineProps<{
	formType?: FormType
}>()
const { formType } = toRefs(props)

const route = useRoute()
const align = ref("center")
const activeColor = ref("")
const type = ref<FormType | undefined>(formType.value || undefined)

const authStore = useAuthStore()
const isLogged = computed(() => authStore.isLogged)

onBeforeMount(() => {
	if (route.query.step) {
		const step = route.query.step as FormType
		type.value = step
	}
})
</script>

<style lang="scss" scoped>
@import "./main.scss";

.page-auth {
	.wrapper {
		.image-box {
			background-color: v-bind(activeColor);
		}
	}
}
</style>
