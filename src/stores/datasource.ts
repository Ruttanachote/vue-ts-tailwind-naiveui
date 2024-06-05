import { defineStore } from "pinia"
import { ApiService } from "@/services/apiService"

type Datasource = {
	id: number
	name: string
	datasources_engine: string
	children: Datasource[] // Replace 'any' with the appropriate type for children
	datasources_setting: string
}
type Pipeline = {
	id: number
	datasources_id: number
	pipeline_name: string
	pipeline_setting: {
		query: string
		database: string
	}
	is_active: number
	is_delete: number
	created_by: string
	updated_by: string | null
	created_at: string
	updated_at: string
}

export const useDatasourceStore = defineStore("datasource", {
	state: () => ({
		datasourcesList: {
			meta: [],
			data: [] as Datasource[] // Add the appropriate type for the data property
		},
		pipelineList: [] as Pipeline[],
		executePiplineList: [] as any[],
		selectedPipeline: 0,
	}),
	actions: {
		async getDatasources() {
			const { data } = await ApiService.v1.Datasources.getDatasources()
			this.datasourcesList = data
		},
		async addDatasources(payload: any) {
			const form = {
				name: payload.name,
				engine: payload.engine,
				db_information: {
					host: payload.host,
					port: payload.port,
					user: payload.username,
					password: payload.password,
					database: payload.database
				}
			}
			const { data } = await ApiService.v1.Datasources.addDatasources(form)
			// this.list = data
		},
		async createPipline(name: string, id: number, database: string, query: string) {
			const form = {
				pipeline_name: name,
				datasources_id: id,
				pipeline_setting: {
					database: database,
					query: query
				}
			}
			await ApiService.v1.Datasources.createPipline(form)
		},
		async getDatasourcesPipeline() {
			const form = {
				limit: 3000,
				page: 1
			}
			const { data } = await ApiService.v1.Datasources.getDatasourcesPipeline(form)
			this.pipelineList = data.data
		},
		async executePipline(id: number,limit: number) {
			const form = {
				pipeline_id: id,
				offset: 0,
				limit: limit,
				ordering: "shop_id:asc,created_at:desc"
			}
			this.selectedPipeline = id
			const { data } = await ApiService.v1.Datasources.executePipline(form)
			this.executePiplineList = data.data
		}
	},
	getters: {}
})
