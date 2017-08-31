/* tslint:disable */

declare var Object: any;
export interface AjiOrderProsesInterface {
  "idBarang": number;
  "idSeller": number;
  "idCustomer": number;
  "tanggalOrder": Date;
  "namaBarang": string;
  "jenisBarang": string;
  "harga": string;
  "jumlahBarang": number;
  "totalHarga": string;
  "alamat": string;
  "status": string;
  "payment": string;
  "paymentTot": number;
  "idOrder"?: number;
  "photoBarang"?: string;
}

export class AjiOrderProses implements AjiOrderProsesInterface {
  "idBarang": number;
  "idSeller": number;
  "idCustomer": number;
  "tanggalOrder": Date;
  "namaBarang": string;
  "jenisBarang": string;
  "harga": string;
  "jumlahBarang": number;
  "totalHarga": string;
  "alamat": string;
  "status": string;
  "payment": string;
  "paymentTot": number;
  "idOrder": number;
  "photoBarang": string;
  constructor(data?: AjiOrderProsesInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiOrderProses`.
   */
  public static getModelName() {
    return "AjiOrderProses";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiOrderProses for dynamic purposes.
  **/
  public static factory(data: AjiOrderProsesInterface): AjiOrderProses{
    return new AjiOrderProses(data);
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
      name: 'AjiOrderProses',
      plural: 'AjiOrderProses',
      properties: {
        "idBarang": {
          name: 'idBarang',
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
        "tanggalOrder": {
          name: 'tanggalOrder',
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
        "payment": {
          name: 'payment',
          type: 'string'
        },
        "paymentTot": {
          name: 'paymentTot',
          type: 'number'
        },
        "idOrder": {
          name: 'idOrder',
          type: 'number'
        },
        "photoBarang": {
          name: 'photoBarang',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
