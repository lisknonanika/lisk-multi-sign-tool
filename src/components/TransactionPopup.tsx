import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import { copy } from 'ionicons/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';

const TransactionPopup: React.FC<{transactionString:string, showTransaction:any}> = ({transactionString, showTransaction}) => {
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
      </IonButtons>
    </div>
  )
}

export default TransactionPopup;