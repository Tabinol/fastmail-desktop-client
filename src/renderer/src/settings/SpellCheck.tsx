import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Switch, Transfer } from 'antd';
import { useEffect, useState } from 'react';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

function SpellCheck(): JSX.Element {
  const [dataSource, setDataSource] = useState([] as RecordType[]);

  useEffect(() => {
    window.api.availableSpellCheckerLanguages.then((o) =>
      setDataSource(
        Object.entries(o).map((e) => ({
          key: e[0],
          title: e[1],
          description: e[0]
        }))
      )
    );
  }, []);

  return (
    <Flex vertical={true} gap="small" align="start">
      <b>Spell Check Enabled:</b>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked
      />
      <ConfigProvider
        theme={{
          components: {
            Transfer: {
              listHeight: 400,
              listWidth: 270
            }
          }
        }}
      >
        <Transfer
          dataSource={dataSource}
          titles={['List', 'Active']}
          render={(item) => item.title}
          oneWay
          showSearch
          showSelectAll={false}
        />
      </ConfigProvider>
    </Flex>
  );
}

export default SpellCheck;
