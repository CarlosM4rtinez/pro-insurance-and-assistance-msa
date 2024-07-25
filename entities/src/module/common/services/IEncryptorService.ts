export default interface IEncryptorUtil {
    encrypt(data: string): Promise<string>;
    compare(data: string, hash: string): Promise<boolean>;
}
