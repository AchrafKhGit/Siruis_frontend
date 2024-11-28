import React, { useState, ChangeEvent } from 'react';
import { Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer, TablePagination, TextField, MenuItem, Select, FormControl, InputLabel, InputAdornment } from '@mui/material';

interface Column {
  id: 'name' | 'description' | 'category' | 'value';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: Column[] = [
  { id: 'name', label: 'Nom de l’Hypothèse', minWidth: 170 },
  { id: 'description', label: 'Description', minWidth: 340 },
  { id: 'category', label: 'Catégorie', minWidth: 170 },
  { id: 'value', label: 'Valeur Associée', minWidth: 170 }
];

interface Data {
  name: string;
  description: string;
  category: string;
  value: string;
}

function createData(name: string, description: string, category: string, value: string): Data {
  return { name, description, category, value };
}

const TableHypothesisManagement = () => {
  const [rows, setRows] = useState<Data[]>([
    createData('Cost Reduction', 'Reduce operational costs by 20%', 'Coût', '2000 €'),
    createData('Time Optimization', 'Decrease production time by 5 days', 'Temps', '5 jours')
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

  const handleChange = (index: number, field: keyof Data, value: string) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const renderValueInput = (category: string, value: string, index: number) => {
    switch (category) {
      case 'Coût':
        return (
          <TextField
            fullWidth
            type="text"
            value={value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">€</InputAdornment>
            }}
          />
        );
      case 'Temps':
        return (
          <TextField
            fullWidth
            type="text"
            value={value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">jours</InputAdornment>
            }}
          />
        );
      case 'Planification':
        return (
          <TextField
            fullWidth
            type="date"
            value={value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
          />
        );
      case 'Efforts':
        return (
          <TextField
            fullWidth
            type="text"
            value={value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
          />
        );
      default:
        return (
          <TextField
            fullWidth
            value={value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
          />
        );
    }
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="hypothesis management table">
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
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                {columns.map(column => {
                  if (column.id === 'category') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        <FormControl fullWidth>
                          <InputLabel id={`select-label-${index}`}>{column.label}</InputLabel>
                          <Select
                            labelId={`select-label-${index}`}
                            value={row[column.id]}
                            label={column.label}
                            onChange={(e) => handleChange(index, 'category', e.target.value)}
                          >
                            <MenuItem value="Coût">Coût</MenuItem>
                            <MenuItem value="Temps">Temps</MenuItem>
                            <MenuItem value="Planification">Planification</MenuItem>
                            <MenuItem value="Efforts">Efforts</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    );
                  } else if (column.id === 'value') {
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {renderValueInput(row.category, row.value, index)}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={column.id} align={column.align}>
                      <TextField
                        fullWidth
                        value={row[column.id]}
                        onChange={(e) => handleChange(index, column.id, e.target.value)}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TableHypothesisManagement;
