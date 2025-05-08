import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectDetail from './pages/ProjectDetail';
import ProjectPlanning from './pages/ProjectPlanning';
import ProjectExecution from './pages/ProjectExecution';
import TaskManagement from './pages/TaskManagement';
import ResourceManagement from './pages/ResourceManagement';
import DocumentManagement from './pages/DocumentManagement';
import ReportAnalysis from './pages/ReportAnalysis';
import SupplierManagement from './pages/SupplierManagement';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/planning" element={<ProjectPlanning />} />
            <Route path="/execution" element={<ProjectExecution />} />
            <Route path="/tasks" element={<TaskManagement />} />
            <Route path="/resources" element={<ResourceManagement />} />
            <Route path="/documents" element={<DocumentManagement />} />
            <Route path="/reports" element={<ReportAnalysis />} />
            <Route path="/suppliers" element={<SupplierManagement />} />
          </Routes>
        </Layout>
      </Router>
    </ConfigProvider>
  );
};

export default App; 