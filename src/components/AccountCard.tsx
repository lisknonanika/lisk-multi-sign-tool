import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonText, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { Hashicon } from '@emeraldpay/hashicon-react';
import { MEMBER_INFO } from '../common';

const AccountCard: React.FC<{sign:any, member:MEMBER_INFO}> = ({sign, member}) => {
  const [text, setText] = useState<string>('');

  return (
    <IonCard>
      <div className="lisk-address-icon"><Hashicon value={member.publicKey} size={500} /></div>
      <div className='lisk-address'>{member.address}</div>
      <div className='ion-card-body'>
        <IonCardHeader>
          <IonCardSubtitle>- {member.mandatory? "Mandatory": "Optional"} Key -</IonCardSubtitle>
          {member.signed? <IonCardTitle><IonIcon icon={checkmarkCircleOutline} />Signed</IonCardTitle>: <IonCardTitle>Enter Passphrase</IonCardTitle>}
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