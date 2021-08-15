import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { IonLoading, IonContent, IonPage, IonSlides, IonSlide, useIonViewDidEnter } from '@ionic/react';
import { validateTransaction, signMultiSignatureTransaction } from '@liskhq/lisk-transactions';
import { getAddressAndPublicKeyFromPassphrase } from '@liskhq/lisk-cryptography';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Header, AccountCard, SummaryCard, TransactionPopup } from '../components';
import { SIGN_INFO, MEMBER_INFO, getAssetSchema, convertTransactionObject, convertSignedTransaction } from '../common';
import './Common.css';

const SignTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [loading, showLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('0');
  const [signMembers, setSignMembers] = useState(new Array());
  const [numberOfSignatures, setNumberOfSignatures] = useState({max:0, signed:0});
  const [numberOfMandatory, setNumberOfMandatory] = useState({max:0, signed:0});
  const [numberOfOptional, setNumberOfOptional] = useState({max:0, signed:0});
  const MySwal = withReactContent(Swal);
  let isError = false;
  useEffect(() => { update() }, [count]);

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
    } catch(err) {
      await Swal.fire('Error', 'Invalid move.', 'error');
      setStatus('9');
      return;
    }
    update();
  });

  const slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  const showTransaction = async () => {
    await MySwal.fire({
      title: 'Transaction',
      icon: 'info',
      html: <TransactionPopup transactionString={signInfo.transactionString} showTransaction={showTransaction} />
    });
  }

  const update = async () => {
    try {
      const transactionObject = JSON.parse(signInfo.transactionString);
      const members:Array<MEMBER_INFO> = signInfo.senderAcount.keys.members.map((member:any, index:number):MEMBER_INFO => {
        return {
          publicKey: member.publicKey,
          address: member.address,
          mandatory: member.isMandatory,
          signed: transactionObject.signatures[index]? true: false
        }
      });
      setSignMembers(members);

      const signatures = {max:signInfo.senderAcount.keys.numberOfSignatures? signInfo.senderAcount.keys.numberOfSignatures: 0, signed:0};
      const mandatory = {max:signInfo.senderAcount.keys.mandatoryKeys.length, signed:0};
      const optional = {max:signInfo.senderAcount.keys.optionalKeys.length, signed:0};
      transactionObject.signatures.forEach((signature:string, index:number) => {
        if (!signature) return;
        signatures.signed += 1;
        if (signInfo.senderAcount.keys.members[index].isMandatory) mandatory.signed += 1;
        else optional.signed += 1;
      });
      setNumberOfSignatures(signatures);
      setNumberOfMandatory(mandatory);
      setNumberOfOptional(optional);

    } catch(err) {
      isError = true;
    }
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

      showLoading(false);
      setCount(count + 1);
      await MySwal.fire({
        title: 'Success',
        icon: 'success',
        html: <TransactionPopup transactionString={signInfo.transactionString} showTransaction={showTransaction} />
      });
  
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
                <SummaryCard showTransaction={showTransaction} signStatus={{signature:numberOfSignatures, mandatory:numberOfMandatory, optional:numberOfOptional}} />
              </IonSlide>
            {
              signMembers.map((member:any) => {
                return (
                  <IonSlide key={member.publicKey}>
                    <AccountCard sign={sign} member={member} />
                  </IonSlide>
                );
              })
            }
            </IonSlides>
          </div>
        :''}
        {status === '9'? <Redirect to='/selectNetwork'></Redirect>: ''}
      </IonContent>
    </IonPage>
  );
};

export default SignTransaction;
