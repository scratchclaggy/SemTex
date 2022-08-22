type User = {
    id: string;
    password: string;
    email: string;
    type: string;
}

type DatasetPermission = {
    id: string;
    userID: string;
    datasetID: string;
}

type DataSet = {
    id: string;
    instructions: string;
    name: string;
    created: string;
}

type ResponseOption = {
    id: string;
    label: string;
    datasetID: string;
}

type HighlightOption = {
    id: string;
    label: string;
    color: string;
    datasetID: string;
}

type TextSample = {
    id: string;
    body: string;
    datasetID: string;
}

type Highlight = {
    id: string;
    sample: string;
    highlight_optionID: string;
    userResponseID: string;
}

type UserResponse = {
    id: string;
    response: string;
    comments: string;
    userID: string;
    textSampleID: string;
}

export {};