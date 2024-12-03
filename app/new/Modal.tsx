"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FormEvent, ReactNode, useRef } from "react";

interface Props {
  label: string;
  icon: StaticImport;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

const Modal = ({ title, subtitle, label, icon, children }: Props) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = (event: FormEvent) => {
    event.preventDefault();
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = (event: FormEvent) => {
    event.preventDefault();
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={(event) => openModal(event)}
        className="w-full h-[160px] space-y-2 bg-sSecondary rounded-2xl flex flex-col justify-center items-center"
      >
        <Image src={icon} alt={label} />
        <h1>{label}</h1>
      </button>

      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
        ref={modalRef}
      >
        <div className="modal-box">
          <div className="flex justify-between">
            <div>
              <h3 className="font-bold text-[#111] text-lg">{title}</h3>
              <h5 className="text-xs">{subtitle}</h5>
            </div>
            <button
              type="button"
              className="btn"
              onClick={(event) => closeModal(event)}
            >
              X
            </button>
          </div>

          {children}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
