import { useAuthStore } from "@/stores/auth"
import { type RouteMetaAuth } from "@/types/auth.d"
import { type RouteLocationNormalized } from "vue-router"

export function authCheck(route: RouteLocationNormalized) {
	const meta: RouteMetaAuth = route.meta
	const { checkAuth, authRedirect, auth, roles } = meta

	const authStore = useAuthStore()

	if (route?.redirectedFrom?.name === "Logout") {
		authStore.setLogout()
	}

	if (auth === true) {
		if (!authStore.isLogged) {
			window.location.href = "/login" + window.location.search
			return false
		}

		if (roles && !authStore.isRoleGranted(roles)) {
			window.location.href = "/login" + window.location.search
			return false
		}
	}

	if (checkAuth === true) {
		if (authStore.isLogged) {
			if (roles) {
				if (authStore.isRoleGranted(roles)) {
					return authRedirect || "/"
				} else {
					return route.path
				}
			}
			return authRedirect || "/"
		}
	}
}
