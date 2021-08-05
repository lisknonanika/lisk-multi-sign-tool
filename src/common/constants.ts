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
