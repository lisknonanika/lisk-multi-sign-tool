const fetch = require('node-fetch');
const assetSchemas = require('./assetSchemas.json');

const NETWORK = {
  MAINNET: "0",
  TESTNET: "1"
}
const SERVICE_URL = {
  MAINNET: "",
  TESTNET: "https://testnet-service.lisk.io/api/v2"
}

const bigIntToString = (v) => {
  const result = typeof v === 'string'? v: v.toString();
  if (result.slice(-1) === 'n') return result;
  return result + 'n';
}

const getServiceURL = (network) => {
  return network === NETWORK.MAINNET? SERVICE_URL.MAINNET: SERVICE_URL.TESTNET;
}

const getAssetSchema = (moduleAssetId) => {
  const schemaInfo = assetSchemas[moduleAssetId];
  return schemaInfo? schemaInfo.schema: undefined;
}

const getNetworkIdentifier = async (network) => {
  const res = await fetch(`${getServiceURL(network)}/network/status`);
  const json = await res.json();
  return json.data? json.data.networkIdentifier: undefined;
}

const getAccount = async (network, publicKey) => {
  const res = await fetch(`${getServiceURL(network)}/accounts?publicKey=${publicKey}`);
  const json = await res.json();
  return json.data? json.data[0]: undefined;
}

const convertTransactionObject = (transactionObject) => {
  transactionObject.nonce = BigInt(transactionObject.nonce.replace('n',''));
  transactionObject.fee = BigInt(transactionObject.fee.replace('n',''));
  transactionObject.senderPublicKey = Buffer.from(transactionObject.senderPublicKey, 'hex');
  transactionObject.signatures = transactionObject.signatures.map(signature => Buffer.from(signature, 'hex'));

  switch(`${transactionObject.moduleID}:${transactionObject.assetID}`) {
    case '2:0':
      transactionObject.asset.amount = BigInt(transactionObject.asset.amount.replace('n',''));
      transactionObject.asset.recipientAddress = Buffer.from(transactionObject.asset.recipientAddress, 'hex');
      break;

    case '5:1':
    case '5:2':
      transactionObject.asset.votes = transactionObject.asset.votes.map(vote => {
        return {
          delegateAddress: Buffer.from(vote.delegateAddress, 'hex'),
          amount: BigInt(vote.amount.replace('n',''))
        }
      });
      break;
  }
}

const convertSignedTransaction = (signedTransaction) => {
  console.log(bigIntToString("5n"))
  signedTransaction.id = Buffer.from(signedTransaction.id).toString('hex');
  signedTransaction.nonce = bigIntToString(signedTransaction.nonce);
  signedTransaction.fee = bigIntToString(signedTransaction.fee);

  signedTransaction.senderPublicKey = Buffer.from(signedTransaction.senderPublicKey).toString('hex');
  signedTransaction.signatures = signedTransaction.signatures.map(signature => Buffer.from(signature).toString('hex'));

  switch(`${signedTransaction.moduleID}:${signedTransaction.assetID}`) {
    case '2:0':
      signedTransaction.asset.amount = bigIntToString(signedTransaction.asset.amount);
      signedTransaction.asset.recipientAddress = Buffer.from(signedTransaction.asset.recipientAddress).toString('hex');
      break;

    case '5:1':
    case '5:2':
      signedTransaction.asset.votes = signedTransaction.asset.votes.map(vote => {
        return {
          delegateAddress: Buffer.from(vote.delegateAddress).toString('hex'),
          amount: bigIntToString(vote.amount)
        }
      });
      break;
  }
}

module.exports = {
  getAssetSchema,
  getNetworkIdentifier,
  getAccount,
  convertTransactionObject,
  convertSignedTransaction
}