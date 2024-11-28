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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

// Define the column types with specific attributes
interface Column {
  id: 'name' | 'code' | 'population' | 'size';
  label: string;
  minWidth: number;
  align?: 'right';
}

const columns: Column[] = [
  { id: 'name', label: 'Nom Livrable', minWidth: 170 },
  { id: 'code', label: 'Nature', minWidth: 170 },
  { id: 'population', label: 'Description', minWidth: 340 },
  { id: 'size', label: 'Responsable', minWidth: 170 },
];

// Interface for data type
interface Data {
  name: string;
  code: string;
  population: string;
  size: string;
}

// Function to create initial data
function createData(name: string, code: string, population: string, size: string): Data {
  return { name, code, population, size };
}

// Sample data rows
const initialRows = [
  createData('Livrable 1', 'Rapport', 'Rapport initial du projet avec les spécification techniques.', 'Personne 1'),
  createData('Livrable 2', 'Rapport', 'Documentation de la phase de conception incluant les maquettes.', 'Personne 2'),
  createData('Livrable 3', 'Rapport', 'Présentation finale du projet et revue des résultats.', 'Personne 3'),
];

const TableStickyHeader = () => {
  const [data, setData] = useState<Data[]>(initialRows);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectChange = (event: ChangeEvent<{ value: unknown }>, index: number, field: keyof Data) => {
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
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {columns.map(column => {
                  const value = row[column.id];
                  if (column.id === 'code' || column.id === 'size') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <FormControl fullWidth>
                          <Select
                            value={value}
                            onChange={(e) => handleSelectChange(e, rowIndex, column.id)}
                            displayEmpty
                          >
                            {column.id === 'code' ? (
                              <>
                                <MenuItem value="Rapport">Rapport</MenuItem>
                                <MenuItem value="Documentation">Documentation</MenuItem>
                                <MenuItem value="Présentation">Présentation</MenuItem>
                              </>
                            ) : (
                              <>
                                <MenuItem value="Personne 1">Personne 1</MenuItem>
                                <MenuItem value="Personne 2">Personne 2</MenuItem>
                                <MenuItem value="Personne 3">Personne 3</MenuItem>
                                <MenuItem value="Personne 4">Personne 4</MenuItem>
                              </>
                            )}
                          </Select>
                        </FormControl>
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <TextField
                          value={value}
                          onChange={(e) => handleSelectChange(e, rowIndex, column.id)}
                          fullWidth
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
