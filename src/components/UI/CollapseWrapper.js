import {Collapse, InputNumber, Select, Space} from "antd";

const { Panel } = Collapse;

export const CollapseWrapper = ({width, panelName, children}) => {

  return (
    <Space direction="vertical">
      <Collapse collapsible="header" style={{ width: width, background: "white"}} >
        <Panel header={panelName} >
          { children }
        </Panel>
      </Collapse>
    </Space>
  )
}
