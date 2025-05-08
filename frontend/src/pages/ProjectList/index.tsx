import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, DatePicker, InputNumber, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

interface Project {
  id: number;
  name: string;
  code: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  budget: number;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/projects');
      setProjects(response.data);
    } catch (error) {
      message.error('获取项目列表失败');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const columns: ColumnsType<Project> = [
    {
      title: '项目编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '开始日期',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '结束日期',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      render: (budget: number) => `¥${budget.toLocaleString()}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => navigate(`/projects/${record.id}`)}>
            查看详情
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleCreate = async (values: any) => {
    try {
      await axios.post('http://localhost:8088/api/projects', {
        ...values,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString(),
      });
      message.success('创建项目成功');
      setIsModalVisible(false);
      form.resetFields();
      fetchProjects();
    } catch (error) {
      message.error('创建项目失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/projects/${id}`);
      message.success('删除项目成功');
      fetchProjects();
    } catch (error) {
      message.error('删除项目失败');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          新建项目
        </Button>
      </div>

      <Table columns={columns} dataSource={projects} rowKey="id" />

      <Modal
        title="新建项目"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="name"
            label="项目名称"
            rules={[{ required: true, message: '请输入项目名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="code"
            label="项目编号"
            rules={[{ required: true, message: '请输入项目编号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="项目描述"
            rules={[{ required: true, message: '请输入项目描述' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="start_date"
            label="开始日期"
            rules={[{ required: true, message: '请选择开始日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="end_date"
            label="结束日期"
            rules={[{ required: true, message: '请选择结束日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="status"
            label="项目状态"
            rules={[{ required: true, message: '请选择项目状态' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="budget"
            label="项目预算"
            rules={[{ required: true, message: '请输入项目预算' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\¥\s?|(,*)/g, '')}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectList; 