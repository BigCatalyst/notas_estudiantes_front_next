/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { LuCircleFadingPlus } from "react-icons/lu";
import ApiService from "@/services/ApiService";
import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import Buttom from "@/components/ui/buttom/Buttom";
import MessageForm from "@/components/ui/messageForm/MessageForm";
import { Subject } from "@/services/api/subjects";
import { AddStudentGroupData, Group } from "../../../services/api/group";

const subjectSchema = z.object({
  grade: z.string().min(1, "El grado es requerido"),
  name: z.string().min(1, "El nombre de la materia es requerido"),
  profesorsData: z
    .array(z.number())
    .nonempty("Debe agregar al menos un profesor"),
});

type SubjectFormData = z.infer<typeof subjectSchema>;

interface ProfesorSelectType {
  id: number;
  name: string;
}

export const AddStudentGroup = () => {
  const [serverError, setServerError] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentProfesor, setCurrentProfesor] = useState("");
  const [profesors, setProfesors] = useState<ProfesorSelectType[] | null>(null);

  useEffect(() => {
    const profesorsApi = async () => {
      try {
        const res = await ApiService.professorsAll("");
        if (res) {
          console.log(res);
          let profesorsData: ProfesorSelectType[] = [];
          res.forEach(
            (val) =>
              val.id && profesorsData.push({ id: val.id, name: val.first_name })
          );
          setProfesors(profesorsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    profesorsApi();
  }, []);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      profesorsData: [],
    },
    mode: "onChange",
  });

  const profesorsData = watch("profesorsData");

  const addProfesor = () => {
    if (currentProfesor.trim()) {
      const index = profesorsData.findIndex(
        (val) => val === Number(currentProfesor)
      );

      if (index === -1) {
        setValue("profesorsData", [...profesorsData, Number(currentProfesor)]);
        setCurrentProfesor("");
        clearErrors();
      } else {
        setError("profesorsData", {
          message: "Ya se ha añadido ese profesor.",
        });
      }
    }
  };

  const removeProfesor = (index: number) => {
    const newProfesors: any = profesorsData.filter((_, i) => i !== index);
    setValue("profesorsData", newProfesors);
  };

  const onSubmit = async (data: SubjectFormData) => {
    try {
      setIsLoading(true);
      setIsSuccess(false);
      setServerError([]);

      const student_group: AddStudentGroupData = {
        ...data,
        professors: data.profesorsData,
      };

      const res = await ApiService.addStudentGroup(student_group);
      if (res) {
        console.log(res);
        setIsSuccess(true);
        router.push("/dashboard/subjects");
      }
    } catch (error: any) {
      console.log(error);
      const errorData: {
        [key: string]: string[] | { email: string[]; username: string[] };
      } = error.response.data;
      let formattedErrorData: string[] = [];
      if (Object.keys(errorData).length > 0) {
        Object.entries(errorData).forEach(([key, value]) => {
          formattedErrorData.push(`${key}: ${value}`);
        });
      }
      setServerError(formattedErrorData);
    } finally {
      setIsLoading(false);
    }
  };

  return <div>AddStudentGroup</div>;
};
