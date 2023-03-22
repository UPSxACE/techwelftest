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
import { useTranslation } from 'next-i18next';
import NewRoleFormModal from '../forms/newroleformmodal';
import useHandle403 from '@/utils/handle-403';

export default function RolesTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openForm, setOpenForm] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const [incomingData, setIncomingData] = useState(false); // false means the data needed didn't arrive yet
  const [dataArrived, setDataArrived] = useState(false);

  const handle403 = useHandle403();

  /*
  const incomingData = [
    { id: 1, caneditforms: false, name: 'Operator', positionapprovation: 1 },
    { id: 2, caneditforms: false, name: 'Worker', positionapprovation: 2 },
    {
      id: 3,
      caneditforms: true,
      name: 'Operator',
      positionapprovation: 2,
    },
    { id: 4, caneditforms: true, name: 'Worker', positionapprovation: 1 },
    {
      id: 5,
      caneditforms: true,
      name: 'Worker',
      positionapprovation: 5,
    },
    { id: 6, caneditforms: false, name: 'Operator', positionapprovation: 3 },
    { id: 7, caneditforms: true, name: 'Worker', positionapprovation: 4 },
    {
      id: 8,
      caneditforms: true,
      name: 'Operator',
      positionapprovation: 5,
    },
    { id: 9, caneditforms: false, name: 'Worker', positionapprovation: 1 },
    {
      id: 10,
      caneditforms: true,
      name: 'Worker',
      positionapprovation: 2,
    },
  ];*/

  useEffect(() => {
    const source = axios.CancelToken.source();

    const sendRequest = async () => {
      await api
        .getRolesData({
          cancelToken: source.token,
        })
        .then((response) => {
          const data = response?.data;
          if (data) {
            setIncomingData(data);
          }
        })
        .catch((error) => {
          if (error?.response?.status === 404) {
            setIncomingData({});
          }
          if (error?.response?.status === 403) handle403();
        });
    };

    sendRequest();

    return () => {
      source.cancel('Component Unmounted', { silent: 'true' }); // Component Unmounted
    };
  }, []);

  useEffect(() => {
    if (incomingData !== false) {
      setDataArrived(true);
    }
  }, [incomingData]);

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
          name: data[row_index].name,
          positionapprovation: data[row_index].positionapprovation,
          caneditforms: data[row_index].caneditforms,
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
      .catch((err) => {
        if (err?.response?.status === 403) handle403();
      })
      .finally(() => {
        // set WAIT modal false
        handleClose();
      });
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Role',
        readOnly: true,
      },
      {
        accessorKey: 'caneditforms', //access nested data with dot notation
        header: 'Can Edit Forms',
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
                  //console.log('ROW', row.original.name);
                }
              }}
            />
          );
        },
      },
      {
        accessorKey: 'positionapprovation', //access nested data with dot notation
        header: 'Approvation',
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
              labelId='positionapprovation-select-label'
              id='positionapprovation-select'
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

  const { t } = useTranslation();

  if (!dataArrived) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
        }}
      >
        <LoaderPrimary />
      </Box>
    );
  }

  return (
    <LoadingModalWrapper open={open}>
      <NewRoleFormModal
        open={openForm}
        handleClose={handleCloseForm}
        closeable={closeable}
        setCloseable={setCloseable}
      />
      <MaterialReactTable
        key={dataArrived}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Button variant='contained' onClick={() => handleOpenForm()}>
              {t('roles_table_add_roles')}
            </Button>
          );
        }}
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
