export { assetSchemas } from './assetSchemas';

export const NETWORK = {
  MAINNET: '0',
  TESTNET: '1'
}

export const SERVICE_URL = {
  MAINNET: 'https://service.lisk.io/api/v2',
  TESTNET: 'https://testnet-service.lisk.io/api/v2'
}

export interface SIGN_INFO {
  network: string;
  networkIdentifier: string;
  senderAcount: any;
  transactionString: string;
}

export interface SIGN_STATUS {
  members: Array<MEMBER_INFO>;
  signatures: {max:number, signed:number};
  mandatory: {max:number, signed:number};
  optional: {max:number, signed:number};
}

export interface MEMBER_INFO {
  publicKey: string;
  address: string;
  mandatory: boolean;
  signed: boolean;
}