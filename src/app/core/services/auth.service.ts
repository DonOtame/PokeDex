import { Injectable } from '@angular/core';
import { NewUser, User, UserEntity } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async login(email: string, password: string, rememberMe: boolean): Promise<void> {
    const users: UserEntity[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);

    if (user === undefined) throw new Error('TOAST.LOGIN.INVALID_CREDENTIALS');

    const { password: _password, ...rest } = user;
    const currentUser: User = rest;

    try {
      if (rememberMe) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      } else {
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
      }
    } catch (error) {
      throw new Error('TOAST.LOGIN.ERROR');
    }
  }

  async register(newUser: NewUser): Promise<void> {
    const users: UserEntity[] = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u) => u.email === newUser.email);

    if (existingUser) {
      throw new Error('TOAST.REGISTER.INVALID_CREDENTIALS');
    }

    const user: UserEntity = {
      id: this.generateId(),
      ...newUser,
    };

    try {
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      throw new Error('TOAST.REGISTER.ERROR');
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('currentUser');
      sessionStorage.removeItem('currentUser');
    } catch (error) {
      throw new Error('TOAST.LOGOUT.ERROR');
    }
  }

  private generateId(): string {
    return (
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
  }
}
