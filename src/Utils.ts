import * as protoLoader from "@grpc/proto-loader";
// @ts-ignore
import path from "path";
import * as grpc from "@grpc/grpc-js";
import {ProtoGrpcType} from "./proto/todo/todo";

export const PORT = process.env.PORT || 9000;

const packageDef = protoLoader.loadSync(path.resolve(__dirname, '../src/proto/todo.proto'))
export const grpcObject = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType
