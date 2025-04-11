import { SchoolStatistics } from "@/services/api/school";
import ApiService from "@/services/ApiService";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CountUp from "react-countup";

const DashboardContent = () => {
  const [schoolStatistics, setSchoolStatistics] = useState<SchoolStatistics>({
    amount_of_students: 0,
    amount_of_students_7: 0,
    amount_of_students_8: 0,
    amount_of_students_9: 0,
    amount_of_professor: 0,
  });

  useEffect(() => {
    const fetchSchoolStatistics = async () => {
      try {
        const schoolStatisticsData = await ApiService.getSchoolStatistics();
        console.log(schoolStatisticsData);
        if (schoolStatisticsData) setSchoolStatistics(schoolStatisticsData);
      } catch (error) {
        console.error("Error fetching SchoolStatistics:", error);
      }
    };

    fetchSchoolStatistics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Secundaria Básica ¨Mártires del 9 de Abril¨
        </h1>
        <p className="text-gray-600 mt-3">
          Gestiona y visualiza toda la información de tu institución educativa
        </p>
      </header>

      {/* Información de la Escuela */}
      <section className="bg-white p-6 rounded-lg shadow-md mb-12 flex flex-col md:flex-row">
        <Image
          src="/images/escuela/escuela.jpg"
          alt="Imagen de la escuela"
          width={500}
          height={300}
          className="w-full md:w-1/3 rounded-lg shadow-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex items-center">
          <p className="text-gray-800 text-justify">
            La Secundaria Básica ¨Mártires del 9 de Abril¨ se encuentra ubicada
            en el consejo popular de Tapaste, cita en calle 26 e/ 15 y final,
            Tapaste, San José de las Lajas, Mayabeque. La escuela se fundó en el
            curso escolar 1977-1978, su construcción se realizó a base de unos
            paneles de unas naves de reclusos que desmantelaron en Melena del
            Sur, entre padres y profesores trabajaron y levantaron las aulas de
            madera y ya para 1984-1985 se logró reconstruir de mampostería y
            fibras. El nombre del centro honra el hecho ocurrido en el año 1958,
            la Huelga General Revolucionaria, que tuvo como objetivo paralizar
            económicamente al país y acelerar la caída del régimen batistiano
            por el M-26-7. En esta acción mueren dos jóvenes de nuestro pueblo
            Víctor González y Orlando Cuellar, mártires de nuestra localidad.
          </p>
        </div>
      </section>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {/* Total Estudiantes */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Estudiantes Totales
          </h3>
          <CountUp
            start={0}
            end={schoolStatistics.amount_of_students}
            duration={2}
            className="text-4xl font-bold text-blue-600 mb-2"
          />
          <p className="text-gray-600 text-center">
            Total de estudiantes en la institución
          </p>
        </div>

        {/* 7mo Grado */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">7º Grado</h3>
          <CountUp
            start={0}
            end={schoolStatistics.amount_of_students_7}
            duration={2}
            className="text-4xl font-bold text-green-600 mb-2"
          />
          <p className="text-gray-600 text-center">
            Estudiantes en séptimo grado
          </p>
        </div>

        {/* 8vo Grado */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">8º Grado</h3>
          <CountUp
            start={0}
            end={schoolStatistics.amount_of_students_8}
            duration={2}
            className="text-4xl font-bold text-yellow-600 mb-2"
          />
          <p className="text-gray-600 text-center">
            Estudiantes en octavo grado
          </p>
        </div>

        {/* 9no Grado */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">9º Grado</h3>
          <CountUp
            start={0}
            end={schoolStatistics.amount_of_students_9}
            duration={2}
            className="text-4xl font-bold text-red-600 mb-2"
          />
          <p className="text-gray-600 text-center">
            Estudiantes en noveno grado
          </p>
        </div>

        {/* Profesores */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Profesores
          </h3>
          <CountUp
            start={0}
            end={schoolStatistics.amount_of_professor}
            duration={2}
            className="text-4xl font-bold text-purple-600 mb-2"
          />
          <p className="text-gray-600 text-center">
            Total de profesores activos
          </p>
        </div>
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sección de Gestión de Notas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Gestión de Notas
          </h2>
          <p className="text-gray-600">
            Administra las notas de los estudiantes de 7º, 8º y 9º grado. Los
            profesores pueden subir archivos y orientar tareas en el aula
            virtual.
          </p>
        </div>

        {/* Sección de Escalafón */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Escalafón de Estudiantes
          </h2>
          <p className="text-gray-600">
            Al finalizar el curso, calcula el escalafón de los estudiantes de
            noveno grado y otorga carreras basado en sus deseos y
            disponibilidad.
          </p>
        </div>

        {/* Sección de Eventos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Eventos y Calendario
          </h2>
          <p className="text-gray-600">
            Crea y gestiona eventos que serán visibles para todos en el
            calendario del sistema.
          </p>
        </div>

        {/* Sección de Gestión de Usuarios */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Gestión de Usuarios
          </h2>
          <p className="text-gray-600">
            Administra las cuentas de estudiantes, profesores, secretarias y
            administradores, asignando roles y permisos según sea necesario.
          </p>
        </div>

        {/* Sección de Edición Rápida de Notas */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edición Rápida de Notas
          </h2>
          <p className="text-gray-600">
            La secretaria puede editar todas las notas de una asignatura de
            manera rápida y eficiente.
          </p>
        </div>

        {/* Sección de Aula Virtual */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Aula Virtual
          </h2>
          <p className="text-gray-600">
            Los profesores pueden organizar secciones de asignaturas, subir
            archivos y orientar tareas a los estudiantes.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardContent;
