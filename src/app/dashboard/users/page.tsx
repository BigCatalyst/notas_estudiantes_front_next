import UsersTable from "@/components/dashboard/users/UsersTable";

const Users = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
      <UsersTable />
    </div>
  );
};

export default Users;
