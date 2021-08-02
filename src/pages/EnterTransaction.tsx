import { IonContent, IonLabel, IonPage } from '@ionic/react';
import Header from '../components/Header';
import './Common.css';

const EnterTransaction: React.FC<{networkIdentifire:string}> = ({networkIdentifire}) => {

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLabel>{networkIdentifire}</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default EnterTransaction;
