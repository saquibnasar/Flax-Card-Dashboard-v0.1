import React, { PropsWithChildren, ReactNode } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import profile from "@/public/profile/pro_three.jpeg";

const Table = ({ children }: PropsWithChildren) => {
  return (
    <div className="overflow-x-auto space-y-10 border border-dSecondary bg-sPrimary rounded-md">
      <table className="table">{children}</table>
    </div>
  );
};

Table.Header = function TableHeader({ children }: PropsWithChildren) {
  return <thead>{children}</thead>;
};

Table.Row = function TableRow({ children }: PropsWithChildren) {
  return <tr>{children}</tr>;
};

Table.ColumnHeaderCheckbox = function TableColumnHeaderCheckbox() {
  return (
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
  );
};

Table.ColumnHeaderCell = function TableColumnHeaderCell({
  children,
}: PropsWithChildren) {
  return <th>{children}</th>;
};

Table.Body = function TableBody({ children }: PropsWithChildren) {
  return <tbody>{children}</tbody>;
};

Table.RowHeaderCell = function TableBody({ children }: PropsWithChildren) {
  return <tbody>{children}</tbody>;
};

Table.Cell = function TableCell({ children }: PropsWithChildren) {
  return <td>{children}</td>;
};

Table.HeaderCell = function TableCell({
  children,
  subTitle,
  icon,
  name,
}: {
  children: ReactNode;
  subTitle: string;
  icon: StaticImport | string;
  name: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="mask mask-squircle w-12 h-12 relative">
          {icon ? (
            <Image src={icon} alt="Avatar Tailwind CSS Component" fill />
          ) : (
            <div className="flex justify-center items-center w-full h-full text-neutral-content">
              <span className="text-3xl">{name?.charAt(0)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:block">
        <div className="text-[16px]">{children}</div>
        <div className="text-sm opacity-50">{subTitle}</div>
      </div>
    </div>
  );
};

export default Table;
