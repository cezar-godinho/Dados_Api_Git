import axios, { AxiosResponse } from "axios"

const baseUrl:string = "http://localhost:5000"

export const getDados = async (): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const dados: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/data"
    )
    return dados
  } catch (error) {
    throw new Error(error)
  }
}