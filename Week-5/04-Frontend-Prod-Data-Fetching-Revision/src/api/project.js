import axiosInstance from "./axios";

/**
 * Part-4:
*/

const projectService = {
    getProjects: async () => {
        const response = await axiosInstance.get("/projects")
        return response.data
    },
    getProjectById: async (projectId) => {
        const response = await axiosInstance.get(`/projects/${projectId}`)
        return response.data
    },
    createProject: async (projectData) => {
        const response = await axiosInstance.post(`/projects`, projectData)
        return response.data
    },
}