// infra/scan.repository.ts
import { HistoryModel } from "../domain/history.model";

export class HistoryRepository {
  async create(data: any) {
    return await HistoryModel.create(data);
  }

  async findAll(userId: string, query: any) {
    const { page = 1, sort, date } = query;

    const limit = 5;
    const skip = (page - 1) * limit;

    let filter: any = { userId };

    // filter by date
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.createdAt = { $gte: start, $lte: end };
    }

    // sorting
    let sortOption: any = { createdAt: -1 };

    if (sort === "az") sortOption = { name: 1 };
    if (sort === "za") sortOption = { name: -1 };
    if (sort === "score") sortOption = { score: -1 };

    const scans = await HistoryModel.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await HistoryModel.countDocuments(filter);

    return {
      scans,
      total,
      page,
      pages: Math.ceil(total / limit)
    };
  }
}