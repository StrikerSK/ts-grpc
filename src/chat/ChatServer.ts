import * as grpc from "grpc"
import { UserMessage } from "../proto/chat/chat_pb"
import { IChatServiceServer, ChatServiceService } from "../proto/chat/chat_grpc_pb"
import {PORT} from "../Utils";

class ChatServerImpl implements IChatServiceServer {
    sayHello(call: grpc.ServerUnaryCall<UserMessage>, callback: grpc.sendUnaryData<UserMessage>): void {
        console.log(`Server response: ${call.request.getBody()}`);

        const message = new UserMessage();
        message.setBody("Hello user");

        callback(null, message);
    }
}

function main() {
    const server = new grpc.Server();
    server.addService<IChatServiceServer>(ChatServiceService, new ChatServerImpl());

    console.log(`Listening on ${PORT}`);

    server.bind(`localhost:${PORT}`, grpc.ServerCredentials.createInsecure());
    server.start();
}

main();