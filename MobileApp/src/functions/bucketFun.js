import { createSupaClient } from './databaseFun.js'
import { decode } from 'base64-arraybuffer';
import { v4 as uuid } from 'uuid';
import secureRandom from 'secure-random';

// get the file data from the image picker library

export async function uploadReceipt(response, storageName) {
  try {
    const hostUrl = 'https://ixxtmhjztlfsfjorurfi.supabase.co/storage/v1/object/public/receipts/'
    const fileName = "exampleTESTTT" //storageName
    //ABOVE IS HARD CODED BECAUSE OF WEIRD UNDEFINED ERROR 
    const id = uuid({ random: secureRandom })
    const extension = response.uri.split('.').pop()
    const data = await fetch(response.uri)
    if (!data.ok) {
      return -1
    }
    const supabase = await createSupaClient()
    const {data: responseData , error} = await supabase.storage
      .from('receipts')
      .upload(`${fileName}.${extension}`, decode(response.base64), {
        contentType: `image/${extension}`, 
      })

    alert(`${hostUrl}${fileName}.${extension}`)
    return `${hostUrl}${fileName}.${extension}`
    } catch (error) {
        alert(error)
        return -1
    }
}

export default { uploadReceipt }
