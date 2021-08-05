import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonSlides, IonSlide, IonFooter, IonText } from '@ionic/react';
import { Hashicon } from '@emeraldpay/hashicon-react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import './Common.css';
import { SIGN_INFO, getAccount, getAssetSchema, convertTransactionObject } from '../common';

const SignTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [status, setStatus] = useState<string>('0');
  const [text, setText] = useState<string>('');
  const [loading, showLoading] = useState(false);

  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  const sign = async () => {
    await Swal.fire('Success', '', 'success');
  }

  return (
    <IonPage>
      <Header />
      <IonFooter className="signed-info">
        <div><IonText>Number of Signatures: 1 / 2</IonText></div>
        <div><IonText>Mandantory: 0 / 1</IonText>&nbsp;&nbsp;&nbsp;<IonText>Optional: 1 / 2</IonText></div>
      </IonFooter>
      <IonContent fullscreen >
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'Checking TransactionString...'} duration={10000} />
        {status === '0'? 
          <div className='container'>
            <IonSlides pager={true} options={slideOpts}>
              <IonSlide>
                <IonCard>
                  <div className="lisk-address-icon"><Hashicon value="69561bcc5c764dc24f2d1b53472cb10e3ea42753906b4fb9ae5981e1605d43ed" size={500} /></div>
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
              </IonSlide>

              <IonSlide>
                <IonCard>
                  <div className="lisk-address-icon"><Hashicon value="ac879b1e1fdb58d3c1c1be5bfb9dc4b772e0d96167ec137aef4a15d10fc9f4ff" size={500} /></div>
                  <div className='lisk-address'>lskaaaejcz2o4nk457s8exboadfv4ddtuh6w2amgv</div>
                  <div className='ion-card-body'>
                    <IonCardHeader>
                      <IonCardSubtitle>- Optional Key -</IonCardSubtitle>
                      <IonCardTitle>Enter Passphrase</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonInput type="password" placeholder="Enter Passphrase"/>
                      <IonButton onClick={async() => await sign()} expand='block' size='large'>Sign</IonButton>
                    </IonCardContent>
                  </div>
                </IonCard>
              </IonSlide>
            </IonSlides>
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
