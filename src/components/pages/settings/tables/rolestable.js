import LoaderPrimary from '@/components/loader-primary';
import LoadingModalWrapper from '@/components/loading-modal-wrapper';
import {
  Button,
  Box,
  Checkbox,
  Modal,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import { useEffect, useMemo, useState } from 'react';

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
      await axios.post('http://localhost:9000/test/formdata', data[row_index], {
        //headers: { 'Content-Type': 'multipart/form-data' },
      });
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
      {
        header: 'Actions',
        Cell: ({ cell }) => (
          <>
            <Button
              variant='contained'
              color='success'
              key={0}
              sx={{ height: 30, mr: 1 }}
            >
              S
            </Button>
            <Button
              variant='contained'
              color='error'
              key={1}
              sx={{ height: 30, ms: 1 }}
            >
              X
            </Button>
          </>
        ),
      },
      /*valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,*/
    ],
    []
  );

  return (
    <LoadingModalWrapper open={open}>
      <MaterialReactTable
        initialState={{ pagination: { pageSize: 5 } }}
        muiTableHeadCellProps={{ sx: { color: 'text.secondary' } }}
        muiTableBodyCellProps={{ sx: { color: 'text.secondary' } }}
        muiTablePaginationProps={{
          sx: { color: 'text.secondary' },
          rowsPerPageOptions: [5, 10, 15, 20],
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
      />
    </LoadingModalWrapper>
  );
}
