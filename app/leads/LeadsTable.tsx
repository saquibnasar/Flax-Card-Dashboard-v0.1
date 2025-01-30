import proOne from "@/public/profile/pro_one.jpeg";
import proThree from "@/public/profile/pro_three.jpeg";
import Image from "next/image";
import { RiDownload2Line } from "react-icons/ri";
import Table from "../components/Table";

const LeadsTable = () => {
  const tableColumnHeaders = [
    "Lead Name",
    "Mobile Number",
    "Connected With",
    "Date",
    "Message",
  ];
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCheckbox />
          {tableColumnHeaders.map((header) => (
            <Table.ColumnHeaderCell key={header}>
              {header}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {[0, 1, 2, 3, 4].map((item) => (
          <Table.Row key={item}>
            <Table.ColumnHeaderCheckbox />
            <Table.Cell>
              <Table.HeaderCell
                name="Danilo Sousa"
                subTitle="danilo@example.com"
                icon={proOne}
              >
                Danilo Sousa
              </Table.HeaderCell>
            </Table.Cell>
            <Table.Cell>432342434</Table.Cell>
            <Table.Cell>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-circle w-8 h-8 relative">
                    <Image
                      src={proThree}
                      alt="Avatar Tailwind CSS Component"
                      fill
                    />
                  </div>
                </div>
                <div>Hart Hagerty</div>
              </div>
            </Table.Cell>
            <Table.Cell>Oct 28, 2023</Table.Cell>
            <Table.Cell>
              Lorem ipsum dol
              {/* <button className="flex items-center px-4 py-2 text-blue rounded-md hover:bg-dPrimary duration-150 ease-linear">
                <span className="mr-2">
                  <RiDownload2Line />
                </span>
              </button> */}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default LeadsTable;
