/* tslint:disable */

declare var Object: any;
export interface AjiOrderInterface {
  "idOrder"?: number;
  "idBarang": number;
  "idSeller": number;
  "idCustomer": number;
  "tanggalOrder": Date;
  "namaBarang": string;
  "bank"?: string;
  "photoBarang"?: string;
  "jenisBarang": string;
  "harga": string;
  "jumlahBarang": number;
  "totalHarga": string;
  "alamat": string;
  "status": string;
  "payment": string;
  "paymentTot": number;
}

export class AjiOrder implements AjiOrderInterface {
  "idOrder": number;
  "idBarang": number;
  "idSeller": number;
  "idCustomer": number;
  "tanggalOrder": Date;
  "namaBarang": string;
  "bank": string;
  "photoBarang": string;
  "jenisBarang": string;
  "harga": string;
  "jumlahBarang": number;
  "totalHarga": string;
  "alamat": string;
  "status": string;
  "payment": string;
  "paymentTot": number;
  constructor(data?: AjiOrderInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiOrder`.
   */
  public static getModelName() {
    return "AjiOrder";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiOrder for dynamic purposes.
  **/
  public static factory(data: AjiOrderInterface): AjiOrder{
    return new AjiOrder(data);
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
      name: 'AjiOrder',
      plural: 'AjiOrders',
      properties: {
        "idOrder": {
          name: 'idOrder',
          type: 'number'
        },
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
        "bank": {
          name: 'bank',
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
        "payment": {
          name: 'payment',
          type: 'string'
        },
        "paymentTot": {
          name: 'paymentTot',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
