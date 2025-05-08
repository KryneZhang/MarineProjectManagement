import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Descriptions, Table, Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import dayjs from 'dayjs';

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

interface Task {
  id: number;
  name: string;
  wbs_code: string;
  start_date: string;
  end_date: string;
  duration: number;
  progress: number;
  status: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('获取项目详情失败:', error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/api/tasks?project_id=${id}`);
        setTasks(response.data);
      } catch (error) {
        console.error('获取任务列表失败:', error);
      }
    };

    fetchProject();
    fetchTasks();
  }, [id]);

  const taskColumns: ColumnsType<Task> = [
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
      render: (status: string) => (
        <Tag color={
          status === '已完成' ? 'green' :
          status === '进行中' ? 'blue' :
          status === '已暂停' ? 'orange' : 'default'
        }>
          {status}
        </Tag>
      ),
    },
  ];

  if (!project) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <Card title="项目信息" style={{ marginBottom: 16 }}>
        <Descriptions bordered>
          <Descriptions.Item label="项目名称">{project.name}</Descriptions.Item>
          <Descriptions.Item label="项目编号">{project.code}</Descriptions.Item>
          <Descriptions.Item label="项目状态">
            <Tag color={
              project.status === '进行中' ? 'blue' :
              project.status === '已完成' ? 'green' :
              project.status === '已暂停' ? 'orange' : 'default'
            }>
              {project.status}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="开始日期">{dayjs(project.start_date).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="结束日期">{dayjs(project.end_date).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="项目预算">¥{project.budget.toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="项目描述" span={3}>{project.description}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="任务列表">
        <Table columns={taskColumns} dataSource={tasks} rowKey="id" />
      </Card>
    </div>
  );
};

export default ProjectDetail; 