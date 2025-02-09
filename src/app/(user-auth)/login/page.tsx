import LaptopLoader from "@/components/loader/l1/LaptopLoader";
import LoginForm from "@/components/login/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-screen">
      <div className="bg-[#f7f7f7] min-h-full px-[20px] md:px-[100px] grid lg:grid-cols-2 gap-7 pt-20 pb-7">
        <div className="relative hidden lg:block">
          <LaptopLoader />
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
