/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ApiService from "@/services/ApiService";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { LuCircleFadingPlus } from "react-icons/lu";
import { Career } from "@/services/api/careers";
import { useSelector } from "react-redux";
import { State } from "@/redux/features/authSlice";

// Esquema de validación Zod
const ballotSchema = z.object({
  career1: z.string().min(1, "Este campo es requerido"),
  career2: z.string().min(1, "Este campo es requerido"),
  career3: z.string().min(1, "Este campo es requerido"),
  career4: z.string().min(1, "Este campo es requerido"),
  career5: z.string().min(1, "Este campo es requerido"),
  career6: z.string().min(1, "Este campo es requerido"),
  career7: z.string().min(1, "Este campo es requerido"),
  career8: z.string().min(1, "Este campo es requerido"),
  career9: z.string().min(1, "Este campo es requerido"),
  career10: z.string().min(1, "Este campo es requerido"),
  student: z.string().optional(),
});

type BallotFormData = z.infer<typeof ballotSchema>;

const BallotEdit = () => {
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const userAuth: State = useSelector((state: any) => state.auth);
  const [careers, setCareers] = useState<Career[]>();
  const [idStudent, setIdStudent] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchCarreers = await ApiService.careers("");
        if (fetchCarreers) {
          setCareers(fetchCarreers.results);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const updateEntity = async () => {
      try {
        if (userAuth.user?.id) {
          const res = await ApiService.students(
            `user__username=${userAuth.user?.username}`
          );
          if (res && res.results.length > 0) {
            const student = res.results[0];

            const ballots = await ApiService.ballots(
              `ci__contains=${student.ci}`
            );
            if (ballots && ballots.results && ballots.results.length >= 10) {
              const ballot = ballots.results[0].ballot;
              setValue("career1", ballot[0]);
              setValue("career2", ballot[1]);
              setValue("career3", ballot[2]);
              setValue("career4", ballot[3]);
              setValue("career5", ballot[4]);
              setValue("career6", ballot[5]);
              setValue("career7", ballot[6]);
              setValue("career8", ballot[7]);
              setValue("career9", ballot[8]);
              setValue("career10", ballot[9]);

              setValue("student", student.id + "");

              if (student.id) setIdStudent(student.id);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateEntity();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BallotFormData>({
    resolver: zodResolver(ballotSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: BallotFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError("");
      console.log(data);
      const id = Number(idStudent);
      const res =
        data &&
        (await ApiService.addBallot(
          {
            list_career_name: [
              data.career1,
              data.career2,
              data.career3,
              data.career4,
              data.career5,
              data.career6,
              data.career7,
              data.career8,
              data.career9,
              data.career10,
            ],
          },
          id + ""
        ));
      if (res) {
        console.log(res);
        setIsSuccess(true);
        // router.push("/dashboard/students_ballot");
      }
    } catch (error: any) {
      console.log(error);
      setServerError("Error al Adicionar la Boleta el estudiante");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
        Editar Boleta de Estudiante
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estudiante:{" "}
              {`${userAuth.user?.first_name} ${userAuth.user?.last_name}`}
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 1
            </label>
            <select
              {...register("career1")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 1</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career1.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 2
            </label>
            <select
              {...register("career2")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 2</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career2 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career2.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 3
            </label>
            <select
              {...register("career3")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 3</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career3 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career3.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 4
            </label>
            <select
              {...register("career4")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 4</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career4 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career4.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 5
            </label>
            <select
              {...register("career5")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 5</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career5 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career5.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 6
            </label>
            <select
              {...register("career6")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 6</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career6 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career6.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 7
            </label>
            <select
              {...register("career7")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 7</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career7 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career7.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 8
            </label>
            <select
              {...register("career8")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 8</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career8 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career8.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 9
            </label>
            <select
              {...register("career9")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 9</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career9 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career9.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Carrera 10
            </label>
            <select
              {...register("career10")}
              className={`mt-1 p-2 block w-full rounded-md ${
                errors.student ? "border-red-500" : "border-gray-300"
              } shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            >
              <option value="">Seleccione una Carrera 10</option>
              {careers &&
                careers.map((carrer) => (
                  <option key={carrer.id} value={carrer.name}>
                    {carrer.name}
                  </option>
                ))}
            </select>
            {errors.career10 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.career10.message}
              </p>
            )}
          </div>
        </div>

        <MessageForm
          isSuccess={isSuccess}
          error={serverError.length > 0}
          errorMessage={serverError}
        />
        <Buttom
          title="Salvar Cambios de la Boleta"
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

export default BallotEdit;
