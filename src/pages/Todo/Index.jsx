import React,{useEffect,useState} from 'react';
import { Button, Modal,Alert,message } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {add, getTodoLists} from "../../services/todo";
import {connect} from 'dva';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Todo= (props) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleForm =async (value) => {
        const res=await add(value);

        if(res.code===0){
            props.dispatch({
                type:'todo/getTodoList',
                payload:null
            });
            message.success(res.message);
        }else{
            message.error("error");
        }

    };




  const status=[
      <Alert message="待办" type="info" showIcon />,
      <Alert message="已完成" type="success" showIcon />,
      <Alert message="已取消" type="error" showIcon />
  ]

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
                dataSource={props.todo.todoList}
                //request={async ()=>({data:await getTodoLists()})}
                rowKey="id"
                search={false}
                dateFormatter="string"
                headerTitle="待办事项列表"
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={showModal}>
                        <PlusOutlined /> 添加
                    </Button>,
                ]}
            />

            <Modal title="添加待办事项" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <ProForm onFinish={(value)=>{handleForm(value)}}>
                    <ProFormText name="todo" label="待办事项" rules={[{required:true}]} />
                </ProForm>
            </Modal>
        </PageContainer>
    );
};

export default connect(({todo})=>({todo}))(Todo);
