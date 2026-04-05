// application/scan.service.ts
import { HistoryRepository } from "../infrastructure/history.repository";



export class HistoryService {
    private repo = new HistoryRepository();

    async saveScan(data: any) {
        return await this.repo.create(data);
    }

    async getHistory(userId: string, query: any) {
        return await this.repo.findAll(userId, query);
    }



}