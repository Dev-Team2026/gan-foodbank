import Tesseract from 'tesseract.js';
import {useState} from "react";


const Camera = ({PageHeader, Link, AuthenticationChecker, currentUser, updateUser}) => {
  const [text, setText] = useState(null);
  const processImg = async (e) => {
  e.preventDefault();
    const image = e.target.files[0];
    if (!image) {
      return;
    }
    const { data: { text } } = await Tesseract.recognize(image, 'eng');
    setText(text);
  }
  return (
    <div>
      <PageHeader Link={Link} user={currentUser} />
      <AuthenticationChecker updateUser={updateUser} />
      <form>
        <label>Press to activate camera.</label>
        <input type="file" accept="image/*" capture="camera" required id="docImg" onChange={processImg}/>
        <p>{ text }</p>
        <button onClick={processImg} type="button">Process Image</button>
      </form>
    </div>
  )
}

export default Camera
