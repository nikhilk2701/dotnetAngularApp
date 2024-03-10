import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';

export function getPaginatedResult<T>(
  params: HttpParams,
  url: string,
  http: HttpClient
) {
  const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
  console.log(params);

  return http.get<T>(url, { observe: 'response', params }).pipe(
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

export function getPaginationHeaders(page: number, itemsPerPage: number) {
  let params = new HttpParams();

  params = params.append('pageNumber', page);
  params = params.append('pageSize', itemsPerPage);

  return params;
}
