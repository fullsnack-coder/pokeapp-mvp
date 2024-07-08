import { PropsWithChildren, useState } from "react";

type Props = {
  title: string;
  defaultCollapsed?: boolean;
};

const CollapsiblePanel: React.FC<PropsWithChildren<Props>> = ({
  title,
  defaultCollapsed = false,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsCollapsed((prevCollapsed) => !prevCollapsed)}
      >
        <h1 className="font-semibold">{title}</h1>
        <span>{isCollapsed ? "▼" : "▲"}</span>
      </div>
      {!isCollapsed && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default CollapsiblePanel;
