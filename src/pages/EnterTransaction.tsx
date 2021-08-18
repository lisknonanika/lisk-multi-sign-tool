import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonTextarea, IonToggle } from '@ionic/react';
import { validateTransaction } from '@liskhq/lisk-transactions';
import Swal from 'sweetalert2';
import { Header } from '../components';
import { SIGN_INFO, NETWORK, getNetworkIdentifier, getAccount, getAssetSchema, convertTransactionObject, updateSignStatus } from '../common';
import './Common.css';

const EnterTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [status, setStatus] = useState<string>('0');
  const [text, setText] = useState<string>('');
  const [network, setNetwork] = useState<string>('0');
  const [loading, showLoading] = useState(false);

  const startSign = async () => {
    showLoading(true);
    setText(text.trim());
    signInfo.senderAcount = undefined;
    signInfo.transactionString = '';
    if (!text) {
      showLoading(false);
      await Swal.fire('Error', 'Required TransactionString', 'error');
      return;
    }

    const identifier = await getNetworkIdentifier(network);
    if (!identifier.success) {
      showLoading(false);
      await Swal.fire('Error', `Failed to access the Lisk service (${network === NETWORK.MAINNET?'Mainnet':'Testnet'}).`, 'error');
      return;
    }
    signInfo.network = network;
    signInfo.networkIdentifier = identifier.data;

    // parse Transaction
    let transactionObject;
    try {
      transactionObject = JSON.parse(text);
    } catch(err) {
      showLoading(false);
      await Swal.fire('Error', 'Invalid TransactionString. (Must be JSON.)', 'error');
      return;
    }

    if (transactionObject.senderPublicKey === undefined ||
        transactionObject.moduleID === undefined ||
        transactionObject.assetID === undefined) {
      showLoading(false);
      await Swal.fire('Error', 'Invalid TransactionString. (Required params not found.)', 'error');
      return;
    }

    // get senderAccount
    const senderAccount = await getAccount(signInfo.network, transactionObject.senderPublicKey);
    if (!senderAccount.success) {
      showLoading(false);
      await Swal.fire('Error', `Invalid TransactionString. (${senderAccount.message})`, 'error');
      return;
    }
    try {
      if (!senderAccount.data.keys.numberOfSignatures) {
        showLoading(false);
        await Swal.fire('Error', `Invalid TransactionString. (Not MultiSignature Account)`, 'error');
        return;
      }
    } catch(err) {
      showLoading(false);
      await Swal.fire('Error', `Invalid TransactionString. (Not MultiSignature Account)`, 'error');
      return;
    }

    // get assetAchema
    const assetSchema = getAssetSchema(`${transactionObject.moduleID}:${transactionObject.assetID}`);
    if (!assetSchema.success) {
      showLoading(false);
      await Swal.fire('Error', `Invalid TransactionString. (${assetSchema.message})`, 'error');
      return;
    }

    // validate Transaction
    try {
      validateTransaction(assetSchema.data, transactionObject);
    } catch(err) {
      showLoading(false);
      await Swal.fire('Error', 'Invalid TransactionString. (Schema validation error)', 'error');
      return;
    }
    signInfo.senderAcount = senderAccount.data;
    signInfo.transactionString = text;

    if (!updateSignStatus(signInfo)) {
      await Swal.fire('Error', 'Invalid TransactionString.', 'error');
      showLoading(false);
      setStatus("0");
      return;
    }
    showLoading(false);
    setStatus("1");
  }

  return (
    <IonPage>
      <Header type={0} url={''}/>
      <IonContent fullscreen>
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'Checking TransactionString...'} duration={10000} />
        {status === '0'? 
          <div className='container' style={{flexFlow: 'column'}}>
            <IonCard>
              <div className="lisk-sticker"><img src='./assets/img/entertransaction.png' style={{objectPosition: '50% 5%'}}></img></div>
              <div className='ion-card-body'>
                <IonCardHeader>
                  <IonCardTitle>Enter TransactionString</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonTextarea value={text} placeholder='Enter TransactionString' rows={1} autoGrow={true} onIonChange={e => setText(e.detail.value!)}/>
                  <IonButton onClick={async() => await startSign()} expand='block' size='large'>Start Sign</IonButton>
                </IonCardContent>
              </div>
            </IonCard>
            <div className='row-item select-network'>Use Testnet<IonToggle mode={'ios'} onIonChange={(e) => setNetwork(e.detail.checked? NETWORK.TESTNET: NETWORK.MAINNET)}/></div>
          </div>
        :''}
        {status === '1'? <Redirect to='/signTransaction'></Redirect>: ''}
      </IonContent>
    </IonPage>
  );
};

export default EnterTransaction;
