import React, { Dispatch, SetStateAction, useState } from 'react';
import { IonLoading, IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import Header from '../components/Header';
import './Common.css';
import { NETWORK_INFO, NETWORK, getNetworkIdentifier } from '../common';
import { Redirect } from 'react-router';

const SelectNetwork: React.FC<{setNetworkInfo:Dispatch<SetStateAction<NETWORK_INFO>>}> = ({setNetworkInfo}) => {

  const [status, setStatus] = useState<string>("0");
  const [loading, showLoading] = useState(false);

  const selectNetwork = async (type:string) => {
    showLoading(true);
    setNetworkInfo({type:"", identifier:""});
    const identifier = await getNetworkIdentifier(type);
    if (identifier.success) {
      setNetworkInfo({type:type, identifier:identifier.data});
      showLoading(false);
      setStatus("1");
      return;
    }
    showLoading(false);
    alert(identifier.message);
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'accessing Lisk Service...'} duration={10000} />
        {status === "0"? 
          <div className="container">
            <IonCard>
              <img src="./assets/img/home.png"></img>
              <IonCardHeader>
                <IonCardTitle>Select Network</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton onClick={async() => await selectNetwork(NETWORK.MAINNET)} expand="block" size="large">Mainnet</IonButton>
                <IonButton onClick={async() => await selectNetwork(NETWORK.TESTNET)} expand="block" size="large">Testnet</IonButton>
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

export default SelectNetwork;
