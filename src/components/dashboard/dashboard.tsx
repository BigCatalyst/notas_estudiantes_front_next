import React from "react";

const DashboardContent = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Bienvenido al Dashboard
        </h1>
        <p className="text-gray-600 mt-3">
          Gestiona y visualiza toda la información de tu institución educativa
        </p>
      </header>

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
