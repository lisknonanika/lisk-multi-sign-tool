import { IonContent, IonLabel, IonPage } from '@ionic/react';
import Header from '../components/Header';
import './Common.css';
import { NETWORK_INFO } from '../common';

const EnterTransaction: React.FC<{networkInfo:NETWORK_INFO}> = ({networkInfo}) => {

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLabel>{networkInfo.type}</IonLabel>
        <IonLabel>{networkInfo.identifier}</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default EnterTransaction;
