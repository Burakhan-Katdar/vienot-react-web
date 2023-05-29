import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { InviteDataModel, MaintenanceModeDataModel } from './Models';
import { currentBrowserLanguage } from './../translation/i18n';

class Firebase {
    private firebaseConfig = {
        apiKey: "AIzaSyBK6PRoQhdjtdn6nbgC1gRIYPZ8U6Gr4A8",
        authDomain: "vienot-app.firebaseapp.com",
        databaseURL: "https://vienot-app-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "vienot-app",
        storageBucket: "vienot-app.appspot.com",
        messagingSenderId: "255606979904",
        appId: "1:255606979904:web:68f34cea2ef38ceca6cea5",
        measurementId: "G-37DZD46HTD"
    }

    private app
    private db
    private analytics

    constructor() {
        this.app = initializeApp(this.firebaseConfig);
        this.analytics = getAnalytics(this.app);
        this.db = getFirestore(this.app)
    }

    GetMaintenanceInfo = async () => {
        const maintainConfigs = collection(this.db, 'app-informations');
        const maintainConfigsSnapshot = await getDocs(maintainConfigs);
        const maintainModeData: MaintenanceModeDataModel =
            //@ts-ignore
            maintainConfigsSnapshot.docs[2]._document.data.value.mapValue.fields

        let currentLang = localStorage.getItem('SelectedLanguage') ? localStorage.getItem('SelectedLanguage') : currentBrowserLanguage

        if (maintainModeData.maintain_mode.booleanValue) {
            return {
                booleanValue: false,
                message: currentLang == "tr" ? maintainModeData.maintain_mode_message_tr.stringValue : maintainModeData.maintain_mode_message_en.stringValue
            }
        } else {
            return { booleanValue: false, message: '' }
        }

    }
    FirestoreFeatureChecker = async () => {
        const featureConfigs = collection(this.db, 'app-informations');
        const featureConfigsSnapshot = await getDocs(featureConfigs);
        //@ts-ignore
        let inviteData: InviteDataModel = featureConfigsSnapshot.docs[0]._document.data.value.mapValue.fields
        return inviteData

    }

    FirestoreErrorLogPusher = async (error_place: string, error_content: any) => {
        const errorlogsRef = collection(this.db, 'error-logs')
        addDoc(errorlogsRef, {
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            error_place: error_place,
            error_content: JSON.stringify(error_content)
        }).then(() => {
            //console.log('Data added!');
        })
    }
}

export default new Firebase