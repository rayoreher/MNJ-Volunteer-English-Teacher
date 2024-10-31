import withAuth from "@/hooks/with-auth";

const AdminDashboard = () => {

  console.log('ciao');
  return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>
          Welcome to the admin dashboard. Please select a section from the menu.
        </p>
      </div>
  );
}

export default withAuth(AdminDashboard);