import CommonUtils from "../utils/CommonUtils";
import CommonApiUtils from "../utils/CommonApiUtils";
import {test as baseTest} from '../fixtures/pom-fixture'
import { request } from "@playwright/test";
import { loadTestData } from "../utils/JsonHelper";
import { TestData } from "../interface/LoginTestData.interface";


type CommonFixtureType = {
    commonUtils : CommonUtils;
    commonApiUtils : CommonApiUtils;
    testData : TestData;
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils: async({ },use)=>{
        use(new CommonUtils())
    },

    commonApiUtils: async({request },use)=>{
        use(new CommonApiUtils(request))
    },

    testData: async({},use)=>{
        const data = await loadTestData();
        use(data);
    }
})