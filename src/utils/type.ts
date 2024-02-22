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
    orderBy: Ordering | undefined,
    setOrderBy: (arg0: Ordering | undefined) => void,
    filterType: TodoTypes[] | undefined,
    setFilterType: (arg0 : TodoTypes[] | undefined) => void,
    filterIsDone: boolean | undefined,
    setFilterIsDone: (arg0 : boolean | undefined) => void
}