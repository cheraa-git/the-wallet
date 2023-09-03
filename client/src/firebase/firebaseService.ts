import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from './firebase'

function getPathStorageFromUrl(url: string) {
  const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/the-wallet-bd3ca.appspot.com/o/'
  return url
    .replace(baseUrl, '')
    .replace('%2F', '/')
    .split('?')
    .slice(0, -1)
    .join('?')
}


export const firebaseService = {
  saveImageToCloud: async (file: File | undefined) => {
    if (!file) return ''
    try {
      const storageRef = ref(storage, `files/${Date.now()}${file.name}`)
      const uploadTask = await uploadBytes(storageRef, file)
      return await getDownloadURL(uploadTask.ref)
    } catch (e) {
      console.log(e)
      return ''
    }
  },

  deleteImageFromCloud: async (imageUrl?: string) => {
    if (!imageUrl) return
    try {
      const storageImage = ref(storage, getPathStorageFromUrl(imageUrl))
      await deleteObject(storageImage)
      console.log('image deleted')
    } catch (e) {
      console.log(e)
    }
  }
}
