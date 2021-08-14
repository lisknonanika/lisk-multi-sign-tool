import { IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/react';

const SummaryCard: React.FC<{showTransaction:any, signStatus:any}> = ({showTransaction, signStatus}) => {
  return (
    <IonCard>
      <div className="lisk-sticker"><img src='./assets/img/summarycard.png' style={{objectPosition: '50% 45%'}}></img></div>
      <div className='ion-card-body'>
        <IonCardHeader>
          <IonCardTitle>Signed Summary</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className='content-item'>Number of required signatures</div>
          <div className='content-subitem'>{signStatus.signature.max}</div>
          <div className='content-item'>
            <div>Number of signed signatures</div>
            <div>(signed / max)</div>
          </div>
          <div className='content-subitem'>
            Mandatory: {signStatus.mandatory.signed} / {signStatus.mandatory.max}
            &nbsp;&nbsp;
            Optional: {signStatus.optional.signed} / {signStatus.optional.max}
          </div>
          <IonButton onClick={async() => await showTransaction()} expand='block' size='large'>Show transaction</IonButton>
        </IonCardContent>
      </div>
    </IonCard>
  )
}

export default SummaryCard;