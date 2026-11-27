import { Collapse, type CollapseProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";

/** Ant Design accordion styled for UrbanHive (see `.uh-collapse` in brand.css). */
export default function BrandCollapse({ items }: { items: CollapseProps["items"] }) {
  return (
    <Collapse
      className="uh-collapse"
      ghost
      accordion
      expandIconPosition="end"
      items={items}
      expandIcon={({ isActive }) => (
        <span className={`uh-collapse-icon ${isActive ? "uh-collapse-icon--open" : ""}`}>
          <PlusOutlined />
        </span>
      )}
    />
  );
}
