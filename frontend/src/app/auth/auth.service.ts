import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
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
          localStorage.setItem('logged_user', JSON.stringify(this.loggedUser));
          resolve(user);
        }
      }
      reject('Credenciales inválidas');
    });
  }

  public get user() {
    return this.loggedUser;
  }

  public signOut(): void {
    this.loggedUser = null;
    localStorage.removeItem('logged_user');
    this.router.navigateByUrl('/login');
  }

  public isAuthenticated(): boolean {
    this.getUserFromStorage();
    return this.loggedUser != null;
  }

  public hasRole(role: string): boolean {
    return this.isAuthenticated() && this.loggedUser.roles.includes(role);
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

  private getUserFromStorage(): void {
    if(this.loggedUser == null) {
      const loggedUserStr = localStorage.getItem('logged_user');
      if(loggedUserStr) {
        this.loggedUser = JSON.parse(loggedUserStr);
      }
    }
  }

}
