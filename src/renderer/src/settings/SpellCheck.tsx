import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { ConfigProvider, Flex, Switch, Transfer } from 'antd';
import { useEffect, useState } from 'react';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

function SpellCheck(): JSX.Element {
  const [spellCheckerEnable, setSpellCheckerEnable] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  useEffect(() => {
    window.api.getSpellCheck.then((o) => {
      setSpellCheckerEnable(o.enabled);
      if (o.availableLanguages) {
        setDataSource(
          Object.entries(o.availableLanguages).map((e) => ({
            key: e[0],
            title: e[1],
            description: e[0]
          }))
        );
      }
      setTargetKeys(o.languages);
    });
  }, []);

  return (
    <Flex vertical={true} gap="small" align="start">
      <b>Spell Check Enabled:</b>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        value={spellCheckerEnable}
        onChange={(v) => {
          setSpellCheckerEnable(v);
          window.api.setSpellCheck({
            enabled: v,
            availableLanguages: undefined,
            languages: targetKeys
          });
        }}
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
          disabled={!spellCheckerEnable}
          dataSource={dataSource}
          titles={['List', 'Active']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={(ks) => {
            setTargetKeys(ks);
            window.api.setSpellCheck({
              enabled: spellCheckerEnable,
              availableLanguages: undefined,
              languages: ks
            });
          }}
          onSelectChange={(sourceKs, targetKs) => setSelectedKeys([...sourceKs, ...targetKs])}
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
