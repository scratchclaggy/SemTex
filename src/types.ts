export
type User = {
    id: string;
    password: string;
    email: string;
    type: string;
}

export
type DatasetPermission = {
    id: string;
    userID: string;
    datasetID: string;
}

export
type DataSet = {
    id: string;
    instructions: string;
    name: string;
    created: string;
}

export
type ResponseOption = {
    id: string;
    label: string;
    datasetID: string;
}

export
type HighlightOption = {
    id: string;
    label: string;
    color: string;
    datasetID: string;
}

export
type TextSample = {
    id: string;
    body: string;
    datasetID: string;
}

export
type Highlight = {
    id: string;
    sample: string;
    highlightOptionID: string;
    userResponseID: string;
}

export
type UserResponse = {
    id: string;
    response: string;
    comments: string;
    userID: string;
    textSampleID: string;
}