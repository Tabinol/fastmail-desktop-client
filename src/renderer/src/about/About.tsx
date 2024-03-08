import { BugOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';

function About(): JSX.Element {
  const { Link, Text, Title } = Typography;

  const [versions] = useState(window.electron.process.versions);
  const [appInfo, setAppInfo] = useState<AppInfo>({
    name: '',
    description: '',
    version: '',
    license: '',
    bugUrl: 'https://127.0.0.1/'
  });

  useEffect(() => {
    window.api.getAppInfo.then((i) => setAppInfo(i));
  }, []);

  return (
    <>
      <Flex vertical={true} align="center">
        <Text style={{ fontSize: '100px' }}>
          <InfoCircleTwoTone />
        </Text>
        <Title level={2}>{appInfo.name}</Title>
        <Text>{appInfo.description}</Text>
        <Text>Version: {appInfo.version}</Text>
        <Text>License: {appInfo.license}</Text>
        <Text type="secondary">Electron: {versions.electron}</Text>
        <Text type="secondary">Chromium: {versions.chrome}</Text>
        <Text type="secondary">Node: {versions.node}</Text>
      </Flex>
      <br />
      <br />
      <Flex vertical={true} align="end">
        <Link href={appInfo.bugUrl} target="_blank" style={{ color: '#ff222d' }}>
          <BugOutlined /> Report a bug...
        </Link>
      </Flex>
    </>
  );
}

export default About;
