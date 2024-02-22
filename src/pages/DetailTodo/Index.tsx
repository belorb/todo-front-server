import {useMutation, useQuery} from "@apollo/client";
import Loading from "../../components/Loading.tsx";
import ServerError from "../../components/ServerError.tsx";
import {GET_TODO_DETAIL} from "../../graphql/Query/getDetailTodoById.ts";
import {Link, Navigate, useParams} from "react-router-dom";
import {Checkbox, List, ListItem, ListItemText, Typography} from "@mui/material";
import {Todo} from "../../utils/type.ts";
import {UPDATE_TODO_STATUS} from "../../graphql/Mutation/updateTodoStatusById.ts";
import styled from "@emotion/styled";

type Params = {
    id: string
}

const SLink = styled(Link)`
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

    const Todo = useQuery<{getTodoById: Todo}>(GET_TODO_DETAIL, {
        skip: id === undefined,
        variables: { TodoId: id },
    });
    const [updateStatus, UpdateStatusResponse] = useMutation(UPDATE_TODO_STATUS);

    if (!id) return <Navigate to="/"/>
    if (Todo.loading || UpdateStatusResponse.loading) return <Loading/>;
    if (Todo.error || UpdateStatusResponse.error) return <ServerError/>;

    const currentTodo = Todo.data?.getTodoById;

    return (
        <Container>
            <SLink to={"/"}>
                Retour
            </SLink>
            <Typography component={"h1"} variant="h2">
                {Todo.data?.getTodoById?.title}
            </Typography>
            {currentTodo && <List>
                {Object.entries(currentTodo).map(([key, value]) => (
                    <>
                        {typeof value !== "boolean" ? (
                            <ListItem key={key}>
                                <ListItemText>
                                    {`${key} : ${value}`}
                                </ListItemText>
                            </ListItem>
                        ) : (
                            <ListItem key={key}
                                      secondaryAction={
                                          <Checkbox
                                              edge="end"
                                              onChange={(event) => updateStatus({
                                                  variables: {
                                                      TodoId: Todo.data?.getTodoById.id,
                                                      NewStatus: event.target.checked
                                                  }
                                              })}
                                              checked={value}
                                          />}
                            >
                                <ListItemText>
                                    {`${key} : `}
                                </ListItemText>
                            </ListItem>
                        )}
                    </>
                ))}
            </List>}
        </Container>
    )
}