// @ts-ignore
import path from "path";
import GrpcTaskServer from "./service/TaskServer";
import LocalRepository from "./repository/LocalRepository";
import LocalConsoleRepository from "./repository/LocalConsoleRepository";

new GrpcTaskServer(new LocalConsoleRepository()).start()