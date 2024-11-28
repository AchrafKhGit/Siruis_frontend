import { useState, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface Column {
  id: 'select' | 'name' | 'email' | 'role' | 'rate';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'select', label: 'Sélectionner', minWidth: 30, align: 'center' },
  { id: 'name', label: 'Nom de l\'Utilisateur', minWidth: 170, align: 'left' },
  { id: 'email', label: 'Email', minWidth: 170, align: 'left' },
  { id: 'role', label: 'Rôle Actuel', minWidth: 170, align: 'left' },
  { id: 'rate', label: 'Taux d\'Implication', minWidth: 100, align: 'left' }
];

interface Data {
  select: boolean;
  name: string;
  email: string;
  role: string;
  rate: string;
}

function createData(
  select: boolean,
  name: string,
  email: string,
  role: string,
  rate: string
): Data {
  return { select, name, email, role, rate };
}

const rows = [
  createData(false, 'Benoit Godbout', 'benoit@example.com', 'Chef de Projet', '40%'),
  createData(false, 'Alice Tremblay', 'alice@example.com', 'Développeur', '60%'),
  createData(false, 'Marc Dupont', 'marc@example.com', 'Consultant', '75%')
];

const TableStickyHeader = () => {
  const [data, setData] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>, index: number, field: keyof Data) => {
    const updatedData = [...data];
    updatedData[index][field] = event.target.value as string;
    setData(updatedData);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover key={index}>
                {columns.map((column) => {
                  if (column.id === 'select') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Checkbox checked={row.select} onChange={() => handleSelectChange({
                          target: { value: !row.select } as any,
                          currentTarget: event.currentTarget,
                        }, index, 'select')} />
                      </TableCell>
                    );
                  } else if (column.id === 'role') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <Select
                          fullWidth
                          value={row[column.id]}
                          onChange={(e) => handleSelectChange(e, index, column.id)}
                        >
                          <MenuItem value="Chef de Projet">Chef de Projet</MenuItem>
                          <MenuItem value="Développeur">Développeur</MenuItem>
                          <MenuItem value="Consultant">Consultant</MenuItem>
                          <MenuItem value="Analyste">Analyste</MenuItem>
                        </Select>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <TextField
                          fullWidth
                          value={row[column.id]}
                          onChange={(e) => handleSelectChange(e, index, column.id)}
                          variant="outlined"
                        />
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableStickyHeader;
