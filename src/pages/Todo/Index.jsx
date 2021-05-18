import React,{useEffect,useState} from 'react';
import { Button, Tooltip,Alert } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getTodoLists} from "../../services/todo";
import {connect} from 'dva';

const Todo= (props) => {

  const[data,setData]=useState([]);

  const status=[
      <Alert message="待办" type="info" showIcon />,
      <Alert message="已完成" type="success" showIcon />,
      <Alert message="已取消" type="error" showIcon />
  ]

  useEffect(async ()=>{
    // const resData=await getTodoLists();
    setData(props.todo.todoList);
  },[]);




    const columns = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (_,record) => status[record.status]
        },
        {
            title: '修改状态',
            render: () => [
                <a key="link">待办 </a>,
                <a key="link2">完成 </a>,
                <a key="link3">取消</a>
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable
                columns={columns}
                dataSource={data}
                //request={async ()=>({data:await getTodoLists()})}
                rowKey="id"
                search={false}
                dateFormatter="string"
                headerTitle="待办事项列表"
                toolBarRender={() => [
                    <Button type="primary" key="primary">
                        <PlusOutlined /> 添加
                    </Button>,
                ]}
            />
        </PageContainer>
    );
};

export default connect(({todo})=>({todo}))(Todo);
