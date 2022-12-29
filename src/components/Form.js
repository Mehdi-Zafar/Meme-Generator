import { useEffect, useState } from "react";
import MemesData from "./MemesData";
import * as htmlToImage from 'html-to-image';

export default function Form(){

    const [width,setWidth] = useState('')
    const [size,setSize] = useState('')
    const [color,setColor] = useState('')
    const [meme,setmeme] = useState({
        topText: "",
        bottomText: "",
        middleText1:"",
        middleText2:"",
        imgurl: "http://i.imgflip.com/1bij.jpg"
    })

    function handleClick(){
        let url = MemesData.data.memes[Math.floor(Math.random()*MemesData.data.memes.length)].url;
        setmeme(prevstate=>({
            ...prevstate,
            imgurl: url
        }))
    }

    function handleChange(event){
        const {name,value} = event.target
        setmeme(prevstate=>{
            return{
                ...prevstate,
                [name]: value
            }
        })   
    }

    var selected = null, // Object of the element to be moved
  x_pos = 0,
  y_pos = 0, // Stores x & y coordinates of the mouse pointer
  x_elem = 0,
  y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
  // Store the object of the element which needs to be moved
  selected = elem;
  x_elem = x_pos - selected.offsetLeft;
  y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
  x_pos = document ? window.event.clientX : e.pageX;
  y_pos = document ? window.event.clientY : e.pageY;
  if (selected !== null) {
    selected.style.left = (x_pos - x_elem) + 'px';
    selected.style.top = (y_pos - y_elem) + 'px';
  }
}


function _destroy() {
  selected = null;
}

function mouseClick(target) {
    _drag_init(target);
    return false;
  };

document.onpointermove = _move_elem;
document.onpointerup = _destroy;

    function downloadimg(){   
        htmlToImage.toJpeg(document.getElementById('image-div'))
            .then(function (dataUrl) {
                let link = document.createElement('a');
                link.download = 'meme.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    useEffect(()=>{
        setColor('white')
        setSize('large')
        setWidth('160px')
    },[])

    return(
        <div className="form-template">
            {/* <form action=""> */}
                <div className="form-input"> 
                    <input type="text" value={meme.topText} name="topText" onChange={handleChange} placeholder="Text1 (required)" required/>
                    <input type="text" value={meme.middleText1} name="middleText1" onChange={handleChange} placeholder="Text2 (optional)"/>
                    <input type="text" value={meme.middleText2} name="middleText2" onChange={handleChange} placeholder="Text3 (optional)"/>
                    <input type="text" value={meme.bottomText} name="bottomText" onChange={handleChange} placeholder="Text4 (optional)"/>
                </div>
                <div className="selectboxes">
                    <div>
                        <label htmlFor="textColor">Text Color:</label>
                        <select name="textColor" id="textColor" onChange={(e)=>setColor(e.target.value)}>
                            <option value="white" selected>White</option>
                            <option value="black">Black</option>
                        </select>
                    </div>
                    <div>
                    <label htmlFor="textColor">Font Size:</label>
                    <select name="textSize" id="textSize" onChange={(e)=>setSize(e.target.value)}>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large" selected>Large</option>
                        <option value="x-large" className="xlarge">X-Large</option>
                        <option value="xx-large" className="xxlarge">XX-Large</option>
                    </select>
                    </div>
                    <div>
                        <label htmlFor="textWidth">Text Width:</label>
                        <select name="textWidth" id="textWidth" onChange={(e)=>setWidth(e.target.value)}>
                            <option value="120px">Small</option>
                            <option value="160px" selected>Medium</option>
                            <option value="240px">Large</option>
                            <option value="310px" className="xlarge">X-Large</option>
                            <option value="400px" className="xxlarge">XX-Large</option>
                        </select>
                    </div>
                </div>
                <div className="btn-group">
                    <button onClick={handleClick}>Change Meme image</button>
                    <button className="downloadimg" onClick={downloadimg}>Download</button>
                </div>
                <div className="meme-image-container" id="meme-image">
                    <div className="image-div" id="image-div">
                    <img className="meme-image" src={meme.imgurl} alt="" />
                    <h2 className="meme-text top" id="draggable-element1" onPointerDown={(e)=>mouseClick(e.target)} style={{color:color,fontSize:size,width:width}}>{meme.topText}</h2>
                    <h2 className="meme-text middle1" id="draggable-element2" onPointerDown={(e)=>mouseClick(e.target)} style={{color:color,fontSize:size,width:width}}>{meme.middleText1}</h2>
                    <h2 className="meme-text middle2" id="draggable-element3" onPointerDown={(e)=>mouseClick(e.target)} style={{color:color,fontSize:size,width:width}}>{meme.middleText2}</h2>
                    <h2 className="meme-text bottom" id="draggable-element4" onPointerDown={(e)=>mouseClick(e.target)} style={{color:color,fontSize:size,width:width}}>{meme.bottomText}</h2>
                    </div>
                </div>

            {/* </form> */}
        </div>
    )
}