import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Paginator } from "primereact/paginator";
import { Button } from "primereact/button";

const TableSkeleton = () => {
  const rows = Array(6).fill({}); // Placeholder for 6 rows

  const header = (
    <div className="flex justify-between items-center border-b p-4">
      <h1 className="text-xl font-bold">Table Header</h1>
      <div className="flex space-x-3">
        <Button label="Add" icon="pi pi-plus" className="p-button-success" />
        <Button label="Export Excel" icon="pi pi-file-excel" className="p-button-success" />
        <Button label="Export PDF" icon="pi pi-file-pdf" className="p-button-danger" />
      </div>
    </div>
  );

  const footer = (
    <div className="flex justify-between items-center p-4">
      <span>Showing 1-6 of 100</span>
      <Paginator
        first={0}
        rows={6}
        totalRecords={100}
        rowsPerPageOptions={[6, 12, 24]}
        onPageChange={() => {}}
      />
    </div>
  );

  return (
    <section className="p-4 bg-white rounded shadow-md">
      {header}

      <DataTable value={rows} className="p-datatable-sm" showGridlines>
        <Column header="Column 1" body={() => "Data 1"} />
        <Column header="Column 2" body={() => "Data 2"} />
        <Column header="Column 3" body={() => "Data 3"} />
      </DataTable>

      {footer}
    </section>
  );
};

export default TableSkeleton;
