export enum StorageType { PowerScale, NetApp }

export class Storage {
    constructor(
        public StorageId: number, 
        public StorageName: string, 
        public StorageType: StorageType,
        public StorageHostname: string,
        public StorageUsername: string,
        public StoragePassword: string,
        public StoragePort: number
    ) { }
}