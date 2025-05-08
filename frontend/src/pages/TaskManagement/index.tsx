import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, DatePicker, InputNumber, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import axios from 'axios';

interface Task {
  id: number;
  project_id: number;
  name: string;
  wbs_code: string;
  start_date: string;
  end_date: string;
  duration: number;
  progress: number;
  status: string;
  parent_task_id: number | null;
}

interface Project {
  id: number;
  name: string;
}

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/tasks');
      setTasks(response.data);
    } catch (error) {
      message.error('获取任务列表失败');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/projects');
      setProjects(response.data);
    } catch (error) {
      message.error('获取项目列表失败');
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const columns: ColumnsType<Task> = [
    {
      title: 'WBS编码',
      dataIndex: 'wbs_code',
      key: 'wbs_code',
    },
    {
      title: '任务名称',
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
      title: '工期(天)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => `${progress}%`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
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
      await axios.post('http://localhost:8088/api/tasks', {
        ...values,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString(),
      });
      message.success('创建任务成功');
      setIsModalVisible(false);
      form.resetFields();
      fetchTasks();
    } catch (error) {
      message.error('创建任务失败');
    }
  };

  const handleEdit = (task: Task) => {
    form.setFieldsValue({
      ...task,
      start_date: dayjs(task.start_date),
      end_date: dayjs(task.end_date),
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/tasks/${id}`);
      message.success('删除任务成功');
      fetchTasks();
    } catch (error) {
      message.error('删除任务失败');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          新建任务
        </Button>
      </div>

      <Table columns={columns} dataSource={tasks} rowKey="id" />

      <Modal
        title="任务信息"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            name="project_id"
            label="所属项目"
            rules={[{ required: true, message: '请选择所属项目' }]}
          >
            <Select>
              {projects.map(project => (
                <Select.Option key={project.id} value={project.id}>
                  {project.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="wbs_code"
            label="WBS编码"
            rules={[{ required: true, message: '请输入WBS编码' }]}
          >
            <Input />
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
            name="duration"
            label="工期(天)"
            rules={[{ required: true, message: '请输入工期' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="progress"
            label="进度"
            rules={[{ required: true, message: '请输入进度' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value) => {
                const num = Number(value?.replace('%', ''));
                return Math.min(Math.max(num, 0), 100) as 0 | 100;
              }}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="未开始">未开始</Select.Option>
              <Select.Option value="进行中">进行中</Select.Option>
              <Select.Option value="已完成">已完成</Select.Option>
              <Select.Option value="已暂停">已暂停</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManagement; 