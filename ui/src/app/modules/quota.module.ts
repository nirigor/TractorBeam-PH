export enum QuotaType { Directory, User }

export class Quota {
    constructor(
        public StorageId: number,
        public QuotaId: string,
        public QuotaPath: string, 
        public QuotaType: string, 
        public QuotaUsed: number,
        public QuotaHard: number
    ) { }
}
