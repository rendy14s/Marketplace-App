/* tslint:disable */

declare var Object: any;
export interface AjiAccorderInterface {
  "idAcc"?: number;
  "idOrder": number;
  "idSeller": number;
  "idCustomer": number;
  "tanggalAcc": Date;
  "namaBarang": string;
  "photoBarang"?: string;
  "jenisBarang": string;
  "harga": string;
  "jumlahBarang": number;
  "totalHarga": string;
  "alamat": string;
  "status": string;
}

export class AjiAccorder implements AjiAccorderInterface {
  "idAcc": number;
  "idOrder": number;
  "idSeller": number;
  "idCustomer": number;
  "tanggalAcc": Date;
  "namaBarang": string;
  "photoBarang": string;
  "jenisBarang": string;
  "harga": string;
  "jumlahBarang": number;
  "totalHarga": string;
  "alamat": string;
  "status": string;
  constructor(data?: AjiAccorderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiAccorder`.
   */
  public static getModelName() {
    return "AjiAccorder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiAccorder for dynamic purposes.
  **/
  public static factory(data: AjiAccorderInterface): AjiAccorder{
    return new AjiAccorder(data);
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
      name: 'AjiAccorder',
      plural: 'AjiAccorders',
      properties: {
        "idAcc": {
          name: 'idAcc',
          type: 'number'
        },
        "idOrder": {
          name: 'idOrder',
          type: 'number'
        },
        "idSeller": {
          name: 'idSeller',
          type: 'number'
        },
        "idCustomer": {
          name: 'idCustomer',
          type: 'number'
        },
        "tanggalAcc": {
          name: 'tanggalAcc',
          type: 'Date'
        },
        "namaBarang": {
          name: 'namaBarang',
          type: 'string'
        },
        "photoBarang": {
          name: 'photoBarang',
          type: 'string'
        },
        "jenisBarang": {
          name: 'jenisBarang',
          type: 'string'
        },
        "harga": {
          name: 'harga',
          type: 'string'
        },
        "jumlahBarang": {
          name: 'jumlahBarang',
          type: 'number'
        },
        "totalHarga": {
          name: 'totalHarga',
          type: 'string'
        },
        "alamat": {
          name: 'alamat',
          type: 'string'
        },
        "status": {
          name: 'status',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
