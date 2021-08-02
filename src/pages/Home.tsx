import { IonContent, IonButton, IonPage, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';
import Header from '../components/Header';
import './Home.css';

const Home: React.FC<{setNetwork: any}> = ({setNetwork}) => {

  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <div className="container">
          <IonCard>
            <img src="./assets/img/home.png"></img>
            <IonCardHeader>
              <IonCardTitle>Select Network</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton onClick={() => setNetwork("0")} routerLink="/Sign" expand="block" size="large">Mainnet</IonButton>
              <IonButton onClick={() => setNetwork("1")} routerLink="/Sign" expand="block" size="large">Testnet</IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
