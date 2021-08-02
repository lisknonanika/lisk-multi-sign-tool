import React, { useState } from 'react';
import { IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import Header from '../components/Header';
import './Common.css';
import { NETWORK, getNetworkIdentifier } from '../utils';
import { Dispatch, SetStateAction } from 'react';
import { Redirect } from 'react-router';

const SelectNetwork: React.FC<{setNetworkIdentifire: Dispatch<SetStateAction<string>>}> = ({setNetworkIdentifire}) => {

  const [status, setStatus] = useState<string>("0");

  const selectNetwork = async (network:string) => {
    setStatus("9");
    const result = await getNetworkIdentifier(network);
    if (result) {
      setNetworkIdentifire(result);
      setStatus("1");
    }
  }

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
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
        : ""}
        {status === "9"?
          <div>Now Loading</div>
        : ""}
      </IonContent>
    </IonPage>
  );
};

export default SelectNetwork;
