import { Injectable } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import {data} from "./data"
import User from"./helper/getUserComponents"

@Injectable()
export class AppService {
  getAdmin(token:string,scopes:string[]) {
    const decision=this.getDecodedToken(token,scopes)
    const user=new User(data.admin,decision.isShowSalary,decision.isShowComponentOne,decision.isShowSecondComponent)
    return user.getComponents();
  }
  getManager(token:string,scopes:string[]) {
    const decision=this.getDecodedToken(token,scopes)
    const user=new User(data.manager,decision.isShowSalary,decision.isShowComponentOne,decision.isShowSecondComponent)
    return user.getComponents();
  }

  getDeveloper(token:string,scopes:string[]) {
    const decision=this.getDecodedToken(token,scopes)
    const user=new User(data.developer,decision.isShowSalary,decision.isShowComponentOne,decision.isShowSecondComponent)
    return user.getComponents();
  }
  getDecodedToken(token: string,info:string[]) {
    const decoded:any=jwt_decode(token);
    let decision={
      isShowSalary:decoded?.permissions.includes(info[0]),
      isShowComponentOne:decoded?.permissions.includes(info[1]),
      isShowSecondComponent:decoded?.permissions.includes(info[2])
    }
    
    return decision
  }

}
