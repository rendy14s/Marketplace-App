/* tslint:disable */

declare var Object: any;
export interface AjiChatheaderInterface {
  "headerChat": string;
  "createdFirst": string;
  "createdSecond": string;
  "toname": string;
  "fromname": string;
  "id"?: number;
}

export class AjiChatheader implements AjiChatheaderInterface {
  "headerChat": string;
  "createdFirst": string;
  "createdSecond": string;
  "toname": string;
  "fromname": string;
  "id": number;
  constructor(data?: AjiChatheaderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiChatheader`.
   */
  public static getModelName() {
    return "AjiChatheader";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiChatheader for dynamic purposes.
  **/
  public static factory(data: AjiChatheaderInterface): AjiChatheader{
    return new AjiChatheader(data);
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
      name: 'AjiChatheader',
      plural: 'AjiChatheaders',
      properties: {
        "headerChat": {
          name: 'headerChat',
          type: 'string'
        },
        "createdFirst": {
          name: 'createdFirst',
          type: 'string'
        },
        "createdSecond": {
          name: 'createdSecond',
          type: 'string'
        },
        "toname": {
          name: 'toname',
          type: 'string'
        },
        "fromname": {
          name: 'fromname',
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
