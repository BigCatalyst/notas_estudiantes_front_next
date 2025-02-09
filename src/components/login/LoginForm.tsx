"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { HiOutlineUser } from "react-icons/hi2";
import { TbLockCog } from "react-icons/tb";
import MensageError from "../message/MensageError";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "@/services/ApiService";
import { redirect } from "next/navigation";
import { loginSuccess } from "@/redux/features/authSlice";

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
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.auth);

  console.log(state);

  const onSubmit = async (data: any) => {
    setError(false);

    const res = await ApiService.loguin(data.username, data.password).catch(
      (error) => {
        console.log(error);
        setError(true);
      }
    );

    if (res) {
      const me = await ApiService.me();

      if (me) {
        dispatch(
          loginSuccess({
            user: { ...res.user, roles: me.groups.map(({ name }) => name) },
          })
        );
        redirect("/dashboard");
      }
    }
  };

  return (
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

      <input type="submit" value="Log in" className="submit-neo" />
    </form>
  );
};

export default LoginForm;
