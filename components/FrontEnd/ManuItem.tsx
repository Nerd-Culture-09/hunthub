interface MenuItemProps {
    onClick: () => void;
    isActive: boolean;
    item: string;
    children: React.ReactNode;
  }
  
  export function MenuItem({ onClick, isActive, item, children }: MenuItemProps) {
    return (
      <div
        onClick={onClick}
        className={`menu-item ${isActive ? "active" : ""}`}
      >
        <h3>{item}</h3>
        {isActive && <div className="menu-content">{children}</div>}
      </div>
    );
  }
  