import * as EXCEL from 'xlsx';
import fs from 'fs';

interface TestRecord {
    username:string,
    password:string,
    invalidCredText:string,
}

export function readExcelFile(filePath:string){
    const file = fs.readFileSync(filePath);

    const workbook = EXCEL.read(file);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rawData = EXCEL.utils.sheet_to_json(sheet , {header:1} );

    const records = rawData.slice(1).map((column: any )=>({
        username:column[0],
        password:column[1],
        invalidCredText:column[2],
    }))

    return records;
}