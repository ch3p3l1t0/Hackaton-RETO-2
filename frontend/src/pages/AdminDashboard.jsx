import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
export default function AdminDashboard() {
  return (
    <div>
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "#f5d9ff" : "#d359ff",
                  backgroundColor: active ? "#eecef9" : undefined,
                };
            },
          }}>
          <MenuItem component={<Link to="/dashboard/admin" />}>Home</MenuItem>
          <MenuItem component={<Link to="/dashboard/admin/listRervations" />}>
            List Reservations
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
