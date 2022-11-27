import React, {useState} from "react";
import 'react-toggle/style.css';
import './../../assets/css/App.css'

const PoseAcc = () => {

  let [baseimg, setBaseimg] = useState(null);
  let [userimg, setUserimg] = useState(null);
  let [baseurl, setBaseurl] = useState('');
  let [imgurl, setImgurl] = useState('');
  let [leftarm, setLeftarm] = useState('');
  let [rightarm, setRightarm] = useState('');
  let [leftwaist, setLeftwaist] = useState('');
  let [rightwaist, setRightwaist] = useState('');
  let [leftleg, setLeftleg] = useState('');
  let [rightleg, setRightleg] = useState('');
  let [imagesUploaded, setImagesUploaded] = useState(0);
  let base_image= "https://res.cloudinary.com/ddtoohmjx/image/upload/v1669535803/yudppgix7hi4o5zygzyl.jpg"
  let image = "https://res.cloudinary.com/ddtoohmjx/image/upload/v1669535806/i7liaqhqyn9j6elvwgma.jpg"
  let [loaded, setloaded] = useState(false)
  let [predicted, setPredicted] = useState(false)
  const handleBaseChange = event => {
    event.preventDefault();
    setBaseimg(event.target.files[0]);
    console.log('baseimg',baseimg)
    let url = uploadImage(event.target.files[0]);
    setBaseurl(url)
    setImagesUploaded(imagesUploaded++);
    console.log('baseimg-end', imagesUploaded)
  };

  const handleUSerChange = event => {
    event.preventDefault();
    setUserimg(event.target.files[0]);
    let url = uploadImage(event.target.files[0]);
    setImgurl(url)
    setImagesUploaded(2);
    console.log('userimg-end', imagesUploaded)
    setloaded(true);
  };

  function uploadImage(image){
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "hackpose")
    data.append("cloud_name","ddtoohmjx")
    console.log(data)
    fetch(" https://api.cloudinary.com/v1_1/ddtoohmjx/image/upload",{
      method:"post",
      body: data
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data.url)
      return data.url
    })
    .catch(err => console.log(err))
    return null
  }

  const predictPoseAccuracy = async()=>{
    // const data = new FormData()
    fetch("http://127.0.0.1:5000/predict-pose-acc",{
      method:"post",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        base_img: base_image,
        img: image
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("after data")
      console.log(data["left_arm"])
      setLeftarm(data["left_arm"])
      setRightarm(data["right_arm"])
      setLeftwaist(data["left_waist"])
      setRightwaist(data["right_waist"])
      setLeftleg(data["left_leg"])
      setRightleg(data["right_leg"])
      setPredicted(true)
    })
    .catch(err => console.log(err))
    return null
  }

  return (
    <>
    <div className="background">
      <div className="container">
        <div className="text-box">
          <h1>Check accuracy of your pose</h1>
          <br/>
          <h6>You all can check the accuracy with which you are performing a particular yoga or
            exercise step. All you need to do is upload a base image of the pose you are trying
            to replicate, and then your own image.
          </h6>
          <br/>
          <div>
            <input type='file' onChange={handleBaseChange} style={{}}/>
            <a><button
              >Upload base image
            </button></a>
            <br/>
            <input type='file' onChange={handleUSerChange} style={{}}/>
            <a><button
              >Upload your image
            </button></a>
          </div>
          <div className="prediction-button-area">
            <a>
              <button 
                className="large-green-button"
                onClick={predictPoseAccuracy}
                >
                  Predict the accuracy
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    {loaded && (
      <div className="background">
        <div className="img-container">

          <div><img className="images" src={base_image}/></div>
          {/* <p></p> */}
          <div><img className="images" src={image}/></div>
        </div>
      </div>
    )}
    {(!loaded || !predicted) &&
    <div className="black-container">
      </div>}
    {predicted &&(
      <div className="background">
        <div className="container">
          <h3>Predicted results:</h3>
          <br/>
          <h5>Left arm: {leftarm}</h5>
          <h5>Right arm: {rightarm}</h5>
          <h5>Left waist: {leftwaist}</h5>
          <h5>Right waist: {rightwaist}</h5>
          <h5>Left leg: {leftleg}</h5>
          <h5>Right leg: {rightleg}</h5>
        </div>
      </div>
      )
    }
    </>
  );
};

export default PoseAcc;