import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import CardAdmin from "../components/CardAdmin";
export default function AdminDashboard() {
  return (
    <>
      <Sidebar
        rootStyles={{
          height: "100vh",
          textAlign: "center",
          justifyContent: "center",
        }}>
        <Menu>
          <MenuItem
            component={<Link to="/dashboard/admin" />}
            menuItemStyles={{
              padding: "1rem",
              color: "white",
              fontSize: "1.5rem",
            }}>
            Home
          </MenuItem>
          <MenuItem
            component={<Link to="/dashboard/admin/listRervations" />}
            menuItemStyles={{
              padding: "1rem",
              color: "white",
              fontSize: "1.5rem",
            }}>
            List Reservations
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className="flex justify-between">
        <div>div1</div>
        <div>div2</div>
        <div>div3</div>
      </div>
    </>
  );
}
