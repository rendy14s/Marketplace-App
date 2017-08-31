/* tslint:disable */

declare var Object: any;
export interface AjiPostingInterface {
  "idBarang"?: number;
  "idSeller": number;
  "createTanggal": Date;
  "namaBarang": string;
  "jenisBarang": string;
  "photo": string;
  "deskripsi": string;
  "harga": string;
  "reputasi"?: number;
  "role": string;
  "stock": string;
}

export class AjiPosting implements AjiPostingInterface {
  "idBarang": number;
  "idSeller": number;
  "createTanggal": Date;
  "namaBarang": string;
  "jenisBarang": string;
  "photo": string;
  "deskripsi": string;
  "harga": string;
  "reputasi": number;
  "role": string;
  "stock": string;
  constructor(data?: AjiPostingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiPosting`.
   */
  public static getModelName() {
    return "AjiPosting";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiPosting for dynamic purposes.
  **/
  public static factory(data: AjiPostingInterface): AjiPosting{
    return new AjiPosting(data);
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
      name: 'AjiPosting',
      plural: 'AjiPostings',
      properties: {
        "idBarang": {
          name: 'idBarang',
          type: 'number'
        },
        "idSeller": {
          name: 'idSeller',
          type: 'number'
        },
        "createTanggal": {
          name: 'createTanggal',
          type: 'Date'
        },
        "namaBarang": {
          name: 'namaBarang',
          type: 'string'
        },
        "jenisBarang": {
          name: 'jenisBarang',
          type: 'string'
        },
        "photo": {
          name: 'photo',
          type: 'string'
        },
        "deskripsi": {
          name: 'deskripsi',
          type: 'string'
        },
        "harga": {
          name: 'harga',
          type: 'string'
        },
        "reputasi": {
          name: 'reputasi',
          type: 'number'
        },
        "role": {
          name: 'role',
          type: 'string'
        },
        "stock": {
          name: 'stock',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
