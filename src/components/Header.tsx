import { IonButton, IonButtons, IonHeader, IonIcon, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { home, arrowBack, informationCircle, logoTwitter, logoGithub } from 'ionicons/icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const Header: React.FC<{type:number, url:string}> = ({type, url}) => {
  const MySwal = withReactContent(Swal);
  const information = () => {
    MySwal.fire({
      html:
      <div>
        <div className='content-title'>- What's Lisk -</div>
        <div className='content-item' >
          <div>Lisk Official:</div>
          <div style={{fontStyle:'italic'}}>Lisk set itself the goal to make blockchain technology accessible for a future in which everyone benefits from it. </div>
        </div>
        <div className='content-item' style={{paddingTop:'0px', marginBottom:'10px'}}>
          <IonRouterLink href='https://lisk.com/what-is-lisk' target='_blank'>Lean more</IonRouterLink>
        </div>
        <div className='content-title'>- Develop & Support & -</div>
        <div className='content-item' style={{marginBottom:'10px'}}>
          <IonIcon icon={logoTwitter} />&nbsp;
          <IonRouterLink href='https://twitter.com/ys_mdmg' target='_blank'>@ys_mdmg</IonRouterLink>
        </div>
        <div className='content-title'>- Source -</div>
        <div className='content-item' style={{marginBottom:'10px'}}>
          <IonIcon icon={logoGithub} />&nbsp;
          <IonRouterLink href='https://github.com/lisknonanika/lisk-multi-sign-tool' target='_blank'>lisk-multi-sign-tool</IonRouterLink>
        </div>
        <div className='content-title'>- Use Library -</div>
        <div className='content-item'>
          <IonIcon icon={logoGithub} />&nbsp;
          <IonRouterLink href='https://github.com/LiskHQ/lisk-sdk' target='_blank'>Lisk SDK</IonRouterLink>
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