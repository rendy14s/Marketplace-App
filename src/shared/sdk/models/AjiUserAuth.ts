/* tslint:disable */

declare var Object: any;
export interface AjiUserAuthInterface {
  "userauth": string;
  "passauth": string;
  "namaLengkap": string;
  "alamat": string;
  "noTelp": string;
  "jenisAkun": number;
  "tempatLahir": string;
  "tanggalLahir": Date;
  "jenisKelamin": string;
  "bank": string;
  "id"?: number;
  "hakUser"?: string;
  "topup"?: number;
}

export class AjiUserAuth implements AjiUserAuthInterface {
  "userauth": string;
  "passauth": string;
  "namaLengkap": string;
  "alamat": string;
  "noTelp": string;
  "jenisAkun": number;
  "tempatLahir": string;
  "tanggalLahir": Date;
  "jenisKelamin": string;
  "bank": string;
  "id": number;
  "hakUser": string;
  "topup": number;
  constructor(data?: AjiUserAuthInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `AjiUserAuth`.
   */
  public static getModelName() {
    return "AjiUserAuth";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of AjiUserAuth for dynamic purposes.
  **/
  public static factory(data: AjiUserAuthInterface): AjiUserAuth{
    return new AjiUserAuth(data);
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
      name: 'AjiUserAuth',
      plural: 'AjiUserAuths',
      properties: {
        "userauth": {
          name: 'userauth',
          type: 'string'
        },
        "passauth": {
          name: 'passauth',
          type: 'string'
        },
        "namaLengkap": {
          name: 'namaLengkap',
          type: 'string'
        },
        "alamat": {
          name: 'alamat',
          type: 'string'
        },
        "noTelp": {
          name: 'noTelp',
          type: 'string'
        },
        "jenisAkun": {
          name: 'jenisAkun',
          type: 'number'
        },
        "tempatLahir": {
          name: 'tempatLahir',
          type: 'string'
        },
        "tanggalLahir": {
          name: 'tanggalLahir',
          type: 'Date'
        },
        "jenisKelamin": {
          name: 'jenisKelamin',
          type: 'string'
        },
        "bank": {
          name: 'bank',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "hakUser": {
          name: 'hakUser',
          type: 'string'
        },
        "topup": {
          name: 'topup',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
