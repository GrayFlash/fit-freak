import React, {useState} from "react";
import 'react-toggle/style.css';
import './../../assets/css/App.css'

const PoseAcc = () => {

  let [baseimg, setBaseimg] = useState(null);
  let [userimg, setUserimg] = useState(null);
  let [baseurl, setBaseurl] = useState('');
  let [imgurl, setImgurl] = useState('');
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

  function predictPoseAccuracy(){
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
    // .then(resp => resp.json())
    .then(data => {
      console.log(data)
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
          <h4>You all can check the accuracy with which you are performing a particular yoga or
            exercise step. All you need to do is upload a base image of the pose you are trying
            to replicate, and then your own image.
          </h4>
          <br/><br/>
          <div>
            <input type='file' onChange={handleBaseChange} style={{}}/>
            <a><button
              >Upload base image
            </button></a>
            <br/>
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
    {!loaded &&
    <div className="img-container">
      </div>}
    {loaded && (
      <div className="background">
        <div className="img-container">

          <div><img className="images" src={base_image}/></div>
          {/* <p></p> */}
          <div><img className="images" src={image}/></div>
        </div>
      </div>
    )}
    {predicted &&(
      <div>

      </div>
      )
    }
    </>
  );
};

export default PoseAcc;