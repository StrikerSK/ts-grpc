// @ts-ignore
import path from "path";
import * as grpc from '@grpc/grpc-js'
import {grpcObject, GRPC_URL} from "../../commons/Utils";

export default new grpcObject.task.TaskService(
    GRPC_URL, grpc.credentials.createInsecure()
)
