/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { PiWarning } from "react-icons/pi";
import Buttom from "../buttom/Buttom";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { FC, useState, Dispatch, SetStateAction } from "react";
import "./style.css";

interface ModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  action: () => Promise<any> | void;
  message?: string;
}

const Modal: FC<ModalProps> = ({
  showModal,
  setShowModal,
  action,
  message,
}) => {
  const [closeModal, setCloseModal] = useState(showModal);
  const [hiddenModal, setHiddenModal] = useState(showModal);

  const handleNo = () => {
    resetModal();
  };

  const handleSi = () => {
    const actionAs = async () => {
      try {
        const res = await action();
        if (res) {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    actionAs();
    resetModal();
  };

  const resetModal = () => {
    setCloseModal(true);
    setTimeout(() => {
      setHiddenModal(true);
      setShowModal(false);
      setCloseModal(false);
    }, 300);

    setTimeout(() => {
      setHiddenModal(false);
    }, 400);
  };

  return (
    <div
      className={
        "w-full h-screen bg-gray-400/50 fixed top-0 left-0 z-60  " +
        `${
          showModal && !hiddenModal
            ? "flex items-center justify-center"
            : "hidden"
        }`
      }
    >
      <div
        className={
          "bg-red-50 w-70 sm:w-100 py-7 px-3 shadow-lg rounded-md border-t-4 border-t-red-700 flex items-center justify-center flex-col gap-7  " +
          `${closeModal ? "animate-close-modal" : "animate-open-modal"}`
        }
      >
        <span className="inline-flex items-center gap-2 border-b-1 pb-1 border-b-red-200 w-full">
          <PiWarning className="text-red-700 w-12 h-12 animate-pulse" />
          <span className="text-red-900">
            {message ? message : "¿Está seguro que desea eliminar esta fila?"}
          </span>
        </span>

        <span className="inline-flex justify-center gap-7">
          <Buttom
            title="Si"
            className="btn1"
            icon={GiConfirmed}
            onClick={handleSi}
            isLoading={closeModal}
          />
          <Buttom
            title="No"
            className="btn1"
            icon={GiCancel}
            onClick={handleNo}
            isLoading={closeModal}
          />
        </span>
      </div>
    </div>
  );
};

export default Modal;
