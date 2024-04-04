import { computed, ref, h } from "vue"
import dayjs from "@/utils/dayjs"
import { NButton } from "naive-ui"
import _uniqBy from "lodash/uniqBy"
import { useGlobalActions, type NotificationObject } from "./useGlobalActions"

export type NotificationCategory = "message" | "reminder" | "alert" | "news" | string
export type NotificationType = "success" | "info" | "warning" | "error" | "default" | undefined
export interface Notification {
	id: number | string
	category: NotificationCategory
	type: NotificationType
	title: string
	description: string
	read: boolean
	date: string
	action?: () => void
	actionTitle?: string
}
export interface PrependOptions {
	/** prepend and send a notification */
	sendNotify?: boolean
	/** send a notification only if there isn't any item with match id/type/category */
	autoNotify?: boolean
}

const items: Notification[] = [
	{
		id: 1,
		category: "message",
		type: "info",
		title: "New Email",
		description: "Important document to read",
		read: false,
		date: "Today"
	},
	{
		id: 2,
		category: "reminder",
		type: "warning",
		title: "Appointment",
		description: "Meeting with client at 3:00 PM",
		read: false,
		date: "Yesterday"
	},
	{
		id: 9,
		category: "alert",
		type: "error",
		title: "Alert",
		description: "Limited-time super offer on desired product",
		read: true,
		date: "Yesterday"
	},
	{
		id: 5,
		category: "news",
		type: "success",
		title: "News",
		description: "Networking event in your city",
		read: false,
		date: dayjs().subtract(3, "d").format("D MMM")
	},
	{
		id: 3,
		category: "reminder",
		type: "warning",
		title: "Reminder",
		description: "Overdue bill payment",
		read: true,
		date: dayjs().subtract(7, "d").format("D MMM")
	},
	{
		id: 4,
		category: "reminder",
		type: "warning",
		title: "Deadline",
		description: "Submit report by tomorrow",
		read: true,
		date: dayjs().subtract(2, "d").format("D MMM")
	},
	{
		id: 6,
		category: "message",
		type: "info",
		title: "Message",
		description: "New comment on your post",
		read: false,
		date: dayjs().subtract(4, "d").format("D MMM")
	},
	{
		id: 7,
		category: "reminder",
		type: "warning",
		title: "Reminder",
		description: "Complete purchase in your online cart",
		read: false,
		date: dayjs().subtract(5, "d").format("D MMM")
	},
	{
		id: 8,
		category: "reminder",
		type: "warning",
		title: "Invitation",
		description: "Friend's birthday party",
		read: true,
		date: dayjs().subtract(6, "d").format("D MMM")
	}
]

const list = ref<Notification[]>([])

for (let i = 0; i < 30; i++) {
	const item = items[i % items.length]
	item.id = i

	if (i > 2) {
		item.date = dayjs().subtract(i, "d").format("D MMM")
	}

	list.value.push({ ...item })
}

export function useNotifications() {
	const hasUnread = computed(() => list.value.filter(o => !o.read).length !== 0)
	const hasNotifications = computed(() => list.value.length !== 0)

	return {
		list,
		hasUnread,
		hasNotifications,
		setRead: (id: string | number) => {
			const item = list.value.find(o => o.id === id)
			if (item) {
				item.read = true
			}
		},
		setAllRead: () => {
			for (const item of list.value) {
				item.read = true
			}
		},
		deleteOne: (id: string | number) => {
			list.value = list.value.filter(o => o.id !== id)
		},
		deleteAll: () => {
			list.value = []
		},
		prepend: (newItem: Notification, options?: PrependOptions) => {
			let sendNotify = options?.sendNotify || false
			const autoNotify = options?.autoNotify || false

			if (autoNotify) {
				const item = list.value.find(
					o => o.id === newItem.id && o.type === newItem.type && o.category === newItem.category
				)

				if (!item) {
					sendNotify = true
				}
			}

			if (sendNotify) {
				const notify: NotificationObject = {
					title: newItem.title,
					content: newItem.description,
					type: newItem.type,
					meta: newItem.date,
					action: undefined,
					duration: 3000,
					keepAliveOnHover: true
				}

				if (newItem.action) {
					// @ts-ignore
					notify.action = () =>
						h(
							NButton,
							{
								text: true,
								type: newItem.type,
								onClick: newItem.action
							},
							{
								default: () => newItem.actionTitle || "Details"
							}
						)
				}

				useGlobalActions().notification(notify)
			}

			list.value = _uniqBy([newItem, ...list.value], o => o.id)
		}
	}
}
