import { Outlet } from "react-router-dom";
import Sidebar from "../../Admin/AdminComponents/Sidebar";

const AdminSystemLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - fixed on the left */}
      <Sidebar />

      {/* Main content area - shifted to the right */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminSystemLayout;
