/* tslint:disable */

declare var Object: any;
export interface AjiTopupInterface {
  "idCustomer": string;
  "namaCustomer": string;
  "photo": string;
  "nominal": string;
  "toBank": string;
  "status": string;
  "id"?: number;
}

export class AjiTopup implements AjiTopupInterface {
  "idCustomer": string;
  "namaCustomer": string;
  "photo": string;
  "nominal": string;
  "toBank": string;
  "status": string;
  "id": number;
  constructor(data?: AjiTopupInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiTopup`.
   */
  public static getModelName() {
    return "AjiTopup";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiTopup for dynamic purposes.
  **/
  public static factory(data: AjiTopupInterface): AjiTopup{
    return new AjiTopup(data);
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
      name: 'AjiTopup',
      plural: 'AjiTopups',
      properties: {
        "idCustomer": {
          name: 'idCustomer',
          type: 'string'
        },
        "namaCustomer": {
          name: 'namaCustomer',
          type: 'string'
        },
        "photo": {
          name: 'photo',
          type: 'string'
        },
        "nominal": {
          name: 'nominal',
          type: 'string'
        },
        "toBank": {
          name: 'toBank',
          type: 'string'
        },
        "status": {
          name: 'status',
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
