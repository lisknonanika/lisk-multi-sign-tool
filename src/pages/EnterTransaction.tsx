import { IonContent, IonLabel, IonPage } from '@ionic/react';
import Header from '../components/Header';
import './Common.css';
import { SIGN_INFO } from '../common';

const EnterTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLabel>{signInfo.networkIdentifier}</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default EnterTransaction;
