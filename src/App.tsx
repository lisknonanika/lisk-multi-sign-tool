import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import EnterTransaction from './pages/EnterTransaction';
import SignTransaction from './pages/SignTransaction';
import { SIGN_INFO } from './common'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const signInfo:SIGN_INFO = {
    network:"",
    networkIdentifier:"",
    senderAcount:undefined,
    transactionString:"",
    members:new Array(),
    status: {
      signatures:{max:0, signed:0},
      mandatory:{max:0, signed:0},
      optional:{max:0, signed:0}
    }
  };

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/enterTransaction">
            <EnterTransaction signInfo={signInfo}/>
          </Route>
          <Route exact path="/signTransaction">
            <SignTransaction signInfo={signInfo} />
          </Route>
          <Route exact path="/">
            <Redirect to="/enterTransaction" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
