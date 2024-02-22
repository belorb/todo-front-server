import {Outlet} from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../../assets/sketch-3-todo-list-app-icon-template.png"
import {useState} from "react";
import {Ordering, TodoTypes} from "../../utils/type.ts";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 100vw;
    min-height: 100vh;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    box-sizing: border-box;
`;

const Header = styled.header`
    display: flex;
    margin: 12px;
`;

const Footer = styled.footer`
    margin-top: auto;
`;

const SImage = styled.img`
    width: 100px;
    height: 75px;
`;
export default function Home() {
    const [orderBy, setOrderBy] = useState<Ordering | undefined>(Ordering.DATE_ASC)
    const [filterType, setFilterType] = useState<TodoTypes[] | undefined>()
    const [filterIsDone, setFilterIsDone] = useState<boolean | undefined>()
    return (
        <Container>
            <Header>
                <SImage src={logo} alt="Logo"/>
            </Header>
            <Outlet context={{orderBy, setOrderBy, filterType, setFilterType, filterIsDone, setFilterIsDone}}/>
            <Footer>
                <p>Réalisé pour l'entretien technique de dayOne</p>
            </Footer>
        </Container>
    )
}