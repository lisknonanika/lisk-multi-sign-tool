import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { Hashicon } from '@emeraldpay/hashicon-react';
import { SIGN_MEMBER } from '../common';

const AccountCard: React.FC<{member:SIGN_MEMBER, sign:any}> = ({member, sign}) => {
  const [text, setText] = useState<string>('');

  return (
    <IonCard>
      <div className="lisk-address-icon"><Hashicon value={member.publicKey} size={500} /></div>
      <div className='lisk-address'>{member.address}</div>
      <div className='ion-card-body'>
        <IonCardHeader>
          <IonCardSubtitle>- {member.mandatory? "Mandatory": "Optional"} Key -</IonCardSubtitle>
          <IonCardTitle>{member.signed? <div className='row-item' style={{marginLeft: '-1em'}}><IonIcon icon={checkmarkCircleOutline} />Signed</div>: <div>Enter Passphrase</div>}</IonCardTitle>
        </IonCardHeader>
        {member.signed?
          <IonCardContent>
            <IonInput type="password" value='' placeholder="Signed" disabled={true} />
            <IonButton expand='block' size='large' disabled={true} >Sign</IonButton>
          </IonCardContent>
          :
          <IonCardContent>
            <IonInput type="password" value={text} placeholder="Enter Passphrase" onIonChange={e => setText(e.detail.value!)}/>
            <IonButton onClick={async() => await sign(member.publicKey, text)} expand='block' size='large'>Sign</IonButton>
          </IonCardContent>
        }
      </div>
    </IonCard>
  )
}

export default AccountCard;