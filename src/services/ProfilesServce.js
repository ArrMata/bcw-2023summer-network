import { AppState } from "../AppState"
import { Profile } from "../models/Profile"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class ProfilesService {
    async getProfile(profileId) {
        try {
            const res = await api.get(`api/profiles/${profileId}`)
            AppState.activeProfile = new Profile(res.data)
        } catch (error) {
            Pop.error(error.message)
        }
    }
}

export const profilesService = new ProfilesService()