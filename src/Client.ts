import {grpcObj, PORT} from "./Utils";
import * as grpc from "grpc";

const client = new grpcObj.chat.ChatService(
    `localhost:${PORT}`, grpc.credentials.createInsecure()
)

const deadline = new Date()
deadline.setSeconds(deadline.getSeconds() + 5)

client.waitForReady(deadline, (error => {
    if (error) {
         console.log(error)
        return
    }

    onClientReady();
}))

function onClientReady() {
    client.sayHello({body: "Hello world"}, ((error, result) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(result);
    }))
}

onClientReady();