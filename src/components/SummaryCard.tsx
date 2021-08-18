import { IonButton, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonIcon } from '@ionic/react';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { SIGN_STATUS } from '../common';

const SummaryCard: React.FC<{signStatus:SIGN_STATUS, showTransaction:any}> = ({signStatus, showTransaction}) => {
  const mandatoryRemain:number = signStatus.mandatory.max - signStatus.mandatory.signed;
  const optionalRemail:number = signStatus.signatures.max - signStatus.mandatory.max - signStatus.optional.signed;


  return (
    <IonCard>
      <div className="lisk-sticker"><img src='./assets/img/summarycard.png' style={{objectPosition: '50% 45%'}}></img></div>
      <div className='ion-card-body'>
        <IonCardHeader>
          <IonCardSubtitle>Signed Status</IonCardSubtitle>
          <IonCardTitle>{mandatoryRemain <= 0 && optionalRemail <= 0? <div className='row-item' style={{marginLeft: '-1em'}}><IonIcon icon={checkmarkCircleOutline} />Enough</div>: <div>Not Enough</div>}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <div className='content-item'>Remain:{mandatoryRemain <= 0? optionalRemail: mandatoryRemain + optionalRemail}&nbsp;&nbsp;Signed:{signStatus.mandatory.signed + signStatus.optional.signed}&nbsp;&nbsp;Max:{signStatus.signatures.max}</div>
          <div className='content-subitem'>
            <div>*Mandatory - Remain:{mandatoryRemain <= 0? 0: mandatoryRemain}&nbsp;&nbsp;Signed:{signStatus.mandatory.signed}&nbsp;&nbsp;Max:{signStatus.mandatory.max}</div>
            <div>*Optional - Remain:{optionalRemail <= 0? 0: optionalRemail}&nbsp;&nbsp;Signed:{signStatus.optional.signed}&nbsp;&nbsp;Max:{signStatus.optional.max}</div>
          </div>
          <IonButton onClick={async() => await showTransaction()} expand='block' size='large'>Show Transaction</IonButton>
        </IonCardContent>
      </div>
    </IonCard>
  )
}

export default SummaryCard;