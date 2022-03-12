import sseService from './service';

/**
 * @export
 * @returns {Promise < any[] >}
 */
export async function findAll(): Promise <any> {
    return sseService.findAll();
}