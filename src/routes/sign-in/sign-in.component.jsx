import { Fragment } from "react";
import { signInWithGooglePopup, crearUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'


const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        //  eslint-disable-next-line
        const userDocRef = await crearUserDocumentFromAuth(user);
    }
    return (
        <Fragment>
            <div>
                <h1>This is a Sign-in Page</h1>
                <button onClick={logGoogleUser}>
                    sign in with google popup
                </button>
            </div>
        </Fragment>
    );
};

export default SignIn;