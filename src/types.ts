type User = {
    id: "uuid";
    password: "varchar[40]";
    email: "varchar[50]";
    type: "varchar[50]";
}

type DatasetPermission = {
    id: "uuid";
    userID: "uuid";
    datasetID: "uuid";
}

type DataSet = {
    id: "uuid";
    instructions: "varchar[1000]";
    name: "varchar[50]";
    created: "date";
}

type ResponseOption = {
    id: "uuid";
    label: "varchar[50]";
    datasetID: "uuid";
}

type HighlightOption = {
    id: "uuid";
    label: "varchar[50]";
    color: "varchar[50]";
    datasetID: "uuid";
}

type TextSample = {
    id: "uuid";
    body: "text";
    datasetID: "uuid";
}

type Highlight = {
    id: "uuid";
    sample: "varchar[50]";
    highlight_optionID: "uuid";
    userResponseID: "uuid";
}

type UserResponse = {
    id: "uuid";
    response: "varchar[50]";
    comments: "text";
    userID: "uuid";
    textSampleID: "uuid";
}

export {};