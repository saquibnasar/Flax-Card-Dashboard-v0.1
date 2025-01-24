import React, { useState } from "react";
import ModalForm from "../components/ModalForm";
import { RiArrowLeftLine, RiCheckboxCircleLine } from "react-icons/ri";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import ToggleButton from "../components/ToggleButton";
import { formatDate } from "../utils/formatDate";
import { tokenState } from "../services/api-client";
import useUpdateUser from "../utils/hooks/useUpdateUser";

interface Props {
  updateChanges: (isChanged: boolean) => void;
  username: string;
  employeeId: string;
  mailId: string;
  profile?: string | StaticImport;
  isNfcActive?: boolean;
  isQrActive?: boolean;
  nfcSerialNumber?: string;
  qrSerialNumber?: string;
  nfcActivatedDate?: string;
  qrActivatedDate?: string;
  name: string;
}

const TableButton = ({
  name,
  employeeId,
  username,
  mailId,
  profile,
  isNfcActive = false,
  isQrActive = false,
  nfcSerialNumber,
  qrSerialNumber,
  qrActivatedDate,
  nfcActivatedDate,
  updateChanges,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const [enableNfc, setEnableNfc] = useState(isNfcActive);
  const [enableQr, setEnableQr] = useState(isQrActive);

  return (
    <>
      <p
        onClick={openModal}
        className="cursor-pointer text-blue hover:underline"
      >
        Edit
      </p>

      <ModalForm size="xl" isOpen={isOpen} onClose={closeModal}>
        <div>
          <div
            className="cursor-pointer mb-10 text-md flex space-x-2 items-center"
            onClick={closeModal}
          >
            <RiArrowLeftLine />
            <span className="text-sm">Back</span>
          </div>
          <div className="flex items-center gap-3 mb-8">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12 relative">
                {profile ? (
                  <Image
                    src={profile}
                    alt="Avatar Tailwind CSS Component"
                    fill
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full text-neutral-content">
                    <span className="text-3xl">{name?.charAt(0)}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="text-[16px]">{username}</div>
              <div className="text-sm opacity-50">{mailId}</div>
            </div>
          </div>

          <div className="space-y-12">
            {nfcSerialNumber && (
              <div className="flex justify-between items-center">
                <div>
                  <p>NFC</p>
                  <p className="text-sm text-tSecondary">{`${nfcSerialNumber}`}</p>
                </div>
                <ToggleButton
                  isChecked={enableNfc}
                  onChange={() => {
                    setEnableNfc(!enableNfc);
                    // tokenState(employeeId, nfcSerialNumber, !enableNfc);
                  }}
                  setIsChecked={() => {
                    setEnableNfc(!enableNfc);
                  }}
                />
              </div>
            )}

            {qrSerialNumber && (
              <div className="flex justify-between items-center">
                <div>
                  <p>QR</p>
                  <p className="text-sm text-tSecondary">{`${qrSerialNumber}`}</p>
                </div>
                <ToggleButton
                  isChecked={!enableQr}
                  onChange={() => {
                    setEnableQr(!enableQr);
                    // tokenState(employeeId, qrSerialNumber, !enableQr);
                  }}
                  setIsChecked={() => {
                    setEnableQr(!enableQr);
                  }}
                />
              </div>
            )}
          </div>

          <div className="w-full space-x-5 flex justify-end">
            {/* <button className="mt-10 mr-auto h-fit text-aRed px-10 py-2 hover:border hover:border-aRed rounded-lg transition-all duration-200 ease-in">
              Delete
            </button> */}
            <button
              className="mt-10 border border-dSecondary rounded-lg px-10 py-2"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="mt-10 bg-black rounded-lg px-10 py-2 text-white"
              onClick={() => {
                closeModal();
                if (nfcSerialNumber)
                  tokenState(employeeId, nfcSerialNumber, enableNfc);
                if (qrSerialNumber)
                  tokenState(employeeId, qrSerialNumber, enableQr);
                updateChanges(true);
                setTimeout(() => updateChanges(false), 3000);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </ModalForm>
    </>
  );
};

export default TableButton;
