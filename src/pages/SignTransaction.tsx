import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useIonViewWillEnter, IonLoading, IonContent, IonPage, IonSlides, IonSlide, IonFooter, IonText, useIonViewDidEnter } from '@ionic/react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import AccountCard from '../components/AccountCard';
import { SIGN_INFO, MEMBER_INFO } from '../common';
import './Common.css';

const SignTransaction: React.FC<{signInfo:SIGN_INFO}> = ({signInfo}) => {
  const [loading, showLoading] = useState(false);
  const [status, setStatus] = useState('0');
  const [signMembers, setSignMembers] = useState(new Array());
  const [numberOfSignatures, setNumberOfSignatures] = useState({max:0, signed:0});
  const [numberOfMandatory, setNumberOfMandatory] = useState({max:0, signed:0});
  const [numberOfOptional, setNumberOfOptional] = useState({max:0, signed:0});

  let isError = false;
  useEffect(() => {
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
  }, []);

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
  });

  const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  const sign = async (idx:number, passphrase:string) => {
    showLoading(true);
    showLoading(false);
    await Swal.fire('Success', `${idx}: ${passphrase}`, 'success');
  }

  return (
    <IonPage>
      <Header />
      <IonFooter className="signed-info">
        <div><IonText>Number of Signatures: {numberOfSignatures.signed} / {numberOfSignatures.max}</IonText></div>
        <div>
          <IonText>Mandatory: {numberOfSignatures.signed} / {numberOfMandatory.max}</IonText>&nbsp;&nbsp;&nbsp;
          <IonText>Optional: {numberOfOptional.signed} / {numberOfOptional.max}</IonText>
        </div>
      </IonFooter>
      <IonContent fullscreen >
        <IonLoading isOpen={loading} onDidDismiss={() => showLoading(false)} message={'Checking TransactionString...'} duration={10000} />
        {status === '0'? 
          <div className='container'>
            <IonSlides pager={true} options={slideOpts}>
            {
              signMembers.map((member:any, index:number) => {
                return (
                  <IonSlide key={member.publicKey}>
                    <AccountCard
                      sign={sign}
                      member={
                        {
                          publicKey: member.publicKey,
                          address: member.address,
                          mandatory: member.isMandatory,
                          signed: JSON.parse(signInfo.transactionString).signatures[index]? true: false
                        }
                      }
                      index={index} />
                  </IonSlide>
                );
              })
            }
            </IonSlides>
          </div>
        : ''}
        {status === '9'? 
          <Redirect to='/selectNetwork'></Redirect>
        : ''}
      </IonContent>
    </IonPage>
  );
};

export default SignTransaction;
