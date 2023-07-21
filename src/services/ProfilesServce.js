import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProfilesService {
    // async getLoggedInProfile() {
    //     const loggedInId = AppState.account.id
    //     const res = await api.get(`api/profiles/${loggedInId}`)
    //     AppState.accountProfile = new Profile(res.data)
    //     logger.log(AppState.account)
    // }
}

export const profilesService = new ProfilesService()