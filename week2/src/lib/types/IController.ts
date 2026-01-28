export interface IController {
    url: string, 
    method: string,
    execute: () => void,
    validate?: () => void
}