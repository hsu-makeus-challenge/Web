import { Injectable } from '@nestjs/common';

export interface User {
    id: string;
    email: string;
    name: string;
  }
  
@Injectable()
export class UserService {
  private users: User[] = []; // 임시 저장소

  // 실제로는 DB를 조회하거나 생성하는 로직이 들어가야 함
  async findOrCreateByEmail(email: string, name: string): Promise<User> {
    let user = await this.findByEmail(email);
    if (!user) {
      user = await this.createUser(email, name);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  async createUser(email: string, name: string): Promise<User> {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name
    };
    this.users.push(newUser);
    return newUser;
  }
}
