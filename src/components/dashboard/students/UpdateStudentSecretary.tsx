/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useParams, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { StudentCreate } from "@/services/api/students";

const studentSchema = z.object({
  ci: z.string().min(1, "CI es requerido"),
  address: z.string().min(1, "Dirección es requerida"),
  grade: z.string().min(1, "Grado es requerido"),
  last_name: z.string().min(1, "Apellido es requerido"),
  first_name: z.string().min(1, "Nombre es requerido"),
  registration_number: z.string().min(1, "Número de matrícula es requerido"),
  sex: z.string().min(1, "Sexo es requerido"),
  group: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

const UpdateStudentSecretary = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [groups, setGroups] = useState<{ id: string; name: string }[]>([]);

  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      // is_approved: false,
      // is_graduated: false,
      // is_dropped_out: false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    const studentUpdate = async () => {
      const [res, groupsData] = await Promise.all([
        await ApiService.getStudent(id),
        await ApiService.studentGroupsAll(""),
      ]);
      console.log(res);
      if (res) {
        setValue("ci", res.ci);
        setValue("address", res.address);
        setValue("grade", res.grade + "");
        setValue("last_name", res.last_name);
        setValue("first_name", res.first_name);
        setValue("registration_number", res.registration_number);
        setValue("sex", res.sex);

        if (groupsData) {
          setGroups(
            groupsData.map(({ id, name }: any) => ({
              id,
              name,
            }))
          );
          if (res.group) {
            setValue("group", res.group.id + "");
          }
        }
      }
    };

    studentUpdate();
  }, []);

  const onSubmit = async (data: StudentFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError("");

      const dataStudent: StudentCreate = {
        ci: data.ci,
        address: data.address,
        grade: data.grade,
        last_name: data.last_name,
        first_name: data.first_name,
        registration_number: data.registration_number,
        sex: data.sex,
      };
      if (data.group) {
        dataStudent.group = data.group ?? "";
      }

      const res = await ApiService.updateStudent(id, dataStudent);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/students");
      }
    } catch (error: any) {
      console.log(error);
      const errorData = error.response.data;
      let formattedErrorData = "";
      if (Object.keys(errorData).length > 0) {
        formattedErrorData = Object.entries(errorData)
          .map(([key, value]) => ` -${key}: ${JSON.stringify(value)}`)
          .join("\n");
      }
      setServerError(formattedErrorData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
        Actualizar Estudiante
      </h2>

      <div className="absolute right-10 top-7">
        <Buttom
          title="Estudiantes"
          icon={IoIosArrowBack}
          to="/dashboard/students"
          className="btn1"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CI */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              CI
            </label>
            <input
              {...register("ci")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.ci ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.ci && (
              <p className="text-red-500 text-sm mt-1">{errors.ci.message}</p>
            )}
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dirección
            </label>
            <input
              {...register("address")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.address ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Grado */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grado
            </label>
            <select
              {...register("grade")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.grade ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione un grado</option>
              <option value="7">7mo</option>
              <option value="8">8vo</option>
              <option value="9">9no</option>
            </select>
            {errors.grade && (
              <p className="text-red-500 text-sm mt-1">
                {errors.grade.message}
              </p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              {...register("last_name")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.last_name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              {...register("first_name")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.first_name ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Número de matrícula */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de matrícula
            </label>
            <input
              {...register("registration_number")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.registration_number
                  ? "border-red-500"
                  : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            />
            {errors.registration_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.registration_number.message}
              </p>
            )}
          </div>

          {/* Sexo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sexo
            </label>
            <select
              {...register("sex")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.sex ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione el sexo</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
            {errors.sex && (
              <p className="text-red-500 text-sm mt-1">{errors.sex.message}</p>
            )}
          </div>

          {/* Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Grupo
            </label>
            <select
              {...register("group")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.group ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione un Grupo</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
            {errors.group && (
              <p className="text-red-500 text-sm mt-1">
                {errors.group.message}
              </p>
            )}
          </div>
        </div>

        {/* Mensajes de éxito o error */}
        <MessageForm
          isSuccess={isSuccess}
          error={serverError.length > 0}
          errorMessage={serverError}
        />

        {/* Botón de envío */}
        <Buttom
          title="Actualizar Estudiante"
          type="submit"
          isLoading={isLoading}
          className="btn1"
          icon={LuCircleFadingPlus}
          textLoading="Guardando"
        />
      </form>
    </div>
  );
};

export default UpdateStudentSecretary;
