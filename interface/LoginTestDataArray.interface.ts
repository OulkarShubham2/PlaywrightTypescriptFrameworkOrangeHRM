export interface LoginTestDataArray {
    "wrong_usrnm": string;
    "wrong_passw": string;
    "invld_crd_txt": string;
}

export interface TestDataArray {
    LoginTestDataArray?: LoginTestDataArray[];
}