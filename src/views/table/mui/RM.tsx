import { useState, ChangeEvent } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';

interface Column {
  id: 'name' | 'rate' | 'projects' | 'dates' | 'dailyCost' | 'purchaseCost' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Nom de la Ressource', minWidth: 170 },
  { id: 'rate', label: 'Taux d\'Implication', minWidth: 100 },
  { id: 'projects', label: 'Engagements dans d’autres Projets', minWidth: 200 },
  { id: 'dates', label: 'Dates d’Engagement', minWidth: 180 },
  { id: 'dailyCost', label: 'Coût Journalier', minWidth: 130 },
  { id: 'purchaseCost', label: 'Hypothèse sur le Prix d’Achat', minWidth: 180 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }
];

interface Data {
  name: string;
  rate: string;
  projects: string;
  dates: string;
  dailyCost: string;
  purchaseCost: string;
}

function createData(
  name: string,
  rate: string,
  projects: string,
  dates: string,
  dailyCost: string,
  purchaseCost: string
): Data {
  return { name, rate, projects, dates, dailyCost, purchaseCost };
}

const rows = [
  createData('Serveur', '50%', 'Projet A, Projet B', '01/01/2024 - 15/03/2024', '100 $/jour', 'Achat unique estimé à 1 200 $'),
  createData('Tableau interactif', '75%', 'Projet C', '16/03/2024 - 30/06/2024', '80 $/jour', 'Achat unique estimé à 800 $'),
];

const TableResourceManagement = () => {
  const [data, setData] = useState<Data[]>(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number, field: keyof Data) => {
    const updatedData = [...data];
    updatedData[index][field] = event.target.value;
    setData(updatedData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover key={index}>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align || 'left'}>
                    {column.id !== 'actions' ? (
                      <TextField
                        value={row[column.id]}
                        onChange={(e) => handleInputChange(e, index, column.id)}
                        fullWidth
                        variant="outlined"
                      />
                    ) : (
                      // Placeholder for actions like Edit or Delete
                      "Edit | Delete"
                    )}
                  </TableCell>
                ))}
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
    </Paper>
  );
};

export default TableResourceManagement;
