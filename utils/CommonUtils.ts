import cryptoJs from 'crypto-js';

export default class CommonUtils {
    private secretKey : string ;
    
    constructor(){
        //this.secretKey = process.env.SECRET_KEY? process.env.SECRET_KEY:"";

        if(process.env.SECRET_KEY){
            this.secretKey = process.env.SECRET_KEY;

        }else{
            throw new Error("Please provide secret key while starting execution.")
        }
    }

    /**
     * 
     * @param data 
     * @returns encrypted data
     */
    public encryptData(data: string){
        const encryptedData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
        console.log(encryptedData);
        return encryptedData;  
    }

    /**
     * Provide decrypted data in string format
     * @param encData 
     * @returns decrypted data
     */
    public decryptData(encData : string){
        const decryptedData = cryptoJs.AES.decrypt(encData, this.secretKey).toString(cryptoJs.enc.Utf8);
        return decryptedData;
    }
}