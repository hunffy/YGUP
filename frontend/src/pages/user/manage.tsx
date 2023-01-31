import { Box, Button, Checkbox, IconButton, Paper, Stack, styled, Tab, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tabs, Toolbar, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import User from '../components/user';
import React from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#009688',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

interface Data {
    name: string,
    time: string,
    title: string,
    edit: string,
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  type Order = "asc" | "desc";
  
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) 
{
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: true,
        disablePadding: false,
        label: '기업명',
    },
    
    {
        id: 'title',
        numeric: true,
        disablePadding: false,
        label: '제목',
    },

    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: '작성시간',
    },

    {
        id: 'edit',
        numeric: true,
        disablePadding: false,
        label: '수정',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}
  
  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
      props;
    const createSortHandler =
      (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell padding="checkbox">
          
          </StyledTableCell>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.id}
              align='center'
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

interface EnhancedTableToolbarProps {
    numSelected: number;
  }

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected } = props;
    const navigate = useNavigate();
    const goCoverLetter_Write = () => {
      navigate('/coverletter_write')
    };

  return (
    <Toolbar
      sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
          bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main, 
                theme.palette.action.activatedOpacity),
          }),
      }} >
      <Typography
        sx={{ flex: '1 1 100%' }}
        color="inherit"
        variant="subtitle1"
        component="div"
      >  
      </Typography>    
      {numSelected > 0 ? (
      <Typography>
          <IconButton>
            <DeleteIcon />
          </IconButton>
      </Typography>
      ):(
      <Typography>
        <Button 
            variant="contained" size="small" 
            onClick={() => { goCoverLetter_Write()}}
            sx={{ width: 100, 
                    mt:3, 
                    mx:'auto', 
                    color:'#ffff', 
                    backgroundColor: '#009688', 
                    borderColor:'#434343'
            }} >
            글쓰기
        </Button>
      </Typography>
    )}
    </Toolbar> 
  );
}

const Manage: React.FC = () => {

    const navigate = useNavigate();
    const { state } = useLocation();

    const goUserInfo = () => {
        navigate('/userinfo')
    };
    const goBookmark = (state: number) => {
        navigate('/bookmark',  { state: state })
    };
    const goManage = (state: number) => {
        navigate('/manage',  { state: state })
    };
    const goCoverLetter_Update = () => {
      navigate('/coverletter_update')
    };

    const [value, setValue] = React.useState(state);
      
    function createData(
        id: string,
        name: string,
        title: string,
        time: string,
        edit: string,
    ) {
    return { id, name, title, time, edit };
    }

    const rows = [
        createData('1', 'Snow','이력서_센스있고 손이 빠릅니다',  '23년 01월 01일', 'Edit'),
        createData('2', 'kakao', '카카오와 함께 도전하겠습니다.', '23년 01월 01일', 'Edit'),
        createData('3', 'coopang','쿠팡의 성장 가능성에 주목하겠습니다', '23년 01월 02일', 'Edit' ),
        createData('4', 'naver', '변화에 맞춰 도전하는 자세', '23년 01월 03일', 'Edit' ),
        createData('5', 'toss', '소통과 신뢰로 목료달성하기', '23년 01월 04일', 'Edit' ),
        createData('6', 'namu', '함께일 때 빛나는, 나무와 같은사람', '23년 01월 05일', 'Edit' ),
    ];

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('name');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const handleRequestSort = (
      event: React.MouseEvent<unknown>,
      property: keyof Data,
    ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.name);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    
    function a11yProps(index: number) {
      return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div className='manage'>
            <Box className='mypageheader' sx={{ backgroundColor:'#ffff', borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab value={0} label="회원정보" {...a11yProps(0)} onClick={() => { goUserInfo(); } }/>
                    <Tab value={1} label="북마크" {...a11yProps(1)} onClick={() => { goBookmark(1); } }/>
                    <Tab value={2} label="자소서 관리" {...a11yProps(2)} onClick={() => { goManage(2); } } />
                </Tabs>
            </Box>          
            <Stack direction={'row'} spacing={2} className='mypagecontents' >
              <User />
              <Box sx={{ width: '100%', mb:15}}>
                <Paper sx={{ width: '100%' }}>
                  <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                    marginLeft={3}
                    paddingTop={2}
                    paddingBottom={2}>
                    내가 쓴 자소서
                  </Typography>
                  <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle" >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length} />
                        <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        icon={<Checkbox/>}//user_list에서 없어도 돌아감
                                        checkedIcon={<Checkbox/>}
                                        checked={isItemSelected}
                                        onClick={(event) => handleClick(event, row.id)}//tablerow에서 옮겨옴
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    align="center"
                                >
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.title}</TableCell>
                                <TableCell align="center">{row.time}</TableCell>
                                <TableCell align="center">
                                  <Button
                                    color = "primary"
                                    size = "small"
                                    variant = "text"
                                    onClick = {() => { goCoverLetter_Update() }}
                                    sx={{ height:20 }} >
                                    Edit
                                    <IconButton aria-label="Edit" size="small" disabled color="primary" >
                                      <EditIcon fontSize="small"/>
                                    </IconButton>
                                  </Button>        
                                </TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                <EnhancedTableToolbar numSelected={selected.length}/>
              </Box>
            </Stack>
        </div>
    );
};

export default Manage;
