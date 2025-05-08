import React, { useState, useEffect } from 'react';
import { Card, Tabs, Table, Tag, Button, Space, Modal, Form, Input, DatePicker, Select, InputNumber, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import axios from 'axios';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface Milestone {
  id: number;
  name: string;
  projectId: number;
  dueDate: string;
  status: string;
  description: string;
  completionDate?: string;
}

interface Issue {
  id: number;
  title: string;
  projectId: number;
  type: string;
  priority: string;
  status: string;
  assignee: string;
  description: string;
  createdAt: string;
  resolvedAt?: string;
}

interface Progress {
  id: number;
  projectId: number;
  date: string;
  completion: number;
  description: string;
  updatedBy: string;
}

const ProjectExecution: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(false);
  const [milestoneModalVisible, setMilestoneModalVisible] = useState(false);
  const [issueModalVisible, setIssueModalVisible] = useState(false);
  const [progressModalVisible, setProgressModalVisible] = useState(false);
  const [milestoneForm] = Form.useForm();
  const [issueForm] = Form.useForm();
  const [progressForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [milestonesRes, issuesRes, progressRes] = await Promise.all([
        axios.get('http://localhost:8088/api/milestones'),
        axios.get('http://localhost:8088/api/issues'),
        axios.get('http://localhost:8088/api/progress')
      ]);
      setMilestones(milestonesRes.data);
      setIssues(issuesRes.data);
      setProgress(progressRes.data);
    } catch (error) {
      message.error('获取数据失败');
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const milestoneColumns: ColumnsType<Milestone> = [
    {
      title: '里程碑名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '未开始': 'default',
          '进行中': 'processing',
          '已完成': 'success',
          '已延期': 'error',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '完成日期',
      dataIndex: 'completionDate',
      key: 'completionDate',
      render: (date: string) => date ? dayjs(date).format('YYYY-MM-DD') : '-',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditMilestone(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMilestone(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const issueColumns: ColumnsType<Issue> = [
    {
      title: '问题标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const colors = {
          '风险': 'red',
          '问题': 'orange',
          '变更': 'blue',
        };
        return <Tag color={colors[type as keyof typeof colors]}>{type}</Tag>;
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const colors = {
          '高': 'red',
          '中': 'orange',
          '低': 'green',
        };
        return <Tag color={colors[priority as keyof typeof colors]}>{priority}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '待处理': 'default',
          '处理中': 'processing',
          '已解决': 'success',
          '已关闭': 'default',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditIssue(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteIssue(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const progressColumns: ColumnsType<Progress> = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '完成度',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion: number) => (
        <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: 4 }}>
          <div
            style={{
              width: `${completion}%`,
              height: 20,
              backgroundColor: completion === 100 ? '#52c41a' : '#1890ff',
              borderRadius: 4,
              transition: 'all 0.3s',
            }}
          />
        </div>
      ),
    },
    {
      title: '更新人',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
  ];

  const handleAddMilestone = () => {
    milestoneForm.resetFields();
    setMilestoneModalVisible(true);
  };

  const handleEditMilestone = (milestone: Milestone) => {
    milestoneForm.setFieldsValue({
      ...milestone,
      dueDate: dayjs(milestone.dueDate),
      completionDate: milestone.completionDate ? dayjs(milestone.completionDate) : undefined,
    });
    setMilestoneModalVisible(true);
  };

  const handleDeleteMilestone = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/milestones/${id}`);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleAddIssue = () => {
    issueForm.resetFields();
    setIssueModalVisible(true);
  };

  const handleEditIssue = (issue: Issue) => {
    issueForm.setFieldsValue({
      ...issue,
      createdAt: dayjs(issue.createdAt),
      resolvedAt: issue.resolvedAt ? dayjs(issue.resolvedAt) : undefined,
    });
    setIssueModalVisible(true);
  };

  const handleDeleteIssue = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/issues/${id}`);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleAddProgress = () => {
    progressForm.resetFields();
    setProgressModalVisible(true);
  };

  const handleSubmitMilestone = async (values: any) => {
    try {
      const data = {
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        completionDate: values.completionDate?.format('YYYY-MM-DD'),
      };
      await axios.post('http://localhost:8088/api/milestones', data);
      message.success('添加成功');
      setMilestoneModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleSubmitIssue = async (values: any) => {
    try {
      const data = {
        ...values,
        createdAt: values.createdAt.format('YYYY-MM-DD HH:mm:ss'),
        resolvedAt: values.resolvedAt?.format('YYYY-MM-DD HH:mm:ss'),
      };
      await axios.post('http://localhost:8088/api/issues', data);
      message.success('添加成功');
      setIssueModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleSubmitProgress = async (values: any) => {
    try {
      const data = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };
      await axios.post('http://localhost:8088/api/progress', data);
      message.success('添加成功');
      setProgressModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('添加失败');
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane 
          tab={
            <span>
              <CheckCircleOutlined />
              里程碑管理
            </span>
          } 
          key="1"
        >
          <Card
            title="里程碑管理"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddMilestone}
              >
                添加里程碑
              </Button>
            }
          >
            <Table 
              columns={milestoneColumns} 
              dataSource={milestones} 
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <ExclamationCircleOutlined />
              问题跟踪
            </span>
          } 
          key="2"
        >
          <Card
            title="问题跟踪"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddIssue}
              >
                添加问题
              </Button>
            }
          >
            <Table 
              columns={issueColumns} 
              dataSource={issues} 
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <CheckCircleOutlined />
              进度跟踪
            </span>
          } 
          key="3"
        >
          <Card
            title="进度跟踪"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddProgress}
              >
                更新进度
              </Button>
            }
          >
            <Table 
              columns={progressColumns} 
              dataSource={progress} 
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="添加里程碑"
        open={milestoneModalVisible}
        onCancel={() => setMilestoneModalVisible(false)}
        footer={null}
      >
        <Form
          form={milestoneForm}
          layout="vertical"
          onFinish={handleSubmitMilestone}
        >
          <Form.Item
            name="name"
            label="里程碑名称"
            rules={[{ required: true, message: '请输入里程碑名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="截止日期"
            rules={[{ required: true, message: '请选择截止日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
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
              <Select.Option value="已延期">已延期</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="completionDate"
            label="完成日期"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setMilestoneModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="添加问题"
        open={issueModalVisible}
        onCancel={() => setIssueModalVisible(false)}
        footer={null}
      >
        <Form
          form={issueForm}
          layout="vertical"
          onFinish={handleSubmitIssue}
        >
          <Form.Item
            name="title"
            label="问题标题"
            rules={[{ required: true, message: '请输入问题标题' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="风险">风险</Select.Option>
              <Select.Option value="问题">问题</Select.Option>
              <Select.Option value="变更">变更</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select>
              <Select.Option value="高">高</Select.Option>
              <Select.Option value="中">中</Select.Option>
              <Select.Option value="低">低</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="待处理">待处理</Select.Option>
              <Select.Option value="处理中">处理中</Select.Option>
              <Select.Option value="已解决">已解决</Select.Option>
              <Select.Option value="已关闭">已关闭</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assignee"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setIssueModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="更新进度"
        open={progressModalVisible}
        onCancel={() => setProgressModalVisible(false)}
        footer={null}
      >
        <Form
          form={progressForm}
          layout="vertical"
          onFinish={handleSubmitProgress}
        >
          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="completion"
            label="完成度"
            rules={[{ required: true, message: '请输入完成度' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              formatter={value => `${value}%`}
              parser={value => {
                const num = Number(value?.replace('%', ''));
                return Math.min(Math.max(num, 0), 100) as 0 | 100;
              }}
            />
          </Form.Item>

          <Form.Item
            name="updatedBy"
            label="更新人"
            rules={[{ required: true, message: '请输入更新人' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setProgressModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProjectExecution; 