import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    Paper,
    Button,
    ButtonGroup,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { MainLayout } from '../../components';

export default function Film() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [nextButtonDisable, setNextButtonDisable] = useState(true);
    const [previousButtonDisable, setPreviousButtonDisable] =
    useState(true);

    const fetchData = async (pageVal) => {
        const response = await axios.get(
            `https://swapi.dev/api/films/?page=${pageVal}`
        );
        setTableData(response.data.results);
        setCount(response.data.count);
        setNextButtonDisable(10 > count);
        setLoader(false);
    };
    useEffect(() => {
        fetchData(1);
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const paginateHandler = (val) => {
        if (val == 'next') {
            setPage(page + 1);
        } else {
            setPage(page - 1);
        }
        if (page == 1) {
            setPreviousButtonDisable(true);
            setNextButtonDisable(false);
        } else {
            setPreviousButtonDisable(false);
        }

        fetchData(page);
        if (page * 10 > count) {
            setNextButtonDisable(true);
        }
    };
    const handleRequestView = (data) => {
        navigate('/film-view', { state: { FilmData: data } });
    };
    return (
        <MainLayout title="Films">
            {loader ? (
                <div className="loader"></div>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Title</StyledTableCell>
                                    <StyledTableCell align="right">Director</StyledTableCell>
                                    <StyledTableCell align="right">Release Date</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData.map((row, i) => (
                                    <StyledTableRow key={i}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.title}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.director}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {moment(row.release_date).format('MMM DD YYYY h:mm A')}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="outlined"
                                                onClick={() => handleRequestView(row)}
                                            >
                                                {' '}
                        View Details{' '}
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br />
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                    >
                        <Button
                            disabled={previousButtonDisable}
                            onClick={() => paginateHandler('previous')}
                        >
              previous
                        </Button>
                        <Button
                            disabled={nextButtonDisable}
                            onClick={() => paginateHandler('next')}
                        >
              next
                        </Button>
                    </ButtonGroup>
                </>
            )}
        </MainLayout>
    );
}
