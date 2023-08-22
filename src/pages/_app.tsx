import '../app/globals.css';
import { store } from '@/app/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import { Amplify } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Modal.setAppElement('#__next');

Amplify.configure({
    aws_cognito_region: 'us-east-1',
    aws_user_pools_id: 'us-east-1_dSSF5h2yN',
    aws_user_pools_web_client_id: '5vsmcvfk7so20p3t7ipllrk0n1',
});

interface MyAppProps extends AppProps {
    signOut: () => void;
    user: CognitoUser;
}

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />{' '}
        </Provider>
    );
}

export default withAuthenticator(MyApp, { hideSignUp: true });
