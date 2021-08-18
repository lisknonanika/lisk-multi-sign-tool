import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonPage, IonSlides, IonSlide, useIonViewDidEnter } from '@ionic/react';
import { validateTransaction, signMultiSignatureTransaction } from '@liskhq/lisk-transactions';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Header, AccountCard, SummaryCard, TransactionPopup } from '../components';
import { SIGN_INFO, getAssetSchema, convertTransactionObject, convertSignedTransaction, updateSignStatus } from '../common';
import './Common.css';

const SignTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [loading, showLoading] = useState(false);
  const [status, setStatus] = useState('0');
  const MySwal = withReactContent(Swal);
  let isError = false;

  useEffect(() => {
    if (status === '1') setStatus('0');
  }, [status]);

  useIonViewDidEnter(async () => {
    try {
      if (isError || !signInfo || !signInfo.network || !signInfo.networkIdentifier || !signInfo.senderAcount) {
        await Swal.fire('Error', 'Invalid move.', 'error');
        setStatus('9');
        return;
      }
      if (!signInfo.senderAcount.keys.numberOfSignatures) {
        await Swal.fire('Error', 'Not MultiSignature Account.', 'error');
        setStatus('9');
        return;
      }
      setStatus('1');
    } catch(err) {
      await Swal.fire('Error', 'Invalid move.', 'error');
      setStatus('9');
      return;
    }
  });

  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  const showTransaction = async () => {
    await MySwal.fire({
      title: 'Transaction',
      icon: 'info',
      html: <TransactionPopup transactionString={signInfo.transactionString} showTransaction={showTransaction} />
    });
  }

  const sign = async (publicKey:string, passphrase:string) => {
    showLoading(true);

    passphrase = passphrase.trim();
    if (!passphrase) {
      showLoading(false);
      await Swal.fire('Error', 'Required passphrase.', 'error');
      return;
    }

    if (publicKey !== getAddressAndPublicKeyFromPassphrase(passphrase).publicKey.toString('hex')) {
      showLoading(false);
      await Swal.fire('Error', 'Incorrect passphrase.', 'error');
      return;
    }

    const transactionObject = JSON.parse(signInfo.transactionString);

    // get assetAchema
    const assetSchema = getAssetSchema(`${transactionObject.moduleID}:${transactionObject.assetID}`);
    if (!assetSchema.success) {
      showLoading(false);
      await Swal.fire('Error', assetSchema.message, 'error');
      return;
    }

    // transactionObject convert
    convertTransactionObject(transactionObject);
    try {
      validateTransaction(assetSchema.data, transactionObject);
    } catch(err) {
      showLoading(false);
      await Swal.fire('Error', 'Invalid TransactionString. (Schema validation error)', 'error');
      return;
    }
  
    try {
      const signedTransaction = signMultiSignatureTransaction(
        assetSchema.data,
        transactionObject,
        Buffer.from(signInfo.networkIdentifier, 'hex'),
        passphrase,
        {
          mandatoryKeys: signInfo.senderAcount.keys.mandatoryKeys.map((key:string) => Buffer.from(key, 'hex')),
          optionalKeys: signInfo.senderAcount.keys.optionalKeys.map((key:string) => Buffer.from(key, 'hex'))
        },
        false
      )
      
      // convert signTransaction
      convertSignedTransaction(signedTransaction);
      signInfo.transactionString = JSON.stringify(signedTransaction);

      if (!updateSignStatus(signInfo)) {
        showLoading(false);
        await Swal.fire('Error', 'Failed Sign.', 'error');
        return;
      }
      
      showLoading(false);
      await MySwal.fire({
        title: 'Success',
        icon: 'success',
        html: <TransactionPopup transactionString={signInfo.transactionString} showTransaction={showTransaction} />
      });
      setStatus('1');
  
    } catch (err) {
      showLoading(false);
      await Swal.fire('Error', '', 'error');
      return;
    }
  }

  return (
    <IonPage>
      <Header type={1} url={'/enterTransaction'} />
      <IonContent fullscreen >
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'Signing Transaction...'} duration={10000} />
        {status === '0'? 
          <div className='container'>
            <IonSlides pager={true} options={slideOpts}>
              <IonSlide key={"summary"}>
                <SummaryCard signStatus={signInfo.status} showTransaction={showTransaction} />
              </IonSlide>
            {
              signInfo.members.map((member:any) => {
                return (
                  <IonSlide key={member.publicKey}>
                    <AccountCard member={member} sign={sign} />
                  </IonSlide>
                );
              })
            }
            </IonSlides>
          </div>
        :''}
        {status === '9'? <Redirect to='/enterTransaction'></Redirect>: ''}
      </IonContent>
    </IonPage>
  );
};

export default SignTransaction;
