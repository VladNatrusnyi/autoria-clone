import {Input, Space, Tag, theme} from 'antd';
export const CustomTags = () => {
  const log = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };


  return (
    <>
      <Space size={[0, 8]} wrap>
        <Tag closable onClose={log} >
          Tag 1
        </Tag>
        <Tag closable onClose={log}>
          Tag 2
        </Tag>
      </Space>
    </>
  );
};
