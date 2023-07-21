import { AppState } from "../AppState"
import { Ad } from "../models/Ad"
import { api } from "./AxiosService"

class AdsService {
    async getAds() {
        const res = await api.get('api/ads')
        AppState.ads = res.data.map(adData => new Ad(adData))
    }
}

export const adsService = new AdsService()