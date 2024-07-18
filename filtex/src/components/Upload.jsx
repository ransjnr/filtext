// eslint-disable-next-line no-unused-vars
import {React, useState} from 'react'
import { MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai';

const Upload = () => {

  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState("No selected file")
  return (
    <div className='main'>
        <form action=""
        onClick={() => document.querySelector(".input-field").click()}
        >
            <input type="file" accept='image/*' className='input-field' hidden
                onChange = {({ target: {files}}) => {
                    files[0] && setFileName(files[0].name)
                    if(files){
                        setImage(URL.createObjectURL(files[0]))
                    }
                }}
            />
            {image ?
            <img src={image} width={150} height={150} alt={fileName} />
            :
            <>
            <MdCloudUpload color='#6956E5' size={60}/>

            <p>Browse files to upload</p>
            </>
        }
        </form>
      <section>
        <AiFillFileImage color='#6956E5' />
        <span>
            {fileName}
            <MdDelete />
        </span>
      </section>
    </div>
  )
}

export default Upload
