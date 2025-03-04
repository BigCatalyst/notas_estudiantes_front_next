"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { TbLoader2, TbLockCog } from "react-icons/tb";
import MensageError from "../message/MensageError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "@/services/ApiService";
import { redirect } from "next/navigation";
import { loginSuccess, State } from "@/redux/features/authSlice";
import { User } from "@/services/Types";

// Define el esquema de validación con zod
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Define una interfaz para los datos del formulario
interface LoginFormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userAuth: State = useSelector((state: any) => state.auth);

  console.log(userAuth);

  useEffect(() => {
    if (userAuth.isAuthenticated) redirect("/dashboard");
  }, []);

  const onSubmit = async (data: any) => {
    setError(false);
    setLoading(true);

    const res = await ApiService.loguin(data.username, data.password).catch(
      (error) => {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    );

    if (res) {
      const me = await ApiService.me();

      if (me) {
        console.log("meeeeeeeeeeeeeeeeeeeeeeeeee");
        console.log(me.groups);

        const user: User = {
          id: me.id,
          roles: me.groups.map(({ name }) => name),
          email: me.email,
          first_name: me.first_name,
          last_name: me.last_name,
          username: me.username,
        };

        setLoading(false);

        dispatch(
          loginSuccess({
            user,
          })
        );
        redirect("/dashboard");
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center text-[1rem] z-10"
      >
        <div
          className="text-[40px] font-bold text-slate-700
          text-shadow text-shadow-gray-500 flex
           flex-col items-center text-center"
        >
          <div className="rounded-full p-3 text-center relative shadow-[-3px_-3px_5px_white,3px_3px_5px_rgba(209,209,209,0.705)] w-[128] h-[123]">
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
        {error && (
          <div className="animate-slide-down" key={Date.now()}>
            <MensageError
              duration={10000}
              message="Usuario o contraseña incorrecto"
            />
          </div>
        )}

        <div className="input-neo">
          <input
            type="text"
            id="username"
            placeholder="Username"
            {...register("username")}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <HiOutlineUser className="absolute left-4 top-[27%] w-[27px] h-[27px] stroke-[1px]" />
        </div>

        <div className="input-neo">
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <TbLockCog className="absolute left-4 top-[27%] w-[27px] h-[27px] stroke-[1px]" />
        </div>

        {/* <input type="submit" value="Log in" className="submit-neo" /> */}

        <button className="submit-neo" type="submit">
          {isLoading ? (
            <span className="flex items-center justify-center">
              <TbLoader2 className="animate-spin mr-2 h-4 w-4" />
              Iniciando Sesión...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">LogIn</span>
          )}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
