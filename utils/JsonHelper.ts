import path from 'path';
import fs from 'fs';
import { TestData } from '../interface/LoginTestData.interface';
import { TestDataArray } from '../interface/LoginTestDataArray.interface';


export function loadTestData<T extends object>(): T {
    const environment = `${process.env.TEST_EXECUTION_ENV}` || 'qa';
    const directoryPath = path.join(__dirname,`../data/ui-test-data/`, environment);

    const jsonData: T = {} as T;
    fs.readdirSync(directoryPath).forEach(file => {
        if(path.extname(file) === '.json'){
            const filePath = path.join(directoryPath,file);
            const fileContent: T = JSON.parse(fs.readFileSync(filePath,'utf-8'));
            Object.assign(jsonData, fileContent);
        }
    });
    return jsonData;
}