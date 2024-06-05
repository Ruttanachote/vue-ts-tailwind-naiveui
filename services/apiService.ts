import axios from "@/plugins/axios"

const Datasources = {
	getDatasources: () => axios.get("/api/v1/datasources"),
    addDatasources: (data: any) => axios.post("/api/v1/datasources", data),
    createPipline: (data: any) => axios.post("/api/v1/datasources/queries", data),
    getDatasourcesPipeline: (params: any) => axios.get("/api/v1/datasources/pipelines", { params } ),
    executePipline: (params: any) => axios.get("/api/v1/datasources/pipelines/execute", {params}),
}
const Authentication = { 
    signIn: (data: any) => axios.post("/api/v1/auth/login", data),
}

const DatasourcesQueries = {
     getDatabaseList : (data: any) => axios.post("/api/v1/datasources/queries", data),
     getTableList : (data: any) => axios.post("/api/v1/datasources/queries", data),
     connectDB : (data: any) => axios.post("/api/v1/datasources/queries", data),
     getTableColumns : (data: any) => axios.post("/api/v1/datasources/queries", data),
}
export const ApiService = {
	v1: {
		Datasources,
        Authentication,
        DatasourcesQueries
	}
}
