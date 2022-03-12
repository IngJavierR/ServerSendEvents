import { IsseService } from "./interface";

/**
 * @export
 * @implements {IsseModelService}
 */
const sseService: IsseService = {
    /**
     * @returns {Promise < any[] >}
     * @memberof sseFacade
     */
    async findAll(): Promise<any> {
        return new Promise(() => null);
    }
}

export default sseService;