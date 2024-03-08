import { EyeOutlined, HighlightOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';

import Appearance from './Appearance';
import SpellCheck from './SpellCheck';

const APPEARANCE_KEY = 'appearance';
const SPELLCHECK_KEY = 'spellcheck';

function Settings(): JSX.Element {
  const items: TabsProps['items'] = [
    {
      key: APPEARANCE_KEY,
      label: 'Appearance',
      children: <Appearance />,
      icon: <EyeOutlined />
    },
    {
      key: SPELLCHECK_KEY,
      label: 'Spell Check',
      children: <SpellCheck />,
      icon: <HighlightOutlined />
    }
  ];

  return <Tabs defaultActiveKey={APPEARANCE_KEY} items={items} />;
}

export default Settings;
