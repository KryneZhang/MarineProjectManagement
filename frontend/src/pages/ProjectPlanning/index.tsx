import React, { useState, useEffect } from 'react';
import { Card, Form, Input, DatePicker, InputNumber, Select, Button, Table, Space, Modal, message, Tag, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import axios from 'axios';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface ProjectPlan {
  id: number;
  name: string;
  phase: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: string;
  description: string;
  progress: number;
  priority: string;
  responsible: string;
}

const ProjectPlanning: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [plans, setPlans] = useState<ProjectPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<ProjectPlan | null>(null);
  const [viewingPlan, setViewingPlan] = useState<ProjectPlan | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8088/api/plans');
      setPlans(response.data);
    } catch (error) {
      message.error('获取计划列表失败');
      console.error('获取计划列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<ProjectPlan> = [
    {
      title: '计划名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '阶段',
      dataIndex: 'phase',
      key: 'phase',
      width: 120,
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '预算',
      dataIndex: 'budget',
      key: 'budget',
      width: 120,
      render: (budget: number) => `¥${budget.toLocaleString()}`,
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      width: 100,
      render: (progress: number) => (
        <Tooltip title={`${progress}%`}>
          <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <div
              style={{
                width: `${progress}%`,
                height: 20,
                backgroundColor: progress === 100 ? '#52c41a' : '#1890ff',
                borderRadius: 4,
                transition: 'all 0.3s',
              }}
            />
          </div>
        </Tooltip>
      ),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
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
      width: 100,
      render: (status: string) => {
        const colors = {
          '未开始': 'default',
          '进行中': 'processing',
          '已完成': 'success',
          '已暂停': 'warning',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '负责人',
      dataIndex: 'responsible',
      key: 'responsible',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingPlan(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (plan: ProjectPlan) => {
    setEditingPlan(plan);
    form.setFieldsValue({
      ...plan,
      dateRange: [dayjs(plan.startDate), dayjs(plan.endDate)],
    });
    setIsModalVisible(true);
  };

  const handleView = (plan: ProjectPlan) => {
    setViewingPlan(plan);
    setIsViewModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/plans/${id}`);
      message.success('删除成功');
      fetchPlans();
    } catch (error) {
      message.error('删除失败');
      console.error('删除失败:', error);
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const [startDate, endDate] = values.dateRange;
      const planData = {
        ...values,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
      };

      if (editingPlan) {
        await axios.put(`http://localhost:8088/api/plans/${editingPlan.id}`, planData);
        message.success('更新成功');
      } else {
        await axios.post('http://localhost:8088/api/plans', planData);
        message.success('添加成功');
      }

      setIsModalVisible(false);
      form.resetFields();
      fetchPlans();
    } catch (error) {
      message.error(editingPlan ? '更新失败' : '添加失败');
      console.error(editingPlan ? '更新失败:' : '添加失败:', error);
    }
  };

  return (
    <div>
      <Card
        title="项目规划"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加计划
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={plans} 
          rowKey="id"
          loading={loading}
          scroll={{ x: 1500 }}
        />
      </Card>

      <Modal
        title={editingPlan ? "编辑计划" : "添加计划"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="计划名称"
            rules={[{ required: true, message: '请输入计划名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phase"
            label="阶段"
            rules={[{ required: true, message: '请选择阶段' }]}
          >
            <Select>
              <Select.Option value="前期准备">前期准备</Select.Option>
              <Select.Option value="设计阶段">设计阶段</Select.Option>
              <Select.Option value="施工阶段">施工阶段</Select.Option>
              <Select.Option value="验收阶段">验收阶段</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="计划时间"
            rules={[{ required: true, message: '请选择计划时间' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="budget"
            label="预算"
            rules={[{ required: true, message: '请输入预算' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\¥\s?|(,*)/g, '')}
            />
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
              formatter={value => `${value}%`}
              parser={value => {
                const num = Number(value?.replace('%', ''));
                return Math.min(Math.max(num, 0), 100) as 0 | 100;
              }}
            />
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
              <Select.Option value="未开始">未开始</Select.Option>
              <Select.Option value="进行中">进行中</Select.Option>
              <Select.Option value="已完成">已完成</Select.Option>
              <Select.Option value="已暂停">已暂停</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="responsible"
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
                {editingPlan ? '保存' : '添加'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="计划详情"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={600}
      >
        {viewingPlan && (
          <div>
            <p><strong>计划名称：</strong>{viewingPlan.name}</p>
            <p><strong>阶段：</strong>{viewingPlan.phase}</p>
            <p><strong>开始日期：</strong>{dayjs(viewingPlan.startDate).format('YYYY-MM-DD')}</p>
            <p><strong>结束日期：</strong>{dayjs(viewingPlan.endDate).format('YYYY-MM-DD')}</p>
            <p><strong>预算：</strong>¥{viewingPlan.budget.toLocaleString()}</p>
            <p><strong>进度：</strong>{viewingPlan.progress}%</p>
            <p><strong>优先级：</strong>{viewingPlan.priority}</p>
            <p><strong>状态：</strong>{viewingPlan.status}</p>
            <p><strong>负责人：</strong>{viewingPlan.responsible}</p>
            <p><strong>描述：</strong>{viewingPlan.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProjectPlanning; 