import * as env from 'env-var'

export const environment = env.get('REACT_APP_ENV').asString()

export const firebaseFunctionsEmulator = env.get('REACT_APP_FIREBASE_FUNCTIONS_EMULATOR').asBool()
