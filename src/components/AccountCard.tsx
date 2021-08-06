import React, { useState } from 'react';
import { IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput } from '@ionic/react';
import { Hashicon } from '@emeraldpay/hashicon-react';
import { MEMBER_INFO } from '../common';

const AccountCard: React.FC<{sign:any, member:MEMBER_INFO, index:number}> = ({sign, member, index}) => {
  const [text, setText] = useState<string>('');

  return (
    <IonCard>
      <div className="lisk-address-icon"><Hashicon value={member.publicKey} size={500} /></div>
      <div className='lisk-address'>{member.address}</div>
      <div className='ion-card-body'>
        <IonCardHeader>
          <IonCardSubtitle>- {member.mandatory? "Mandatory": "Optional"} Key -</IonCardSubtitle>
          <IonCardTitle>Enter Passphrase</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonInput type="password" placeholder="Enter Passphrase" onIonChange={e => setText(e.detail.value!)}/>
          <IonButton onClick={async() => await sign(index, text)} expand='block' size='large'>Sign</IonButton>
        </IonCardContent>
      </div>
    </IonCard>
  )
}

export default AccountCard;