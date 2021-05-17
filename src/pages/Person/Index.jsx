import React,{useEffect} from 'react';
import { Button, Tooltip, Dropdown, Menu, Input } from 'antd';
import { EllipsisOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import {PageContainer} from '@ant-design/pro-layout';
import {getPerson} from "../../services/person";
import {connect} from 'dva'

const Person=(props) => {

    const {dispatch}=props;

    useEffect(()=>{
        dispatch({
            type:'person/fetchPersons',
            payload:null
        })
    },[]);

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age'
        }
    ];


  return (
    <PageContainer>
        <ProTable
            columns={columns}
            dataSource={props.person.persons}
            rowKey="key"
            pagination={{
                showQuickJumper: true,
            }}
            search={{
                layout: 'vertical',
                defaultCollapsed: false,
            }}
            dateFormatter="string"
            toolbar={{
                title: '高级表格',
                tooltip: '这是一个标题提示',
            }}
            />
    </PageContainer>
  );
};

export default connect(({person})=>({person}))(Person)