import ReactTooltip from 'react-tooltip';
import { IonButtons, IonButton, IonIcon } from '@ionic/react';
import { EmailComposer, EmailComposerOptions } from '@ionic-native/email-composer/ngx';
import { copy, mail } from 'ionicons/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const TransactionPopup: React.FC<{transactionString:string}> = ({transactionString}) => {
  const transactionObject = JSON.parse(transactionString);
  const emailComposer:EmailComposer = new EmailComposer();

  const sendMail = async () => {
    const email:EmailComposerOptions = {
      subject: transactionObject.id,
      body: transactionString,
      isHtml: false
    }
    await emailComposer.open(email);
  }
  
  return (
    <div>
      <textarea rows={5} readOnly={true} value={transactionString} />
      <IonButtons>
        <CopyToClipboard text={transactionString}>
          <IonButton data-place={'top'} data-effect={'float'} data-tip="Copied!" data-event={'click'}>
            <IonIcon icon={copy}/>
            <div style={{marginLeft: '5px'}}>copy</div>
          </IonButton>
        </CopyToClipboard>
        <IonButton style={{marginLeft: '15px'}} onClick={async() => {await sendMail()}}>
          <IonIcon icon={mail}/>
          <div style={{marginLeft: '5px'}}>mail</div>
        </IonButton>
      </IonButtons>
      <ReactTooltip afterShow={() => { setTimeout(ReactTooltip.hide, 2000) }}/>
    </div>
  )
}

export default TransactionPopup;