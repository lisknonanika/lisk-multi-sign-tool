import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { home, arrowBack } from 'ionicons/icons';

const Header: React.FC<{type:number, url:string}> = ({type, url}) => {
  return (
    <IonHeader>
      <IonToolbar>
        {type === 1?
          <IonButtons slot='start'>
            <IonButton routerLink={url} routerDirection='none'>
              <IonIcon icon={arrowBack} slot='icon-only'></IonIcon>
            </IonButton>
          </IonButtons>
        :''}
        {type === 1?
        <IonButtons slot='end'>
          <IonButton routerLink='/selectNetwork' routerDirection='none'>
            <IonIcon icon={home} slot='icon-only'></IonIcon>
          </IonButton>
        </IonButtons>
        :''}
        <IonTitle>Lisk Multi Sign Tool</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header;