/* tslint:disable */

declare var Object: any;
export interface AjiChatInterface {
  "headerChat": string;
  "fromid": string;
  "toid": string;
  "chat": string;
  "fromname": string;
  "toname": string;
  "id"?: number;
}

export class AjiChat implements AjiChatInterface {
  "headerChat": string;
  "fromid": string;
  "toid": string;
  "chat": string;
  "fromname": string;
  "toname": string;
  "id": number;
  constructor(data?: AjiChatInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiChat`.
   */
  public static getModelName() {
    return "AjiChat";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiChat for dynamic purposes.
  **/
  public static factory(data: AjiChatInterface): AjiChat{
    return new AjiChat(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'AjiChat',
      plural: 'AjiChats',
      properties: {
        "headerChat": {
          name: 'headerChat',
          type: 'string'
        },
        "fromid": {
          name: 'fromid',
          type: 'string'
        },
        "toid": {
          name: 'toid',
          type: 'string'
        },
        "chat": {
          name: 'chat',
          type: 'string'
        },
        "fromname": {
          name: 'fromname',
          type: 'string'
        },
        "toname": {
          name: 'toname',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
