/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Buttom from "@/components/ui/buttom/Buttom";
import ApiService from "@/services/ApiService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { LuCircleFadingPlus } from "react-icons/lu";
import { z } from "zod";

const studentSchema = z.object({
  grade: z.string().optional(),
});

type StudentFormData = z.infer<typeof studentSchema>;

export const ReportStudent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
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

  const exportReportAction = async (id_estudiante: string, grado: string) => {
    try {
      const res = await ApiService.reportCertificacionNotas(
        id_estudiante,
        grado
      );
      console.log(res);

      console.log("respuesta");
      console.log(res);
      const pdfBlob = new Blob([res], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "reporte.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const exportReportAction1 = async (id_estudiante: string) => {
    try {
      const res = await ApiService.reportCertificate(id_estudiante);
      console.log(res);

      console.log("respuesta");
      console.log(res);
      const pdfBlob = new Blob([res], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "reporte.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data: StudentFormData) => {
    try {
      setIsLoading(true);

      console.log(data);

      if (data.grade) exportReportAction(id, data.grade);
      else exportReportAction1(id);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md relative">
      <h2 className="text-2xl font-bold mb-6 mt-7 text-gray-800 border-b-2 pb-2 border-b-gray-400">
        Esportar Certificación de Notas
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
        </div>

        {/* Botón de envío */}
        <Buttom
          title="Exportar"
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
