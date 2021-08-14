import { IonButton, IonButtons, IonHeader, IonIcon, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { home, arrowBack, informationCircle, logoTwitter, logoGithub, link } from 'ionicons/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const Header: React.FC<{type:number, url:string}> = ({type, url}) => {
  const MySwal = withReactContent(Swal);
  const information = () => {
    MySwal.fire({
      html:
      <div>
        <div className='content-title'>- Develop & Support & -</div>
        <div className='content-item'>
          <IonIcon icon={logoTwitter} />&nbsp;
          <IonRouterLink href='https://twitter.com/ys_mdmg' target='_blank'>@ys_mdmg</IonRouterLink>
        </div>
        <div className='content-title'>- Source -</div>
        <div className='content-item'>
          <IonIcon icon={logoGithub} />&nbsp;
          <IonRouterLink href='https://github.com/lisknonanika/lisk-multi-sign-tool' target='_blank'>lisk-multi-sign-tool</IonRouterLink>
        </div>
        <div className='content-title'>- Use Library -</div>
        <div className='content-link'>
          <IonIcon icon={logoGithub} />&nbsp;
          <IonRouterLink href='https://github.com/LiskHQ/lisk-sdk' target='_blank'>Lisk SDK</IonRouterLink>
        </div>
        <div className='content-link'>
          <IonIcon icon={link} />&nbsp;
          <IonRouterLink href='https://capacitorjs.jp/' target='_blank'>Capacitor</IonRouterLink>
        </div>
        <div className='content-link'>
          <IonIcon icon={link} />&nbsp;
          <IonRouterLink href='https://ionicframework.com/' target='_blank'>Ionic</IonRouterLink>
        </div>
        <div className='content-link'>
          <IonIcon icon={link} />&nbsp;
          <IonRouterLink href='https://sweetalert2.github.io/' target='_blank'>sweetalert2</IonRouterLink>
        </div>
        <div className='content-link'>
          <IonIcon icon={logoGithub} />&nbsp;
          <IonRouterLink href='https://github.com/sweetalert2/sweetalert2-react-content' target='_blank'>sweetalert2-react-content</IonRouterLink>
        </div>
        <div className='content-link'>
          <IonIcon icon={logoGithub} />&nbsp;
          <IonRouterLink href='https://github.com/emeraldpay/hashicon' target='_blank'>hashicon-react</IonRouterLink>
        </div>
      </div>
    });
  }

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot='start'>
          {type === 1?
            <IonButton routerLink={url} routerDirection='none'>
              <IonIcon icon={arrowBack} slot='icon-only'></IonIcon>
            </IonButton>
          :''}
        </IonButtons>
        <IonButtons slot='end'>
        {type === 1?
          <IonButton routerLink='/selectNetwork' routerDirection='none'>
            <IonIcon icon={home} slot='icon-only'></IonIcon>
          </IonButton>
        :
          <IonButton onClick={() => information()}>
            <IonIcon icon={informationCircle} slot='icon-only'></IonIcon>
          </IonButton>
        }
        </IonButtons>
        <IonTitle>Lisk Multi Sign Tool</IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default Header;