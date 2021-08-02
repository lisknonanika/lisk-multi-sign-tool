import { assetSchemas } from './assetSchemas';

export const NETWORK = {
  MAINNET: "0",
  TESTNET: "1"
}

const SERVICE_URL = {
  MAINNET: "",
  TESTNET: "https://testnet-service.lisk.io/api/v2"
}

const bigIntToString = (v:any):string => {
  const result = typeof v === 'string'? v: v.toString();
  if (result.slice(-1) === 'n') return result;
  return result + 'n';
}

export const getServiceURL = (network:string):string => {
  return network === NETWORK.MAINNET? SERVICE_URL.MAINNET: SERVICE_URL.TESTNET;
}

export const getAssetSchema = (moduleAssetId:string):any|undefined => {
  const schemaInfo = assetSchemas.find((assetSchema) => assetSchema.moduleAssetId === moduleAssetId);
  return schemaInfo? schemaInfo.schema: undefined;
}

export const getNetworkIdentifier = async (network:string):Promise<string|undefined> => {
  const res = await fetch(`${getServiceURL(network)}/network/status`);
  const json = await res.json();
  return json.data? json.data.networkIdentifier: undefined;
}

export const getAccount = async (network:string, publicKey:string):Promise<any|undefined> => {
  const res = await fetch(`${getServiceURL(network)}/accounts?publicKey=${publicKey}`);
  const json = await res.json();
  return json.data? json.data[0]: undefined;
}

export const convertTransactionObject = (transactionObject:any) => {
  transactionObject.nonce = BigInt(transactionObject.nonce.replace('n',''));
  transactionObject.fee = BigInt(transactionObject.fee.replace('n',''));
  transactionObject.senderPublicKey = Buffer.from(transactionObject.senderPublicKey, 'hex');
  transactionObject.signatures = transactionObject.signatures.map((signature:string) => Buffer.from(signature, 'hex'));

  switch(`${transactionObject.moduleID}:${transactionObject.assetID}`) {
    case '2:0':
      transactionObject.asset.amount = BigInt(transactionObject.asset.amount.replace('n',''));
      transactionObject.asset.recipientAddress = Buffer.from(transactionObject.asset.recipientAddress, 'hex');
      break;

    case '5:1':
    case '5:2':
      transactionObject.asset.votes = transactionObject.asset.votes.map((vote:any) => {
        return {
          delegateAddress: Buffer.from(vote.delegateAddress, 'hex'),
          amount: BigInt(vote.amount.replace('n',''))
        }
      });
      break;
  }
}

export const convertSignedTransaction = (signedTransaction:any) => {
  console.log(bigIntToString("5n"))
  signedTransaction.id = Buffer.from(signedTransaction.id).toString('hex');
  signedTransaction.nonce = bigIntToString(signedTransaction.nonce);
  signedTransaction.fee = bigIntToString(signedTransaction.fee);

  signedTransaction.senderPublicKey = Buffer.from(signedTransaction.senderPublicKey).toString('hex');
  signedTransaction.signatures = signedTransaction.signatures.map((signature:string) => Buffer.from(signature).toString('hex'));

  switch(`${signedTransaction.moduleID}:${signedTransaction.assetID}`) {
    case '2:0':
      signedTransaction.asset.amount = bigIntToString(signedTransaction.asset.amount);
      signedTransaction.asset.recipientAddress = Buffer.from(signedTransaction.asset.recipientAddress).toString('hex');
      break;

    case '5:1':
    case '5:2':
      signedTransaction.asset.votes = signedTransaction.asset.votes.map((vote:any) => {
        return {
          delegateAddress: Buffer.from(vote.delegateAddress).toString('hex'),
          amount: bigIntToString(vote.amount)
        }
      });
      break;
  }
}
