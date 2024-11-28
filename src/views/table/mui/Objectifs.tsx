// ** React Imports
import { useState, ChangeEvent } from 'react';

// ** MUI Imports
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface Column {
  id: 'name' | 'code' | 'population';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Objectif', minWidth: 170 },
  { id: 'code', label: 'Catégorie', minWidth: 170 },
  { id: 'population', label: 'Description', minWidth: 340 },
];

interface Data {
  name: string;
  code: string;
  population: string;
}

function createData(name: string, code: string, population: string): Data {
  return { name, code, population };
}

const TableStickyHeader = () => {
  const [rows, setRows] = useState<Data[]>([
    createData('Objectif 1', 'Service Client', "Améliorer la satisfaction client de 20% d'ici la fin d'année"),
    createData('Objectif 2', 'Service Client', "Augmenter le chiffre d'affaire de 10% grâce à la diversification des produits"),
    createData('Objectif 3', 'Service Client', "Réduire le temps de traitement des commandes de 30%."),
  ]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (index: number, field: keyof Data, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align || 'left'} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                {columns.map(column => {
                  const value = row[column.id];
                  if (column.id === 'code') {
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        <FormControl fullWidth>
                          <InputLabel id={`select-label-${index}`}>Catégorie</InputLabel>
                          <Select
                            labelId={`select-label-${index}`}
                            value={value}
                            onChange={(e) => handleChange(index, 'code', e.target.value)}
                            label="Catégorie"
                          >
                            <MenuItem value="Service Client">Service Client</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Production">Production</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={column.id} align={column.align || 'left'}>
                        <TextField
                          fullWidth
                          value={value}
                          variant="outlined"
                          onChange={(e) => handleChange(index, column.id, e.target.value)}
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
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableStickyHeader;
