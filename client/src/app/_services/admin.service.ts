import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserWIthRoles() {
    return this.http.get<User[]>(this.baseUrl + 'admin/users-with-roles');
  }

  updateRoles(username: string, roles: String[]) {
    const rolesString = roles.join(',');
    console.log(rolesString);

    var res = this.http.post<string[]>(
      this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + rolesString,
      {}
    );

    console.log(res);
    return res;
  }
}
