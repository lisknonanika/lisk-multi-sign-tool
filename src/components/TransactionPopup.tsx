import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import { copy, mail } from 'ionicons/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';

const TransactionPopup: React.FC<{transactionString:string, showTransaction:any}> = ({transactionString, showTransaction}) => {
  const transactionObject = JSON.parse(transactionString)
  return (
    <div>
      <textarea rows={5} readOnly={true} value={transactionString} />
      <IonButtons>
        <CopyToClipboard text={transactionString} onCopy={async() => {await Swal.fire('Copied', '', 'success'); await showTransaction();}}>
          <IonButton>
            <IonIcon icon={copy}/>
            <div style={{marginLeft: '5px'}}>copy</div>
          </IonButton>
        </CopyToClipboard>
        <IonButton style={{marginLeft: '15px'}} href={`mailto:?subject=${transactionObject.id}&body=${transactionString}`}>
          <IonIcon icon={mail}/>
          <div style={{marginLeft: '5px'}}>mail</div>
        </IonButton>
      </IonButtons>
    </div>
  )
}

export default TransactionPopup;