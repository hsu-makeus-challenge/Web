import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const globalStyles = createGlobalStyle`
//css 초기값
${reset};

.navbar {
position: relative;
width: 100vw;
height: 60px;
background: #02061F;
color:white;
display:flex;
align-items:center;
padding:20px;
}

 * {
    margin: 0;
    box-sizing: border-box;
    }

.icon {
width: 20px;
margin-left:15vw;
}

.taps {
width:100%;
display:flex;
flex-direction:row;
gap:12px;
font-size:10px;
justify-content:flex-end;
margin-right:10vw;
cursor:pointer;

}

.hambuger {
width: 20px;
visibility: hidden;
margin-right:10vw;
cursor:pointer;
}

@media(max-width: 700px) {
.taps ul{
visibility: hidden;
}
.hambuger {
visibility: visible;
}
}

`

export default globalStyles;