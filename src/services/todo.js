import request from '@/utils/request';
export const getTodoLists = async ()=>{
    return request('/api/todolists');
}