import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react';
import { Hashicon } from '@emeraldpay/hashicon-react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import './Common.css';
import { SIGN_INFO, getAccount, getAssetSchema, convertTransactionObject } from '../common';

const SignTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [status, setStatus] = useState<string>('0');
  const [text, setText] = useState<string>('');
  const [loading, showLoading] = useState(false);

  const sign = async () => {
    await Swal.fire('Success', '', 'success');
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'Checking TransactionString...'} duration={10000} />
        {status === '0'? 
          <div className='container'>
            <IonCard>
              <Hashicon value="69561bcc5c764dc24f2d1b53472cb10e3ea42753906b4fb9ae5981e1605d43ed" size={500} />
              <div className='lisk-address'>lskysdevwuzkpjav7q8umak8nn68n5sd6xx5j7cys</div>
              <div className='ion-card-body'>
                <IonCardHeader>
                  <IonCardSubtitle>- Mandantory Key -</IonCardSubtitle>
                  <IonCardTitle>Enter Passphrase</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonInput type="password" placeholder="Enter Passphrase"/>
                  <IonButton onClick={async() => await sign()} expand='block' size='large'>Sign</IonButton>
                </IonCardContent>
              </div>
            </IonCard>
          </div>
        :''}
        {status === '1'?
          <Redirect to='/selectNetwork'></Redirect>
        :''}
      </IonContent>
    </IonPage>
  );
};

export default SignTransaction;
