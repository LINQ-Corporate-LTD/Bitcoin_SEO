import React, { Fragment, useEffect, useState } from "react";
import { CardBody, Col, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => setValue(initialValue), [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      className="form-control search"
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const TableContainer = ({
  columns,
  data,
  isGlobalFilter,
  customPageSize = 10,
  tableClass,
  theadClass,
  trClass,
  thClass,
  divClass,
  SearchPlaceholder,
  isRowDnD = false,
  onDragEnd,
}) => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // ✅ FIXED: Pagination state INSIDE component
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: customPageSize,
  });

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      globalFilter,
      pagination, // ✅ REQUIRED
    },

    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination, // ✅ REQUIRED

    filterFns: { fuzzy: fuzzyFilter },
    globalFilterFn: fuzzyFilter,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    autoResetPageIndex: false, // ✅ PREVENT BLANK PAGE
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    getState,
  } = table;

  // ✅ Sync page size safely
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageSize: customPageSize,
    }));
  }, [customPageSize]);

  const renderTableBody = () => {
    const rows = getRowModel().rows;

    if (!isRowDnD) {
      return (
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="table-body">
          {(provided) => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
              {rows.map((row, index) => (
                <Draggable key={row.original.id} draggableId={row.original.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <tr
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        backgroundColor: snapshot.isDragging ? "#f8f9fa" : "transparent",
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <Fragment>
      {isGlobalFilter && (
        <Row className="mb-3">
          <CardBody>
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={setGlobalFilter}
              placeholder={SearchPlaceholder}
            />
          </CardBody>
        </Row>
      )}

      <div className={divClass}>
        <Table hover className={tableClass}>
          <thead className={theadClass}>
            {getHeaderGroups().map((hg) => (
              <tr key={hg.id} className={trClass}>
                {hg.headers.map((header) => (
                  <th key={header.id} className={thClass}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {renderTableBody()}
        </Table>
      </div>

      {/* Pagination */}
      <Row className="align-items-center mt-2">
        <div className="col-sm">
          <div className="text-muted">
            Page {getState().pagination.pageIndex + 1} of{" "}
            {getPageOptions().length}
          </div>
        </div>

        <div className="col-sm-auto">
          <ul className="pagination">
            <li className={`page-item ${!getCanPreviousPage() && "disabled"}`}>
              <Link className="page-link" to="#" onClick={previousPage}>
                Previous
              </Link>
            </li>

            {getPageOptions().map((p) => (
              <li key={p} className="page-item">
                <Link
                  to="#"
                  className={`page-link ${getState().pagination.pageIndex === p && "active"
                    }`}
                  onClick={() => setPageIndex(p)}
                >
                  {p + 1}
                </Link>
              </li>
            ))}

            <li className={`page-item ${!getCanNextPage() && "disabled"}`}>
              <Link className="page-link" to="#" onClick={nextPage}>
                Next
              </Link>
            </li>
          </ul>
        </div>
      </Row>
    </Fragment>
  );
};

export default TableContainer;
