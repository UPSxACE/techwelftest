import Box, { Button } from '@mui/material';
import MaterialReactTable from 'material-react-table';
import { useMemo, useState } from 'react';

export default function UsersTable() {
  const data = [
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
    ],
    []
  );

  return (
    <MaterialReactTable
      /*renderTopToolbarCustomActions={({ table }) => {
          return <Button variant='contained'>TEST</Button>;
        }}*/
      initialState={{ pagination: { pageSize: 5 } }}
      muiTableHeadCellProps={{ sx: { color: 'text.secondary' } }}
      muiTableBodyCellProps={{ sx: { color: 'text.secondary' } }}
      muiTablePaginationProps={{
        sx: { color: 'text.secondary' },
      }}
      data={data}
      columns={columns}
    />
  );
}
