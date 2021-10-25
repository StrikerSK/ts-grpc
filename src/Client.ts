import * as grpc from "grpc";
import {ChatServiceClient} from "./proto/chat/chat_grpc_pb";
import {PORT} from "./Utils";
import {UserMessage} from "./proto/chat/chat_pb";

const client = new ChatServiceClient(
    `localhost:${PORT}`,
    grpc.credentials.createInsecure(),
);

function sendMessage(): Promise<UserMessage> {
    return new Promise<UserMessage>((resolve, reject) => {
        client.sayHello(new UserMessage().setBody("Hello server"), (err, res) => {
            if (err) {
                console.log(err);
            }

            console.log(res.getBody());
        });
    });
}

sendMessage();