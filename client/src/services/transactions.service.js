import httpService from "./http.service";

const url = `transaction/`;

const transactionsService = {
    get: async () => {
        const { data } = await httpService.get(url);
        return data.content;
    },
    add: async (payload) => {
        const { data } = await httpService.post(url, payload);
        return data.content;
    },
    delete: async (payload) => {
        const { data } = await httpService.delete(`${url}/${payload}`);
        return data.content;
    }
};

export default transactionsService;
