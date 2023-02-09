import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { PlayerAudio, Podcast } from './cast';
const Api = axios.create({
    baseURL: "https://api.letstalkmd.net/api/v1",
    headers: { 'Content-Type': 'application/json' },
})
export interface PodcastRequest {
    limit?: number;
    genre?: string; author?: string;
    page: number;
}

class PodcastsApi {
    api: AxiosInstance;
    constructor(api: AxiosInstance) {
        this.api = api;
    }

    async getPodcasts(options: PodcastRequest = {limit: 10, page: 0}): Promise<Podcast[]> {
        let ret: AxiosResponse<Podcast[]>;
        try {
            ret = await this.api.get("open/load-podcasts", {
                params: options
            })
            return ret.data;
        }
        catch (err) {
            throw new Error("Error while fetching");

        }


    }

    async addPodCast(rss: string): Promise<Podcast> {
        let ret: AxiosResponse<Podcast>;
        try {
            ret = await this.api.post("/podcasts", {
                body: {
                    rss
                }
            })
            return ret.data;
        }
        catch (err) {
            throw new Error("Error while adding");

        }


    }

    async getAudio(rss: string, limit = 10, page = 1): Promise<PlayerAudio[]> {
        let ret: AxiosResponse<PlayerAudio[]>;
        try {
            ret = await this.api.get('open/load-audio', {
                params: {
                    rss, limit, page
                }
            }) 
            return ret.data;
        }
        catch (err) {
            throw new Error("Error while adding");

        }

    }
}


export const PodcastsApiInstance = new PodcastsApi(Api);
