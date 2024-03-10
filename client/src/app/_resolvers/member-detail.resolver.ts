import { ResolveFn } from '@angular/router';
import { Member } from '../_models/member';
import { inject } from '@angular/core';
import { MembersService } from '../_services/members.service';

export const memberDetailResolver: ResolveFn<Member> = (route, state) => {
  const menberService = inject(MembersService);

  return menberService.getMember(route.paramMap.get('username')!);
};
