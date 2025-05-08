import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Upload, 
  message, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Tag,
  Tooltip,
  Popconfirm
} from 'antd';
import { 
  PlusOutlined, 
  UploadOutlined, 
  DownloadOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  FileTextOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileZipOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile } from 'antd/es/upload/interface';
import axios from 'axios';

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  size: number;
  uploadTime: string;
  uploader: string;
  description: string;
  version: string;
  status: string;
  url: string;
}

const DocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8088/api/documents');
      setDocuments(response.data);
    } catch (error) {
      message.error('获取文档列表失败');
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'pdf': <FilePdfOutlined style={{ color: '#ff4d4f' }} />,
      'doc': <FileWordOutlined style={{ color: '#1890ff' }} />,
      'docx': <FileWordOutlined style={{ color: '#1890ff' }} />,
      'xls': <FileExcelOutlined style={{ color: '#52c41a' }} />,
      'xlsx': <FileExcelOutlined style={{ color: '#52c41a' }} />,
      'jpg': <FileImageOutlined style={{ color: '#722ed1' }} />,
      'png': <FileImageOutlined style={{ color: '#722ed1' }} />,
      'zip': <FileZipOutlined style={{ color: '#faad14' }} />,
      'rar': <FileZipOutlined style={{ color: '#faad14' }} />,
    };
    return icons[type.toLowerCase()] || <FileTextOutlined />;
  };

  const columns: ColumnsType<Document> = [
    {
      title: '文档名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Document) => (
        <Space>
          {getFileIcon(record.type)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => type.toUpperCase(),
    },
    {
      title: '分类',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const colors = {
          '项目文档': 'blue',
          '技术文档': 'green',
          '合同文档': 'purple',
          '会议记录': 'orange',
          '其他': 'default',
        };
        return <Tag color={colors[category as keyof typeof colors]}>{category}</Tag>;
      },
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => {
        const units = ['B', 'KB', 'MB', 'GB'];
        let index = 0;
        while (size >= 1024 && index < units.length - 1) {
          size /= 1024;
          index++;
        }
        return `${size.toFixed(2)} ${units[index]}`;
      },
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '上传者',
      dataIndex: 'uploader',
      key: 'uploader',
    },
    {
      title: '版本',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '已发布': 'success',
          '审核中': 'processing',
          '已过期': 'warning',
          '已归档': 'default',
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Tooltip title="预览">
            <Button 
              type="link" 
              icon={<EyeOutlined />}
              onClick={() => handlePreview(record)}
            />
          </Tooltip>
          <Tooltip title="下载">
            <Button 
              type="link" 
              icon={<DownloadOutlined />}
              onClick={() => handleDownload(record)}
            />
          </Tooltip>
          <Tooltip title="删除">
            <Popconfirm
              title="确定要删除这个文档吗？"
              onConfirm={() => handleDelete(record.id)}
              okText="确定"
              cancelText="取消"
            >
              <Button 
                type="link" 
                danger 
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleUpload = () => {
    setUploadModalVisible(true);
  };

  const handlePreview = (document: Document) => {
    setPreviewUrl(document.url);
    setPreviewModalVisible(true);
  };

  const handleDownload = async (document: Document) => {
    try {
      const response = await axios.get(document.url, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = window.document.createElement('a') as HTMLAnchorElement;
      link.href = url;
      link.setAttribute('download', document.name);
      window.document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      message.error('下载文件失败');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8088/api/documents/${id}`);
      message.success('删除成功');
      fetchDocuments();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append('file', fileList[0].originFileObj as File);
      formData.append('name', values.name);
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('version', values.version);
      formData.append('status', values.status);

      await axios.post('http://localhost:8088/api/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('上传成功');
      setUploadModalVisible(false);
      form.resetFields();
      setFileList([]);
      fetchDocuments();
    } catch (error) {
      message.error('上传失败');
    }
  };

  return (
    <div>
      <Card
        title="文档管理"
        extra={
          <Button 
            type="primary" 
            icon={<UploadOutlined />}
            onClick={handleUpload}
          >
            上传文档
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={documents} 
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title="上传文档"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="file"
            label="选择文件"
            rules={[{ required: true, message: '请选择文件' }]}
          >
            <Upload
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
              beforeUpload={() => false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="name"
            label="文档名称"
            rules={[{ required: true, message: '请输入文档名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select>
              <Select.Option value="项目文档">项目文档</Select.Option>
              <Select.Option value="技术文档">技术文档</Select.Option>
              <Select.Option value="合同文档">合同文档</Select.Option>
              <Select.Option value="会议记录">会议记录</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="version"
            label="版本"
            rules={[{ required: true, message: '请输入版本号' }]}
          >
            <Input placeholder="例如：1.0.0" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select>
              <Select.Option value="已发布">已发布</Select.Option>
              <Select.Option value="审核中">审核中</Select.Option>
              <Select.Option value="已过期">已过期</Select.Option>
              <Select.Option value="已归档">已归档</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                上传
              </Button>
              <Button onClick={() => setUploadModalVisible(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="文档预览"
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        width={800}
        footer={null}
      >
        <iframe
          src={previewUrl}
          style={{ width: '100%', height: '600px', border: 'none' }}
          title="文档预览"
        />
      </Modal>
    </div>
  );
};

export default DocumentManagement; 