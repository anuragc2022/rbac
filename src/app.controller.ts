import { Controller, Get, Post, SetMetadata, UseGuards,Header, Headers, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthorizationGuard } from './authorization/authorization.guard';
import { PermissionsGuard } from './authorization/permissions/permissions.guard';
import { Permissions } from './authorization/permissions/permissions.decorator';
import { Roles } from './authorization/permissions/roles.decorator';
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appservice: AppService) {}

  // @UseGuards(AuthorizationGuard, PermissionsGuard)
  // @Post('/api/permissions')
  // getPermissions() {
  //   return this.appService.getPermissions();
  // }

  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Roles(['read:admin'])
  @Get('/api/messages/admin')
  @Header("content-type", "application/json")
  getAdmin(@Req() req: Request) {
  //  let decision =this.appservice.getDecodedToken(req.headers.authorization.replace('Bearer',''),["read:display_admin_salary","read:admin_component_1","read:admin_component_2"])
   
    return this.appservice.getAdmin(req.headers.authorization.replace('Bearer',''),["read:display_admin_salary","read:admin_component_1","read:admin_component_2"]);
  }
  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Roles(['read:manager'])
  @Get('/api/messages/manager')
  getManager(@Req() req: Request) {
    return this.appservice.getManager(req.headers.authorization.replace('Bearer',''),["read:display_manager_salary","read:manager_component_1","read:manager_component_2"]);
  }

  @UseGuards(AuthorizationGuard, PermissionsGuard)
  @Roles(['read:developer'])
  @Get('/api/messages/developer')
  getDeveloper(@Req() req: Request) {
    return this.appservice.getDeveloper(req.headers.authorization.replace('Bearer',''),["read:display_developer_salary","read:developer_component_1","read:developer_component_2"]);
  }
}
