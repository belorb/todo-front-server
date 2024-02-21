export type Todo =  {
    id: number
    createdAt: Date
    type: TodoTypes
    isDone: boolean
    text: string
    title: string
}

export enum TodoTypes {
    "RH" = "RH",
    "Tech" = "Tech",
    "Marketing" = "Marketing",
    "Communication" = "Communication"
}

export enum Ordering {
    DATE_DESC = "DATE_DESC",
    DATE_ASC = "DATE_ASC"
}

export type ContextFilterType = {
    orderBy: Ordering | null,
    setOrderBy: (Ordering) => void,
    filterType: TodoTypes[] | null,
    setFilterType: (TodoTypes) => void,
    filterIsDone: boolean | null,
    setFilterIsDone: (boolean) => void
}