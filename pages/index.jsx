import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, gql } from '@apollo/client'
import Preloader from '../components/Preloader'

const uploadQuery = gql`
mutation ($file: Upload!) {
  singleUpload(file: $file)
}
`;

const ImageUpload = () => {

  const { register, handleSubmit, errors } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const [uploadImageMutation, { data, loading }] = useMutation(uploadQuery);

  const uploadImage = (file) => {
    uploadImageMutation({
      variables: {
        file
      }
    }).catch(err => console.error(err));
  }

  if (loading) {
    return <Preloader />
  }

  console.log(data);

  return (
    <div className='container'>
      <form onSubmit={handleSubmit((formData) => {
        setSubmitting(true);
        uploadImage(formData.file[0]);
        setSubmitting(false);
      })}>
        <div className="file-field input-field">
          <div className="btn black">
            <span>Image</span>
            <input type="file" name='file' ref={register({ required: 'Required!' })} required />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
            {errors.file ? <span className="red-text helper-text"> {errors.file.message} </span> : <span className="helper-text">Add Image</span>}
          </div>
        </div>
        <div className="input-field">
          <button type="submit" className='btn red' disabled={submitting}>
            Upload
          </button>
        </div>
      </form>
    </div>
  )
}

export default ImageUpload