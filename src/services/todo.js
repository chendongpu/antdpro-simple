import request from '@/utils/request';
export const getTodoLists = async ()=>{
    return request('/api/todolists');
}

export const add = async (data)=>{
    const url='/api/todo';
    const options={
        data
    };
    return request.post(url,options);
}