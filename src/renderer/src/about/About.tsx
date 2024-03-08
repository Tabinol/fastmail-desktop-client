import { BugOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import { useEffect, useState } from 'react';

const APP_DESCRIPTION = 'Unofficial desktop client for Fastmail';
const APP_LICENSE = 'Apache-2.0';
const APP_BUG_URL = 'https://github.com/Tabinol/fastmail-desktop-client/issues';

function About(): JSX.Element {
  const [versions] = useState(window.electron.process.versions);
  const [appName, setAppName] = useState('Unknown');
  const [appVersion, setAppVersion] = useState('0.0.0');
  const { Link, Text, Title } = Typography;

  useEffect(() => {
    window.api.appName.then((s) => setAppName(s));
    window.api.appVersion.then((s) => setAppVersion(s));
  }, []);

  return (
    <>
      <Flex vertical={true} align="center">
        <Text style={{ fontSize: '100px' }}>
          <InfoCircleTwoTone />
        </Text>
        <Title level={2}>{appName}</Title>
        <Text>{APP_DESCRIPTION}</Text>
        <Text>Version: {appVersion}</Text>
        <Text>License: {APP_LICENSE}</Text>
        <Text type="secondary">Electron: {versions.electron}</Text>
        <Text type="secondary">Chromium: {versions.chrome}</Text>
        <Text type="secondary">Node: {versions.node}</Text>
      </Flex>
      <br />
      <br />
      <Flex vertical={true} align="end">
        <Link href={APP_BUG_URL} style={{ color: '#ff222d' }}>
          <BugOutlined /> Report a bug...
        </Link>
      </Flex>
    </>
  );
}

export default About;
/*
        <Title level={2}>{window.api.appName}</Title>
        <Text>{APP_DESCRIPTION}</Text>
        <Text>Version: {window.api.appVersion}</Text>

*/
