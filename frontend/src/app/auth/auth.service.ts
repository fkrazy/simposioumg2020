import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {IUser} from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: IUser = null;
  private users: IUser[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    http.get('assets/mock/users.json')
      .subscribe((users: IUser[]) => {
        this.users = users;
      });
  }

  public signIn(username: string, password: string): Promise<IUser> {
    return new Promise<IUser>((resolve, reject) => {

      const user = this.users.find(u => u.username === username);
      if(user) {
        if(user.password === password) {
          this.loggedUser = user;
          resolve(user);
        }
      }
      reject('Credenciales inválidas');
    });
  }

  public signOut(): void {
    this.loggedUser = null;
    this.router.navigateByUrl('/');
  }

  public isAuthenticated(): boolean {
    return this.loggedUser != null;
  }

  public hasRole(role: string): boolean {
    return this.loggedUser != null && this.loggedUser.roles.includes(role);
  }

  public isStaff(): boolean {
    return this.hasRole('STAFF');
  }

  public isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  public isAsistente(): boolean {
    return this.hasRole('ASISTENTE');
  }

  public isEstudiante(): boolean {
    return this.hasRole('ESTUDIANTE');
  }

}
