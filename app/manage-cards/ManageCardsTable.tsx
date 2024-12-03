"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { RiCheckboxCircleLine } from "react-icons/ri";
import Table from "../components/Table";
import useCards from "../utils/hooks/useCards";
import TableButton from "./TableButton";
import { formatDate } from "../utils/formatDate";
const ManageCardsTable = () => {
  const { data } = useCards();
  const activeCards = data?.filter(
    (card) => card.nfcSerialNumber || card.qrSerialNumber
  );
  const [isUpdated, setIsUpdated] = useState(false);
  const tableHeaders = [
    "Product Owner",
    "Product Serial No",
    "Activation Date",
    "View Control",
  ];

  return (
    <Table>
      {isUpdated && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full absolute top-0 mt-5"
        >
          <span className="flex mx-auto w-fit items-center space-x-2 bg-[#E2FCE6] rounded-lg text-aGreen px-10 py-3 transition-opacity ease-linear duration-150">
            <RiCheckboxCircleLine /> <span>Changes Saved</span>
          </span>
        </motion.div>
      )}

      <Table.Header>
        <Table.Row>
          {tableHeaders.map((header) => (
            <Table.ColumnHeaderCell key={header}>
              {header}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {activeCards?.map((user) => (
          <Table.Row key={user.profileUrl}>
            <Table.Cell>
              <Table.HeaderCell
                name={user.name}
                subTitle={user.designation}
                icon={user.profileImage}
              >
                {user.name}
              </Table.HeaderCell>
            </Table.Cell>
            <Table.Cell>
              {user.qrSerialNumber || user.nfcSerialNumber}
            </Table.Cell>
            <Table.Cell>
              {formatDate(user.nfcActivatedDate) ||
                formatDate(user.qrActivatedDate)}
            </Table.Cell>
            <Table.Cell>
              <TableButton
                name={user.name}
                employeeId={user.employeeId}
                isNfcActive={user.isNfcActive}
                isQrActive={user.isQrActive}
                nfcSerialNumber={user.nfcSerialNumber}
                qrSerialNumber={user.qrSerialNumber}
                username={user.name}
                mailId={user.designation}
                profile={user.profileImage}
                updateChanges={setIsUpdated}
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ManageCardsTable;
