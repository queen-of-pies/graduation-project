import httpService from "./http.service";

const url = `account/`;

const accountsService = {
    get: async () => {
        const { data } = await httpService.get(url);
        return data.content;
    },
    add: async (payload) => {
        const { data } = await httpService.post(url, payload);
        return data.content;
    },
    update: async (payload) => {
        console.log(payload)
        const { data } = await httpService.put(url, payload);
        return data.content;
    },
};

export default accountsService;
