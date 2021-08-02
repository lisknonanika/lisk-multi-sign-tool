import { IonContent, IonLabel, IonPage } from '@ionic/react';
import Header from '../components/Header';

const Sign: React.FC<{network:string}> = ({network}) => {

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <IonLabel>{network}</IonLabel>
      </IonContent>
    </IonPage>
  );
};

export default Sign;
