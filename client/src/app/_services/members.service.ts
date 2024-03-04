import { AccountService } from './account.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberChche = new Map();
  userParams: UserParams | undefined;
  user: User | undefined;
  constructor(private http: HttpClient, private account: AccountService) {
    this.account.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) {
          this.userParams = new UserParams(user);
          this.user = user;
        }
      },
    });
  }

  getUserParams() {
    return this.userParams;
  }

  setUserParams(params: UserParams) {
    this.userParams = params;
  }

  resetUserPrams() {
    if (this.user) {
      this.userParams = new UserParams(this.user);
      return this.userParams;
    }
    return;
  }

  getMembers(userParams: UserParams) {
    console.log(this.memberChche);
    const response = this.memberChche.get(Object.values(userParams).join('-'));

    if (response) return of(response);
    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge);
    params = params.append('maxAge', userParams.maxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      params,
      this.baseUrl + 'users'
    ).pipe(
      map((response) => {
        this.memberChche.set(Object.values(userParams).join('-'), response);
        return response;
      })
    );
  }

  private getPaginatedResult<T>(params: HttpParams, url: string) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response) => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }

        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(page: number, itemsPerPage: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);

    return params;
  }

  getMember(username: string) {
    const member = [...this.memberChche.values()]
      .reduce((arr, ele) => arr.concat(ele.result), [])
      .find((member: Member) => member.userName === username);

    if (member) return of(member);
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photId);
  }

  addLike(username: string) {
    var res = this.http.post(this.baseUrl + 'likes/' + username, {});
    console.log(username);
    return res;
  }

  getLikes(predicate: string) {
    return this.http.get<Member[]>(
      this.baseUrl + 'likes?predicate=' + predicate
    );
  }
}
