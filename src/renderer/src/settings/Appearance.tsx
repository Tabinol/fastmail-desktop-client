import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Flex, Select, SelectProps } from 'antd';
import { useEffect, useState } from 'react';

const THEME_DEFAULT_VALUE = 'default';
const THEME_DARK_VALUE = 'dark';

function Appearance(): JSX.Element {
  const [localTheme, setLocalTheme] = useState<string>(THEME_DEFAULT_VALUE);

  const options: SelectProps['options'] = [
    {
      value: THEME_DEFAULT_VALUE,
      label: (
        <span>
          <SunOutlined />
          &nbsp; Light (Default)
        </span>
      )
    },
    {
      value: THEME_DARK_VALUE,
      label: (
        <span>
          <MoonOutlined />
          &nbsp; Dark
        </span>
      )
    }
  ];

  useEffect(() => {
    window.api.getTheme.then((t) => {
      const currentTheme = t ?? THEME_DEFAULT_VALUE;
      setLocalTheme(currentTheme);
    });
  }, []);

  return (
    <Flex vertical={true} gap="small" align="start">
      <b>Theme:</b>
      <Select
        options={options}
        value={localTheme}
        onChange={(v) => {
          const currentTheme = v ?? THEME_DEFAULT_VALUE;
          setLocalTheme(currentTheme);
          window.api.setTheme(currentTheme);
        }}
      />
      <i>Not for the main window</i>
    </Flex>
  );
}

export default Appearance;
export { THEME_DEFAULT_VALUE, THEME_DARK_VALUE };
