import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import * as path from "path";
import {ProtoGrpcType} from "../proto/chat";

const PROTO_PATH = "../proto/chat.proto";
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH));
export const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType

export const chatPackage = grpcObj.chat;
export const PORT = 9000;