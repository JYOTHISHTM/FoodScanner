import { UserRepository } from "../infrastructure/user.repository";

export class UserService {
  constructor(private repo = new UserRepository()) {}

  updateProfile(userId: string, data: any) {
    return this.repo.updateProfile(userId, data);
  }

  getUser(userId: string) {
    return this.repo.getUser(userId);
  }
}