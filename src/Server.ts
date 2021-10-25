import * as grpc from "@grpc/grpc-js"
import {chatPackage, PORT} from "./Utils";
import {ChatServiceDefinition, ChatServiceHandlers} from "../proto/chat/ChatService"
import {MethodDefinition} from "@grpc/grpc-js";
import {UserMessage, UserMessage__Output} from "../proto/chat/UserMessage";

function main() {
    const server = getServer();

    server.bindAsync(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure(), ((err, port) => {
        if (err) {
            console.log(err);
            return;
        }

        console.log(`Server running on port ${PORT}`);
        server.start();
    }));
}

function getServer() {
    const server = new grpc.Server();
    server.addService(chatPackage.ChatService.service, {
        "SayHello": (req, res) => {
            console.log(req, res)
        }
    } as ChatServiceHandlers);

    return server;
}

main();