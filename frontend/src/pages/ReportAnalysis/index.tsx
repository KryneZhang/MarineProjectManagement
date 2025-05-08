import React, { useState, useEffect } from 'react';
import { Card, Row, Col, DatePicker, Select, Statistic, Table, Space, Button } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  DownloadOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Line, Bar, Pie } from '@ant-design/plots';
import axios from 'axios';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface ProjectProgress {
  id: number;
  name: string;
  planProgress: number;
  actualProgress: number;
  status: string;
}

interface ResourceUsage {
  type: string;
  value: number;
}

interface CostAnalysis {
  category: string;
  planned: number;
  actual: number;
}

const ReportAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs()
  ]);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress[]>([]);
  const [resourceUsage, setResourceUsage] = useState<ResourceUsage[]>([]);
  const [costAnalysis, setCostAnalysis] = useState<CostAnalysis[]>([]);

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [progressRes, resourceRes, costRes] = await Promise.all([
        axios.get('http://localhost:8088/api/reports/progress', {
          params: {
            startDate: dateRange[0].format('YYYY-MM-DD'),
            endDate: dateRange[1].format('YYYY-MM-DD')
          }
        }),
        axios.get('http://localhost:8088/api/reports/resources'),
        axios.get('http://localhost:8088/api/reports/costs')
      ]);

      setProjectProgress(progressRes.data);
      setResourceUsage(resourceRes.data);
      setCostAnalysis(costRes.data);
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const progressColumns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '计划进度',
      dataIndex: 'planProgress',
      key: 'planProgress',
      render: (value: number) => `${value}%`,
    },
    {
      title: '实际进度',
      dataIndex: 'actualProgress',
      key: 'actualProgress',
      render: (value: number) => `${value}%`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          '正常': 'success',
          '延迟': 'warning',
          '超期': 'error',
        };
        return <span style={{ color: colors[status as keyof typeof colors] }}>{status}</span>;
      },
    },
  ];

  const progressConfig = {
    data: projectProgress.map(item => [
      { name: item.name, value: item.planProgress, type: '计划进度' },
      { name: item.name, value: item.actualProgress, type: '实际进度' }
    ]).flat(),
    xField: 'name',
    yField: 'value',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v: string) => `${v}%`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  const resourceConfig = {
    data: resourceUsage,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const costConfig = {
    data: costAnalysis.map(item => [
      { category: item.category, value: item.planned, type: '计划成本' },
      { category: item.category, value: item.actual, type: '实际成本' }
    ]).flat(),
    xField: 'category',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Space>
          <RangePicker
            value={dateRange}
            onChange={(dates) => dates && setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
          />
          <Select defaultValue="all" style={{ width: 120 }}>
            <Select.Option value="all">全部项目</Select.Option>
            <Select.Option value="active">进行中</Select.Option>
            <Select.Option value="completed">已完成</Select.Option>
          </Select>
          <Button icon={<ReloadOutlined />} onClick={fetchData}>
            刷新
          </Button>
          <Button icon={<DownloadOutlined />}>
            导出报表
          </Button>
        </Space>
      </Card>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title="项目总数"
              value={projectProgress.length}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均进度"
              value={projectProgress.reduce((acc, curr) => acc + curr.actualProgress, 0) / projectProgress.length}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="资源使用率"
              value={resourceUsage.reduce((acc, curr) => acc + curr.value, 0) / resourceUsage.length}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="成本偏差"
              value={costAnalysis.reduce((acc, curr) => acc + (curr.actual - curr.planned), 0)}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="¥"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="项目进度趋势">
            <Line {...progressConfig} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="资源使用分布">
            <Pie {...resourceConfig} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="成本分析">
            <Bar {...costConfig} />
          </Card>
        </Col>
      </Row>

      <Card title="项目进度详情" style={{ marginTop: 16 }}>
        <Table
          columns={progressColumns}
          dataSource={projectProgress}
          rowKey="id"
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default ReportAnalysis; 