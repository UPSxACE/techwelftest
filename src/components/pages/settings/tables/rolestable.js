import LoaderPrimary from '@/components/loader-primary';
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 150,
  height: 150,
  bgcolor: 'white',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 3,
};

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

  useEffect(() => {
    console.log(dataChanges);
  }, [dataChanges]);

  function handleNewCellEdit(cell, value) {
    //cell.column.id = the name of the field that is being edited
    console.log(cell.column.id);
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
        setTimeout(() => {
          // if successeful close edit mode
          exitEditMode();
        }, 1000);
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
                console.log('ROW', row.original.role);
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

          console.log('XCOL', column);
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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <LoaderPrimary />
        </Box>
      </Modal>
      <MaterialReactTable
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
    </>
  );
}
