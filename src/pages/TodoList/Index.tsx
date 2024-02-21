import {useMutation, useQuery} from "@apollo/client";
import {GET_TODO_LIST} from "../../graphql/Query/getAllTodo.ts";
import Loading from "../../components/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Ordering, Todo, TodoTypes} from "../../utils/type.ts";
import {TableColumn} from "../../utils/TableColumn.ts";
import {UPDATE_TODO_STATUS} from "../../graphql/Mutation/updateTodoStatusById.ts";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";
import {useFilter} from "../../context/useFilter.tsx";

const StyleTableRow = styled(TableRow)`
    cursor: pointer;
`;

const FilterContainer = styled.div`
    display: flex;
    margin-bottom: 12px;
    align-self: flex-start;
    & > * {
        margin-right: 12px;
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const SFormControl = styled(FormControl)`
    margin-right: 12px;
`;

export default function TodoList() {
    const navigate = useNavigate();
    const {orderBy, setOrderBy, filterType, setFilterType, filterIsDone, setFilterIsDone} = useFilter()
    const TodoListResponse = useQuery<{getTodoList: Todo[]}>(GET_TODO_LIST, {variables: {orderBy, filters: {types: filterType, isDone: filterIsDone}}});
    const [updateStatus, UpdateStatusResponse] = useMutation(UPDATE_TODO_STATUS, {
        refetchQueries: [GET_TODO_LIST],
    });

    if (TodoListResponse.loading || UpdateStatusResponse.loading) return <Loading/>;
    if (TodoListResponse.error || UpdateStatusResponse.error) return <ServerError/>;

    const handleChangeFilterType = (event: SelectChangeEvent<TodoTypes[]>) => {
        const {
            target: { value },
        } = event;
        if (!value || value === '' || value.length === 0) {
            setFilterType(undefined)
        }
        else
            setFilterType(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeFilterisDone = (event: SelectChangeEvent<boolean>) => {
        const {
            target: { value },
        } = event;
        setFilterIsDone(typeof value === 'string' ? value === 'Done' : value)
    }

    const renderValueStatus = (value: boolean | undefined) => {
        if (value === undefined)
            return
        return value ? 'Fait' : 'Pas fait'
    }

    const handleChangeFilterDateOrder = (event: SelectChangeEvent<Ordering | undefined>) => {
        const {
            target: { value },
        } = event;
        setOrderBy(value)
    }

    const renderValueDateOrder = (value: Ordering | undefined) => {
        if (value === undefined)
            return undefined
        return value === Ordering.DATE_DESC ? 'Décroissant' : 'Croissant'
    }

    return (
        <Container>
            <Typography component={"h1"} variant="h2" >
                {"TODO LIST"}
            </Typography>
            <FilterContainer>
                <SFormControl>
                    <InputLabel id="type-filter">Catégories</InputLabel>
                    <Select
                        labelId="type-filter"
                        multiple
                        value={filterType ?? []}
                        onChange={handleChangeFilterType}
                        input={<OutlinedInput label="Type-Filter"/>}
                        renderValue={(selected) => selected.join(', ')}
                        sx={{width: 200}}
                    >
                        {Object.values(TodoTypes).map((type) => (
                            <MenuItem key={type} value={type}>
                                <Checkbox checked={filterType?.indexOf(type) > -1}/>
                                <ListItemText primary={type}/>
                            </MenuItem>
                        ))}
                    </Select>
                </SFormControl>
                <SFormControl>
                    <InputLabel id="done-filter">Statut</InputLabel>
                    <Select
                        labelId="done-filter"
                        value={filterIsDone}
                        input={<OutlinedInput label="Type-Filter"/>}
                        onChange={handleChangeFilterisDone}
                        renderValue={renderValueStatus}
                        sx={{width: 200}}
                    >
                        <MenuItem value={'Done'}>Fait</MenuItem>
                        <MenuItem value={'notDone'}>Pas fait</MenuItem>
                        <MenuItem value={undefined}>Tout</MenuItem>
                    </Select>
                </SFormControl>
                <SFormControl>
                    <InputLabel id="date-filter">Ordre de Date</InputLabel>
                    <Select
                        labelId="date-filter"
                        value={orderBy}
                        input={<OutlinedInput label="Type-Filter"/>}
                        onChange={handleChangeFilterDateOrder}
                        renderValue={renderValueDateOrder}
                        sx={{width: 200}}
                    >
                        <MenuItem value={Ordering.DATE_ASC}>Croissant</MenuItem>
                        <MenuItem value={Ordering.DATE_DESC}>Décroissant</MenuItem>
                        <MenuItem value={undefined}>Aléatoire</MenuItem>
                    </Select>
                </SFormControl>
                <button onClick={() => setFilterType([TodoTypes.Marketing, TodoTypes.Communication])}>
                    Uniquement les todo business
                </button>
                <button onClick={() => {setFilterType(undefined), setFilterIsDone(undefined), setOrderBy(undefined)}}>
                    Réinitialiser les filtres
                </button>
            </FilterContainer>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                        <TableRow>
                            {TableColumn.map( (e, index) => (
                                <TableCell align={index === 0 ? "left" : "center"} key={e.champs}>
                                    {e.title}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {TodoListResponse.data?.getTodoList?.map(todo => (
                            <StyleTableRow key={todo.id} hover onClick={(event) => navigate(`/detail/${todo.id}`)}>
                                {TableColumn.map( (e, index) => (
                                    <TableCell align={index === 0 ? "left" : "center"} key={e.champs}>
                                        {(typeof todo[e.champs] !== "boolean") ?
                                            todo[e.champs] :
                                            <Checkbox checked={todo[e.champs]} onClick={(event) => event.stopPropagation()} onChange={(event) => updateStatus({ variables: { TodoId: todo.id, NewStatus: event.target.checked } })}/>
                                            }
                                    </TableCell>
                                ))}
                            </StyleTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}