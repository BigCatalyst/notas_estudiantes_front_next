import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { TbLockCog } from "react-icons/tb";
import MensageError from "../message/MensageError";

const LoginForm = () => {
  return (
    <form className="flex flex-col items-center justify-center text-[1rem] z-10">
      <div
        className="text-[40px] font-bold text-slate-700
          text-shadow text-shadow-gray-500 flex
           flex-col items-center text-center"
      >
        <div className="rounded-full  p-3 text-center relative shadow-[-3px_-3px_5px_white,3px_3px_5px_rgba(209,209,209,0.705)] w-[128] h-[123]">
          <Image
            src="/images/logo.png"
            width={100}
            height={100}
            alt="Logo Login"
            priority
            className="w-[100px] h-[100px]"
          />
        </div>
        Login
      </div>

      <div className="animate-slide-down">
        <MensageError
          duration={60000}
          message="Usuario o contraseña incorrecto"
        />
      </div>

      <div className="input-neo">
        <input
          type="text"
          name="username"
          id="username"
          required
          placeholder="Username"
        />
        <HiOutlineUser className="absolute left-4 top-[27%] w-[27px] h-[27px] stroke-[1px]" />
      </div>

      <div className="input-neo">
        <input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Password"
        />

        <TbLockCog className="absolute left-4 top-[27%] w-[27px] h-[27px] stroke-[1px]" />
      </div>

      <input type="submit" value="Log in" className="submit-neo" />

      {/* <p className="text-center text-[0.8rem] w-[80%] text-[gray] m-[7px]">
        Forgotten your login details ?{" "}
        <Link href="/recover" className="text-inherit font-bold no-underline">
          Get help with signing in.
        </Link>
      </p>
      <div className="or">or</div>
      <p className="signup">
        Don&apos;t have an account ?{" "}
        <Link href="/register" className="text-inherit font-bold no-underline">
          SignUp
        </Link>
      </p> */}
    </form>
  );
};

export default LoginForm;
