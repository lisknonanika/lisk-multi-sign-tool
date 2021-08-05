import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import './Common.css';
import { SIGN_INFO, NETWORK, getNetworkIdentifier } from '../common';

const SelectNetwork: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [status, setStatus] = useState<string>('0');
  const [loading, showLoading] = useState(false);

  const selectNetwork = async (network:string) => {
    showLoading(true);
    signInfo.network = ''
    signInfo.networkIdentifier = ''
    const identifier = await getNetworkIdentifier(network);
    if (identifier.success) {
      signInfo.network = network;
      signInfo.networkIdentifier = identifier.data;
      showLoading(false);
      setStatus('1');
      return;
    }
    
    showLoading(false);
    await Swal.fire('Error', identifier.message, 'error');
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'accessing Lisk Service...'} duration={10000} />
        {status === '0'? 
          <div className='container'>
            <IonCard>
              <div className="lisk-sticker"><img src='./assets/img/selectnetwork.png' style={{objectPosition: '50% 20%'}}></img></div>
              <div className='ion-card-body'>
                <IonCardHeader>
                  <IonCardTitle>Select Network</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonButton onClick={async() => await selectNetwork(NETWORK.MAINNET)} expand='block' size='large'>Mainnet</IonButton>
                  <IonButton onClick={async() => await selectNetwork(NETWORK.TESTNET)} expand='block' size='large'>Testnet</IonButton>
                </IonCardContent>
              </div>
            </IonCard>
          </div>
        :''}
        {status === '1'?
          <Redirect to='/enterTransaction'></Redirect>
        :''}
      </IonContent>
    </IonPage>
  );
};

export default SelectNetwork;
