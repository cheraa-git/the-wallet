import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAsLef3qMzCVsYJLiPPfCa1KIvqEScc234',
  authDomain: 'the-wallet-bd3ca.firebaseapp.com',
  projectId: 'the-wallet-bd3ca',
  storageBucket: 'the-wallet-bd3ca.appspot.com',
  messagingSenderId: '527019815677',
  appId: '1:527019815677:web:ce57db495cfd97f6b3c494',
  measurementId: 'G-ZR0420LBMP'
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
