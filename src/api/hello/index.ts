import request from '@/utils/axios/axios'
import { exampleModel } from '../types/hello'

enum API {
    example = ''
}

export const exampleAPI = async () => {
    return await request.get<exampleModel>({ url: API.example })
}
