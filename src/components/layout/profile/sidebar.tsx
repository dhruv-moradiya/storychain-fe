import { Home, BookOpen, Users, Award, Bell, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { label: "General", icon: Home },
    { label: "Stories", icon: BookOpen },
    { label: "People", icon: Users },
    { label: "Badges", icon: Award },
    { label: "Notifications", icon: Bell },
    { label: "Settings", icon: Settings },
  ];

  const active = "General";

  return (
    <nav className="flex flex-col p-2">
      {menuItems.map(({ label, icon: Icon }) => {
        const isActive = label === active;
        return (
          <button
            key={label}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-left
                ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default Sidebar;
