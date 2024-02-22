import {Todo} from "./type.ts";

export const TableColumn : {champs: keyof Todo, title: string}[] = [
    {
        champs: "title",
        title: "Titre",
    },
    {
        champs: "type",
        title: "Catégories",
    },
    {
        champs: "createdAt",
        title: "Date de création",
    },
    {
        champs: "isDone",
        title: "faite",
    }
]