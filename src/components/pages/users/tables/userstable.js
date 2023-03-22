import LoadingModalWrapper from '@/components/loading-modal-wrapper';
import {
  Cancel,
  ControlPoint,
  Edit,
  GroupAdd,
  GroupRemove,
  PersonAdd,
  RemoveCircle,
  RemoveCircleOutline,
  Save,
} from '@mui/icons-material';
import { Box, Button, Icon, IconButton, Modal, SvgIcon } from '@mui/material';
import axios from 'axios';
import MaterialReactTable from 'material-react-table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import NewUserFormModal from '../forms/newuserformmodal';
import MySvg from '@/../public/add-permission.svg';
import Image from 'next/image';

const incomingData = [
  { id: 1, name: 'Snow', email: 'Jon@ad.com', role: 'Operator' },
  { id: 2, name: 'Lannister', email: 'Cersei@ab.com', role: 'Worker' },
  {
    id: 3,
    name: 'Lannister',
    email: 'Jaimeeeeeeeeeee@asfafs.com',
    role: 'Operator',
  },
  { id: 4, name: 'Stark', email: 'Arya@afasasf.comm', role: 'Worker' },
  {
    id: 5,
    name: 'Targaryen',
    email: 'DaenerysAadassdadsad@hotmail.com',
    role: 'Worker',
  },
  { id: 6, name: 'Snow', email: 'Jon@ad.com', role: 'Operator' },
  { id: 7, name: 'Lannister', email: 'Cersei@ab.com', role: 'Worker' },
  {
    id: 8,
    name: 'Lannister',
    email: 'Jaimeeeeeeeeeee@asfafs.com',
    role: 'Operator',
  },
  { id: 9, name: 'Stark', email: 'Arya@afasasf.comm', role: 'Worker' },
  {
    id: 10,
    name: 'Targaryen',
    email: 'DaenerysAadassdadsad@hotmail.com',
    role: 'Worker',
  },
];

export default function UsersTable() {
  const [open, setOpen] = useState(false);
  const [closeable, setCloseable] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openWaiting, setOpenWaiting] = useState(false);
  const handleOpenWaiting = () => setOpenWaiting(true);
  const handleCloseWaiting = () => setOpenWaiting(false);

  const tableRef = useRef(null);

  const { t } = useTranslation();

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
    handleOpenWaiting();

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
        handleCloseWaiting();
      });
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
      },
      {
        accessorKey: 'email', //access nested data with dot notation
        header: 'Email',
      },
      {
        accessorKey: 'role', //access nested data with dot notation
        header: 'Role',
      },
      /*valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,*/
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  const [secondaryButtonsEnabled, setSecondaryButtonsEnabled] = useState(false);

  useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      setSecondaryButtonsEnabled(true);
    } else {
      if (secondaryButtonsEnabled) setSecondaryButtonsEnabled(false);
    }
  }, [rowSelection]);

  return (
    <LoadingModalWrapper open={openWaiting}>
      <NewUserFormModal
        open={open}
        handleClose={handleClose}
        closeable={closeable}
        setCloseable={setCloseable}
      />
      <MaterialReactTable
        // Row selection code
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        //
        autoResetPageIndex={false} // must keep an eye on this
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box>
              <IconButton
                color='green'
                sx={{ pl: 1.25, color: 'info.main' }}
                onClick={() => handleOpen()}
              >
                <PersonAdd />
              </IconButton>

              <IconButton
                color='green'
                sx={{ color: 'success.main' }}
                onClick={() => handleOpen()}
                disabled={!secondaryButtonsEnabled}
                //disableRipple={!secondaryButtonsEnabled}
              >
                <Image
                  height={20}
                  width={20}
                  alt='Add permission icon'
                  style={{
                    filter: secondaryButtonsEnabled
                      ? 'brightness(0) saturate(100%) invert(36%) sepia(57%) saturate(507%) hue-rotate(74deg) brightness(98%) contrast(95%)'
                      : 'brightness(0) saturate(100%) invert(45%) sepia(3%) saturate(29%) hue-rotate(321deg) brightness(101%) contrast(89%)',
                  }}
                  src={'/add-permission.svg'}
                />
              </IconButton>
              <IconButton
                color='green'
                sx={{ color: 'error.main' }}
                onClick={() => handleOpen()}
                disabled={!secondaryButtonsEnabled}
                //disableRipple={!secondaryButtonsEnabled}
              >
                <Image
                  height={20}
                  width={20}
                  alt='Add permission icon'
                  style={{
                    filter: secondaryButtonsEnabled
                      ? 'brightness(0) saturate(100%) invert(29%) sepia(61%) saturate(3943%) hue-rotate(347deg) brightness(88%) contrast(86%)'
                      : 'brightness(0) saturate(100%) invert(45%) sepia(3%) saturate(29%) hue-rotate(321deg) brightness(101%) contrast(89%)',
                  }}
                  src={'/permission-deletion.svg'}
                />
              </IconButton>
            </Box>
          );

          // Old Code
          return (
            <Button variant='contained' onClick={() => handleOpen()}>
              {t('users_table_add_user')}
            </Button>
          );
        }}
        initialState={{ pagination: { pageSize: 7 } }}
        muiTablePaperProps={{ style: { borderRadius: 4, overflow: 'hidden' } }}
        muiTableHeadCellProps={{ sx: { color: 'text.secondary' } }}
        muiTableBodyCellProps={{ sx: { color: 'text.secondary' } }}
        muiTablePaginationProps={{
          sx: { color: 'text.secondary' },
          rowsPerPageOptions: [7, 10, 15, 20, 50, 75, 100],
        }}
        data={data}
        columns={columns}
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
                //console.log(tableRef.current.getState().editingRow.original);
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
