import { IsseService } from "./interface";
import sse from "../../models/sse.model";
import * as Kafka from "../../config/stream/kafka"

/**
 * @export
 * @implements {IsseModelService}
 */
const sseService: IsseService = {
    /**
     * @returns {Promise < any[] >}
     * @memberof sseFacade
     */
    async findAll(): Promise<any[]> {
        // Para enviar un mensaje a kafka
        // await Kafka.send("test", 'Hello');
        return sse.findAll();
    }
}

export default sseService;