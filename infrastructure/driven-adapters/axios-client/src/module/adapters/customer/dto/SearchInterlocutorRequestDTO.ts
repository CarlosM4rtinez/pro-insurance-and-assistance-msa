import {v4 as uuidv4} from "uuid";

export default function buildRequestSearchInterlocutor(data: Record<string, any>) {
    return {
        searchInterlocutorReqBO: {
            applicationId: process.env.API_APPLICATION,
            processId: uuidv4(),
            ...data,
        },
    };
}
