export interface LoginTestData {
    "wrong_usrnm": string;
    "wrong_passw": string;
    "invld_crd_txt": string;
}

export interface TestData {
    LoginTestData?: LoginTestData;
}