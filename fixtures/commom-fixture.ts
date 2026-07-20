import CommonUtils from "../utils/CommonUtils";
import CommonApiUtils from "../utils/CommonApiUtils";
import {test as baseTest} from '../fixtures/pom-fixture'
import { request } from "@playwright/test";


type CommonFixtureType = {
    commonUtils : CommonUtils
    commonApiUtils : CommonApiUtils
}

export const test = baseTest.extend<CommonFixtureType>({
    commonUtils: async({ },use)=>{
        use(new CommonUtils())
    },

    commonApiUtils: async({request },use)=>{
        use(new CommonApiUtils(request))
    }
})