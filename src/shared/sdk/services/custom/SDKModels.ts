/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AjiPosting } from '../../models/AjiPosting';
import { AjiAccorder } from '../../models/AjiAccorder';
import { AjiOrder } from '../../models/AjiOrder';
import { Container } from '../../models/Container';
import { AjiOrderProses } from '../../models/AjiOrderProses';
import { AjiChat } from '../../models/AjiChat';
import { AjiChatheader } from '../../models/AjiChatheader';
import { AjiTopup } from '../../models/AjiTopup';
import { AjiUserAuth } from '../../models/AjiUserAuth';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    AjiPosting: AjiPosting,
    AjiAccorder: AjiAccorder,
    AjiOrder: AjiOrder,
    Container: Container,
    AjiOrderProses: AjiOrderProses,
    AjiChat: AjiChat,
    AjiChatheader: AjiChatheader,
    AjiTopup: AjiTopup,
    AjiUserAuth: AjiUserAuth,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
