import { io } from "socket.io-client";
import { SETTINGS } from "../config/common";

const socket = io(SETTINGS.BASE_API);

export default socket;
