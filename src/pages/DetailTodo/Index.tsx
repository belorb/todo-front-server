import {useMutation, useQuery} from "@apollo/client";
import Loading from "../../components/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import {GET_TODO_DETAIL} from "../../graphql/Query/getDetailTodoById.ts";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {Checkbox, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Todo} from "../../utils/type.ts";
import {UPDATE_TODO_STATUS} from "../../graphql/Mutation/updateTodoStatusById.ts";
import {GET_TODO_LIST} from "../../graphql/Query/getAllTodo.ts";
import styled from "@emotion/styled";

interface Params {
    id: number
}

const SButton = styled.button`
    align-self: flex-start;
    margin-left: 24px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;
export default function DetailTodo() {
    const { id } = useParams<Params>();
    const navigate = useNavigate();

    if (!id) return <Navigate to="/"/>

    const Todo = useQuery<{getTodoById: Todo}>(GET_TODO_DETAIL, {
        variables: { TodoId: id },
    });
    const [updateStatus, UpdateStatusResponse] = useMutation(UPDATE_TODO_STATUS, {
        refetchQueries: [GET_TODO_LIST],
    });

    if (Todo.loading || UpdateStatusResponse.loading) return <Loading/>;
    if (Todo.error || UpdateStatusResponse.error) return <ServerError/>;

    return (
        <Container>
            <SButton onClick={() => navigate("/")}>
                Retour
            </SButton>
            <Typography component={"h1"} variant="h2">
                {Todo.data?.getTodoById?.title}
            </Typography>
            <List>
                {Object.keys(Todo.data?.getTodoById).map(e => (
                    <>
                        {typeof Todo.data?.getTodoById[e] !== "boolean" ? (
                            <ListItem key={e}>
                                <ListItemText>
                                    {`${e} : ${Todo.data?.getTodoById[e]}`}
                                </ListItemText>
                            </ListItem>
                        ) : (
                            <ListItem key={e}
                                      secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            onChange={(event) => updateStatus({ variables: { TodoId: Todo.data?.getTodoById.id, NewStatus: event.target.checked } })}
                                            checked={Todo.data?.getTodoById[e]}
                                        />}
                            >
                                <ListItemText>
                                    {`${e} : `}
                                </ListItemText>
                            </ListItem>
                        )}
                    </>
                ))}
            </List>
        </Container>
    )
}