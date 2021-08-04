import React, { Dispatch, SetStateAction, useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonTextarea } from '@ionic/react';
import { validateTransaction } from '@liskhq/lisk-transactions';
import Header from '../components/Header';
import './Common.css';
import { SIGN_INFO, getAccount, getAssetSchema, convertTransactionObject } from '../common';

const EnterTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [status, setStatus] = useState<string>("0");
  const [text, setText] = useState<string>("");
  const [loading, showLoading] = useState(false);

  const startSign = async () => {
    showLoading(true);
    setText(text.trim());
    signInfo.senderAcount = undefined;
    signInfo.transactionString = "";
    if (!text) {
      showLoading(false);
      alert("error");
      return;
    }

    // parse Transaction
    let transactionObject;
    try {
      transactionObject = JSON.parse(text);
    } catch(err) {
      showLoading(false);
      alert("Invalid TransactionString. (Must be JSON.)");
      return;
    }

    if (transactionObject.senderPublicKey === undefined ||
        transactionObject.moduleID === undefined ||
        transactionObject.assetID === undefined) {
      showLoading(false);
      alert("Invalid TransactionString. (Require params not found)");
      return;
    }

    // get senderAccount
    const senderAccount = await getAccount(signInfo.network, transactionObject.senderPublicKey);
    if (!senderAccount.success) {
      showLoading(false);
      alert(`Invalid TransactionString. (${senderAccount.message})`);
      return;
    }

    // get assetAchema
    const assetSchema = getAssetSchema(`${transactionObject.moduleID}:${transactionObject.assetID}`);
    if (!assetSchema.success) {
      showLoading(false);
      alert(`Invalid TransactionString. (${assetSchema.message})`);
      return;
    }

    // validate Transaction
    convertTransactionObject(transactionObject);
    try {
      validateTransaction(assetSchema, transactionObject);
    } catch(err) {
      showLoading(false);
      alert("Invalid TransactionString. (Schema validation error)");
      return;
    }
    signInfo.senderAcount = senderAccount.data;
    signInfo.transactionString = text;
    showLoading(false);
    alert("OK");
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'Checking TransactionString...'} duration={10000} />
        {status === "0"? 
          <div className="container">
            <IonCard>
              <img src="./assets/img/home.png"></img>
              <IonCardHeader>
                <IonCardTitle>Enter TransactionString</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonTextarea value={text} placeholder="Enter TransactionString" rows={1} autoGrow={true} autofocus={true} onIonChange={e => setText(e.detail.value!)}/>
                <IonButton onClick={async() => await startSign()} expand="block" size="large">Start Sign</IonButton>
              </IonCardContent>
            </IonCard>
          </div>
        :""}
        {status === "1"?
          <Redirect to="/enterTransaction"></Redirect>
        :""}
      </IonContent>
    </IonPage>
  );
};

export default EnterTransaction;
