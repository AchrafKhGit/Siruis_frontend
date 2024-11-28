import React, { useState, ChangeEvent } from 'react';
import {
  Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer,
  TablePagination, TextField, MenuItem, Select, IconButton
} from '@mui/material';

// Define the data type for each row in the table
interface ExpenseData {
  expenseName: string;
  expenseType: string;
  monetaryValue: string;
  comment: string;
}

// Create initial sample data
function createData(
  expenseName: string,
  expenseType: string,
  monetaryValue: string,
  comment: string
): ExpenseData {
  return { expenseName, expenseType, monetaryValue, comment };
}

// Component for Expense Table
const ExpenseTable = () => {
  const [data, setData] = useState<ExpenseData[]>([
    createData('Travel to HQ', 'Frais de déplacement', '300', 'Annual strategic meeting.'),
    createData('New Projector', 'Achat d’équipement', '1500', 'For conference room.'),
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number, field: keyof ExpenseData) => {
    const updatedData = [...data];
    updatedData[index][field] = event.target.value;
    setData(updatedData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Nom de la dépense</TableCell>
              <TableCell>Type de dépense</TableCell>
              <TableCell>Valeur monétaire ($)</TableCell>
              <TableCell>Commentaire</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  <TextField
                    value={row.expenseName}
                    onChange={(e) => handleInputChange(e, index, 'expenseName')}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.expenseType}
                    onChange={(e) => handleInputChange(e as ChangeEvent<HTMLInputElement>, index, 'expenseType')}
                    fullWidth
                  >
                    <MenuItem value="Frais de déplacement">Frais de déplacement</MenuItem>
                    <MenuItem value="Achat d’équipement">Achat d’équipement</MenuItem>
                    <MenuItem value="Services externes">Services externes</MenuItem>
                    <MenuItem value="Formation">Formation</MenuItem>
                    <MenuItem value="Autre">Autre</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={row.monetaryValue}
                    onChange={(e) => handleInputChange(e, index, 'monetaryValue')}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.comment}
                    onChange={(e) => handleInputChange(e, index, 'comment')}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ExpenseTable;
