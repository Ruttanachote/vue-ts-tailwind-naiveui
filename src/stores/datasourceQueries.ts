import { defineStore } from "pinia"
import { ApiService } from "@/services/apiService"

export const useDatasourceQuerieStore = defineStore("datasourceQuerie", {
	state: (): any => ({
		list: [],
        TableColumns: [],
        TableData: [],
        TableDataExecuteQuery: [],
        selectStage: {
            datasource: null,
            database: null,
            table: null,
            template: null
        },
        code: "SELECT * FROM datasources LIMIT 10 OFFSET 0",
	}),
	actions: {
		async getDatasources(id: number) {
			const { data } = await ApiService.v1.DatasourcesQueries.getDatabaseList({
				datasources_id: id,
				operation: "getDatabaseList"
			})
			this.list = data
			return data
		},
		async getDatabaseList(id: number) {
			const { data } = await ApiService.v1.DatasourcesQueries.getDatabaseList({
				datasources_id: id,
				operation: "getDatabaseList"
			})
			return data
		},
		async getTableList(id: number, database: string) {
			const { data } = await ApiService.v1.DatasourcesQueries.getTableList({
				datasources_id: id,
				operation: "getTableList",
				database_name: database
			})
			return data
		},
		async connectDB(id: number) {
			const { data } = await ApiService.v1.DatasourcesQueries.connectDB({
				datasources_id: id,
				operation: "connection"
			})
			this.list = data
		},
        async getTableColumns(id: any, database: any, table: any) {
            this.selectStage.database = database
            this.selectStage.table = table
            this.selectStage.datasource = id
            this.selectStage.template = "Column"    
            const sql = "SELECT * FROM datasources LIMIT 10 OFFSET 0"
            const modifiedSql = this.selectStage.table ? sql.replace(/datasources/g, this.selectStage.table) : sql;
            this.code = modifiedSql
            const { data } = await ApiService.v1.DatasourcesQueries.getTableList({
                datasources_id: id,
                operation: "getTableColumnList",
                database_name: database,
                table_name: table
            })

            this.getDataTable(modifiedSql)
            this.TableColumns = data.result
        },
        async getDataTable(sql: any) {
            const { data } = await ApiService.v1.DatasourcesQueries.getTableList({
                datasources_id: this.selectStage.datasource,
                operation: "getTableDataList",
                database_name: this.selectStage.database,
                query : sql
            })
            this.TableData = data.result
        },
        async executeQuery(sql: any) {
            const { data } = await ApiService.v1.DatasourcesQueries.getTableList({
                datasources_id: this.selectStage.datasource,
                operation: "getTableDataList",
                database_name: this.selectStage.database,
                query : sql
            })
            this.TableDataExecuteQuery = data.result
        }
	},
	getters: {}
})
