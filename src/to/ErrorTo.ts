/**
 * @export
 * @class ErrorTO
 *
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      properties:
 *        errorCode:
 *          type: string
 *          description: Código de error de negocio
 *          example: 10
 *        errorMessage:
 *          type: string
 *          description: Error de sistema
 *          example: Null pointer
 *        userError:
 *          type: string
 *          description: Human readable error
 *          example: No se encontró información
 *        info:
 *          type: string
 *          description: Información sobre solución del error
 *          example: http://info.com
 */
export class ErrorTo {
    errorCode: string;
    errorMessage: string;
    userError: string;
    info: string;

    constructor(errorCode: string, errorMessage: string, userError: string, info: string) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.userError = userError;
        this.info = info;
    }
}