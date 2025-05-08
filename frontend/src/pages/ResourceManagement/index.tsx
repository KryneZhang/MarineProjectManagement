import React, { useState, useEffect } from 'react';
import { Card, Tabs, Table, Tag, Button, Space, Modal, Form, Input, Select, InputNumber, message, Tooltip, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, ToolOutlined, ShoppingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import axios from 'axios';

const { TabPane } = Tabs;
const { TextArea } = Input;

interface HumanResource {
  id: number;
  name: string;
  position: string;
  department: string;
  skills: string[];
  status: string;
  contact: string;
  email: string;
  availability: number;
}

interface EquipmentResource {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
  maintenanceStatus: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
}

interface MaterialResource {
  id: number;
  name: string;
  type: string;
  quantity: number;
  unit: string;
  status: string;
  location: string;
  supplier: string;
  lastRestockDate: string;
}

const ResourceManagement: React.FC = () => {
  const [humanResources, setHumanResources] = useState<HumanResource[]>([]);
  const [equipmentResources, setEquipmentResources] = useState<EquipmentResource[]>([]);
  const [materialResources, setMaterialResources] = useState<MaterialResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [humanModalVisible, setHumanModalVisible] = useState(false);
  const [equipmentModalVisible, setEquipmentModalVisible] = useState(false);
  const [materialModalVisible, setMaterialModalVisible] = useState(false);
  const [humanForm] = Form.useForm();
  const [equipmentForm] = Form.useForm();
  const [materialForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [humanRes, equipmentRes, materialRes] = await Promise.all([
        axios.get('http://localhost:8088/api/resources/human'),
        axios.get('http://localhost:8088/api/resources/equipment'),
        axios.get('http://localhost:8088/api/resources/material')
      ]);
      setHumanResources(humanRes.data);
      setEquipmentResources(equipmentRes.data);
      setMaterialResources(materialRes.data);
    } catch (error) {
      message.error('获取数据失败');
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const humanColumns: ColumnsType<HumanResource> = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: '技能',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills: string[]) => (
        <>
          {skills.map(skill => (
            <Tag key={skill} color="blue">{skill}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '可用': 'success',
          '工作中': 'processing',
          '休假': 'warning',
          '离职': 'error',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '可用性',
      dataIndex: 'availability',
      key: 'availability',
      render: (availability: number) => (
        <Tooltip title={`${availability}%`}>
          <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: 4 }}>
            <div
              style={{
                width: `${availability}%`,
                height: 20,
                backgroundColor: availability >= 80 ? '#52c41a' : availability >= 50 ? '#1890ff' : '#faad14',
                borderRadius: 4,
                transition: 'all 0.3s',
              }}
            />
          </div>
        </Tooltip>
      ),
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditHuman(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteHuman(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const equipmentColumns: ColumnsType<EquipmentResource> = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '可用': 'success',
          '使用中': 'processing',
          '维修中': 'warning',
          '报废': 'error',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '维护状态',
      dataIndex: 'maintenanceStatus',
      key: 'maintenanceStatus',
      render: (status: string) => {
        const colors = {
          '正常': 'success',
          '待维护': 'warning',
          '维护中': 'processing',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '上次维护日期',
      dataIndex: 'lastMaintenanceDate',
      key: 'lastMaintenanceDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '下次维护日期',
      dataIndex: 'nextMaintenanceDate',
      key: 'nextMaintenanceDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditEquipment(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteEquipment(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const materialColumns: ColumnsType<MaterialResource> = [
    {
      title: '材料名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity: number, record: MaterialResource) => `${quantity} ${record.unit}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '充足': 'success',
          '正常': 'processing',
          '不足': 'warning',
          '缺货': 'error',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '位置',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: '供应商',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: '上次补货日期',
      dataIndex: 'lastRestockDate',
      key: 'lastRestockDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />}
            onClick={() => handleEditMaterial(record)}
          >
            编辑
          </Button>
          <Button 
            type="link" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMaterial(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddHuman = () => {
    humanForm.resetFields();
    setHumanModalVisible(true);
  };

  const handleEditHuman = (resource: HumanResource) => {
    humanForm.setFieldsValue(resource);
    setHumanModalVisible(true);
  };

  const handleDeleteHuman = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/resources/human/${id}`);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleAddEquipment = () => {
    equipmentForm.resetFields();
    setEquipmentModalVisible(true);
  };

  const handleEditEquipment = (resource: EquipmentResource) => {
    equipmentForm.setFieldsValue({
      ...resource,
      lastMaintenanceDate: dayjs(resource.lastMaintenanceDate),
      nextMaintenanceDate: dayjs(resource.nextMaintenanceDate),
    });
    setEquipmentModalVisible(true);
  };

  const handleDeleteEquipment = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/resources/equipment/${id}`);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleAddMaterial = () => {
    materialForm.resetFields();
    setMaterialModalVisible(true);
  };

  const handleEditMaterial = (resource: MaterialResource) => {
    materialForm.setFieldsValue({
      ...resource,
      lastRestockDate: dayjs(resource.lastRestockDate),
    });
    setMaterialModalVisible(true);
  };

  const handleDeleteMaterial = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/resources/material/${id}`);
      message.success('删除成功');
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmitHuman = async (values: any) => {
    try {
      await axios.post('http://localhost:8088/api/resources/human', values);
      message.success('添加成功');
      setHumanModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleSubmitEquipment = async (values: any) => {
    try {
      const data = {
        ...values,
        lastMaintenanceDate: values.lastMaintenanceDate.format('YYYY-MM-DD'),
        nextMaintenanceDate: values.nextMaintenanceDate.format('YYYY-MM-DD'),
      };
      await axios.post('http://localhost:8088/api/resources/equipment', data);
      message.success('添加成功');
      setEquipmentModalVisible(false);
      fetchData();
    } catch (error) {
      message.error('添加失败');
    }
  };

  const handleSubmitMaterial = async (values: any) => {
    try {
      const data = {
        ...values,
        lastRestockDate: values.lastRestockDate.format('YYYY-MM-DD'),
      };
      await axios.post('http://localhost:8088/api/resources/material', data);
      message.success('添加成功');
      setMaterialModalVisible(false);
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
              <UserOutlined />
              人力资源
            </span>
          } 
          key="1"
        >
          <Card
            title="人力资源"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddHuman}
              >
                添加人员
              </Button>
            }
          >
            <Table 
              columns={humanColumns} 
              dataSource={humanResources} 
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <ToolOutlined />
              设备资源
            </span>
          } 
          key="2"
        >
          <Card
            title="设备资源"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddEquipment}
              >
                添加设备
              </Button>
            }
          >
            <Table 
              columns={equipmentColumns} 
              dataSource={equipmentResources} 
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>

        <TabPane 
          tab={
            <span>
              <ShoppingOutlined />
              材料资源
            </span>
          } 
          key="3"
        >
          <Card
            title="材料资源"
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={handleAddMaterial}
              >
                添加材料
              </Button>
            }
          >
            <Table 
              columns={materialColumns} 
              dataSource={materialResources} 
              rowKey="id"
              loading={loading}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title="添加人员"
        open={humanModalVisible}
        onCancel={() => setHumanModalVisible(false)}
        footer={null}
      >
        <Form
          form={humanForm}
          layout="vertical"
          onFinish={handleSubmitHuman}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true, message: '请输入职位' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="department"
            label="部门"
            rules={[{ required: true, message: '请输入部门' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="skills"
            label="技能"
            rules={[{ required: true, message: '请选择技能' }]}
          >
            <Select mode="tags" placeholder="请输入技能">
              <Select.Option value="项目管理">项目管理</Select.Option>
              <Select.Option value="技术开发">技术开发</Select.Option>
              <Select.Option value="质量控制">质量控制</Select.Option>
              <Select.Option value="安全管理">安全管理</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="可用">可用</Select.Option>
              <Select.Option value="工作中">工作中</Select.Option>
              <Select.Option value="休假">休假</Select.Option>
              <Select.Option value="离职">离职</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="availability"
            label="可用性"
            rules={[{ required: true, message: '请输入可用性' }]}
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
            name="contact"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setHumanModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="添加设备"
        open={equipmentModalVisible}
        onCancel={() => setEquipmentModalVisible(false)}
        footer={null}
      >
        <Form
          form={equipmentForm}
          layout="vertical"
          onFinish={handleSubmitEquipment}
        >
          <Form.Item
            name="name"
            label="设备名称"
            rules={[{ required: true, message: '请输入设备名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请输入类型' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="可用">可用</Select.Option>
              <Select.Option value="使用中">使用中</Select.Option>
              <Select.Option value="维修中">维修中</Select.Option>
              <Select.Option value="报废">报废</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maintenanceStatus"
            label="维护状态"
            rules={[{ required: true, message: '请选择维护状态' }]}
          >
            <Select>
              <Select.Option value="正常">正常</Select.Option>
              <Select.Option value="待维护">待维护</Select.Option>
              <Select.Option value="维护中">维护中</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="lastMaintenanceDate"
            label="上次维护日期"
            rules={[{ required: true, message: '请选择上次维护日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="nextMaintenanceDate"
            label="下次维护日期"
            rules={[{ required: true, message: '请选择下次维护日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setEquipmentModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="添加材料"
        open={materialModalVisible}
        onCancel={() => setMaterialModalVisible(false)}
        footer={null}
      >
        <Form
          form={materialForm}
          layout="vertical"
          onFinish={handleSubmitMaterial}
        >
          <Form.Item
            name="name"
            label="材料名称"
            rules={[{ required: true, message: '请输入材料名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请输入类型' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="数量"
            rules={[{ required: true, message: '请输入数量' }]}
          >
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item
            name="unit"
            label="单位"
            rules={[{ required: true, message: '请输入单位' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="充足">充足</Select.Option>
              <Select.Option value="正常">正常</Select.Option>
              <Select.Option value="不足">不足</Select.Option>
              <Select.Option value="缺货">缺货</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="location"
            label="位置"
            rules={[{ required: true, message: '请输入位置' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="supplier"
            label="供应商"
            rules={[{ required: true, message: '请输入供应商' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastRestockDate"
            label="上次补货日期"
            rules={[{ required: true, message: '请选择上次补货日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setMaterialModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResourceManagement; 