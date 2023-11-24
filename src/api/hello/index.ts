import request from '@/utils/axios/axios'
import { exampleModel } from '../types/hello'

enum API {
    example = '/hotlist?type=history'
}

export const exampleAPI = async () => {
    return request.get<exampleModel>({ url: API.example })
}