import api from '@/api';
import LoaderPrimary from '@/components/loader-primary';
import LoadingModalWrapper from '@/components/loading-modal-wrapper';
import { Cancel, Edit, Save } from '@mui/icons-material';
import {
  Button,
  Box,
  Checkbox,
  Modal,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function RolesTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const incomingData = [
    { id: 1, user_backend: false, role: 'Operator', approval: 1 },
    { id: 2, user_backend: false, role: 'Worker', approval: 2 },
    {
      id: 3,
      user_backend: true,
      role: 'Operator',
      approval: 2,
    },
    { id: 4, user_backend: true, role: 'Worker', approval: 1 },
    {
      id: 5,
      user_backend: true,
      role: 'Worker',
      approval: 5,
    },
    { id: 6, user_backend: false, role: 'Operator', approval: 3 },
    { id: 7, user_backend: true, role: 'Worker', approval: 4 },
    {
      id: 8,
      user_backend: true,
      role: 'Operator',
      approval: 5,
    },
    { id: 9, user_backend: false, role: 'Worker', approval: 1 },
    {
      id: 10,
      user_backend: true,
      role: 'Worker',
      approval: 2,
    },
  ];

  const [data, setData] = useState(incomingData);

  const [dataChanges, setDataChanges] = useState(incomingData);

  const tableRef = useRef(null);

  function handleNewCellEdit(cell, value) {
    //cell.column.id = the name of the field that is being edited

    const updateDataChanges = [...dataChanges];
    updateDataChanges[cell.row.index][cell.column.id] = value;
    setDataChanges([...updateDataChanges]);
  }

  function saveEdits(row_index, exitEditMode) {
    // set WAIT modal
    handleOpen();

    setData(dataChanges);
    // use row_index to know which row was edited, and send a request to update ONLY that entry(by accessing data[row_index].id)
    // ...

    // send request

    const sendRequest = async () => {
      await api.updateRole(
        {
          id: data[row_index].id,
          name: data[row_index].role,
          positionapprovation: data[row_index].approval,
          caneditforms: data[row_index].user_backend,
        },
        {
          //headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
    };

    sendRequest()
      .then(() => {
        // if successeful close edit mode
        exitEditMode();
      })
      .finally(() => {
        // set WAIT modal false
        handleClose();
      });
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'role', //access nested data with dot notation
        header: 'Role',
        readOnly: true,
      },
      {
        accessorKey: 'user_backend', //access nested data with dot notation
        header: 'User Backend',
        Cell: ({ cell, row }) => {
          return (
            <Checkbox
              disableRipple
              //inputProps={{ 'aria-label': 'controlled' }}
              checked={cell.getValue()}
              onChange={(event) => {
                const newValue = event.target.checked;
              }}
            />
          );
        },
        Edit: ({ cell, column, row, onChange }) => {
          const [checked, setChecked] = useState(cell.getValue());

          return (
            <Checkbox
              inputProps={{
                'aria-label': 'controlled',
                disabled: column.columnDef.readOnly,
              }}
              checked={checked}
              onChange={(event) => {
                if (!column.columnDef.readOnly) {
                  setChecked(event.target.checked);
                  handleNewCellEdit(cell, event.target.checked);
                  //console.log('ROW', row.original.role);
                }
              }}
            />
          );
        },
      },
      {
        accessorKey: 'approval', //access nested data with dot notation
        header: 'Approval',
        Edit: ({ cell, column }) => {
          const [value, setValue] = useState(cell.getValue());

          const handleChange = (event) => {
            if (!column.columnDef.readOnly) {
              setValue(event.target.value);
              handleNewCellEdit(cell, event.target.value);
            }
          };
          return (
            <Select
              labelId='approval-select-label'
              id='approval-select'
              disabled={column.columnDef.readOnly}
              value={value}
              label='Age'
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          );
        },
      },

      /*valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,*/
    ],
    []
  );

  return (
    <LoadingModalWrapper open={open}>
      <MaterialReactTable
        autoResetPageIndex={false} // must keep an eye on this
        initialState={{ pagination: { pageSize: 7 } }}
        muiTableHeadCellProps={{ sx: { color: 'text.secondary' } }}
        muiTableBodyCellProps={{
          sx: {
            color: 'text.secondary',
            '& .MuiIconButton-root': {
              margin: 0,
            },
            '& .MuiBox-root': {
              gap: 0,
            },
          },
        }}
        muiTablePaginationProps={{
          sx: { color: 'text.secondary' },
          rowsPerPageOptions: [7, 10, 15, 20, 50, 75, 100],
        }}
        muiTableBodyCellEditTextFieldProps={({ cell }) => {
          return {
            disabled: cell.column.columnDef.readOnly,
            onChange: (event) => {
              if (!cell.column.columnDef.readOnly) {
                handleNewCellEdit(cell, event.target.value);
              }
            },
          };
        }}
        data={data}
        columns={columns}
        editingMode='row'
        enableEditing={(rowData) => rowData.editable !== false}
        onEditingRowSave={({ row, exitEditingMode }) => {
          saveEdits(row.index, exitEditingMode);
        }}
        onEditingRowCancel={() => {
          setDataChanges(data);
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            header: 'Actions',
            Cell: ({ row, table }) => {
              //console.log(table.getState().editingRow.original);
              //console.log(table.getState().editingRow.index);

              const row_index = row.index;

              if (
                tableRef.current.getState().editingRow &&
                tableRef.current.getState().editingRow.index === row_index
              ) {
                // Debug: console.log(tableRef.current.getState().editingRow.original);
                return (
                  <>
                    <IconButton
                      onClick={() =>
                        saveEdits(row_index, () => {
                          table.setEditingRow(null);
                        })
                      }
                    >
                      <Save />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        setDataChanges(data);
                        table.setEditingRow(null);
                      }}
                    >
                      <Cancel />
                    </IconButton>
                  </>
                );
              }

              return (
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              );
            },
          },
        }}
        tableInstanceRef={tableRef}
      />
    </LoadingModalWrapper>
  );
}
