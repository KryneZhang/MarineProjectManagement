import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Select, message, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface Supplier {
  id: number;
  name: string;
  type: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  rating: number;
  materials: string[];
}

const SupplierManagement: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8088/api/suppliers');
      setSuppliers(response.data);
    } catch (error) {
      message.error('获取供应商数据失败');
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Supplier> = [
    {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '活跃': 'success',
          '待审核': 'warning',
          '暂停': 'error',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '评级',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => {
        const colors = {
          5: 'success',
          4: 'processing',
          3: 'warning',
          2: 'error',
          1: 'error',
        };
        return <Tag color={colors[rating as keyof typeof colors]}>{rating}星</Tag>;
      },
    },
    {
      title: '供应材料',
      dataIndex: 'materials',
      key: 'materials',
      render: (materials: string[]) => (
        <>
          {materials.map(material => (
            <Tag key={material} color="blue">{material}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
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
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (supplier: Supplier) => {
    form.setFieldsValue(supplier);
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/suppliers/${id}`);
      message.success('删除成功');
      fetchSuppliers();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      await axios.post('http://localhost:8088/api/suppliers', values);
      message.success('保存成功');
      setModalVisible(false);
      fetchSuppliers();
    } catch (error) {
      message.error('保存失败');
    }
  };

  return (
    <div>
      <Card
        title="供应商管理"
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            添加供应商
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={suppliers} 
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title="供应商信息"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="供应商名称"
            rules={[{ required: true, message: '请输入供应商名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select>
              <Select.Option value="设备供应商">设备供应商</Select.Option>
              <Select.Option value="材料供应商">材料供应商</Select.Option>
              <Select.Option value="服务供应商">服务供应商</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="contact"
            label="联系人"
            rules={[{ required: true, message: '请输入联系人' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
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

          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="活跃">活跃</Select.Option>
              <Select.Option value="待审核">待审核</Select.Option>
              <Select.Option value="暂停">暂停</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="rating"
            label="评级"
            rules={[{ required: true, message: '请选择评级' }]}
          >
            <Select>
              <Select.Option value={5}>5星</Select.Option>
              <Select.Option value={4}>4星</Select.Option>
              <Select.Option value={3}>3星</Select.Option>
              <Select.Option value={2}>2星</Select.Option>
              <Select.Option value={1}>1星</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="materials"
            label="供应材料"
            rules={[{ required: true, message: '请选择供应材料' }]}
          >
            <Select mode="tags" placeholder="请输入供应材料">
              <Select.Option value="钢材">钢材</Select.Option>
              <Select.Option value="水泥">水泥</Select.Option>
              <Select.Option value="木材">木材</Select.Option>
              <Select.Option value="设备">设备</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupplierManagement; 