import { useLogout } from "@/hooks/useLogout";

const LogoutButton = () => {
  const { callLogout } = useLogout();

  return <button onClick={callLogout}>Logout</button>;
};
export default LogoutButton;