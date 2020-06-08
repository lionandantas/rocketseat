import styled,{ css } from 'styled-components';
import Tooltip from '../tooltip';


interface ConainterProps{
    isFocused:boolean
    isFilled:boolean
    isErrored:boolean
}


export const Error = styled(Tooltip)`
    height:20px;
    margin-left:16px;

    svg{
     margin:0;
    }
    
    span{
        background:#c53030;
        color:#fff;

        &::before{
            content:'';
            border-style:solid;
            border-color:#c53030 transparent;

        }
    }
`;


export const Container = styled.div<ConainterProps>`
background:#232129;
border-radius:10px;
padding:16px;
width:100%;
display:flex;

border:2px solid #232129;
color:#666360;

align-items:center;
& + div{
    margin-top:8px;
}

${props => props.isErrored && css` 
    border:2px solid #c53030;
`}

${props => props.isFocused && css` 
    border:2px solid #ff9000;
    color:#ff9000;
`}

${props => props.isFilled && css` 
    color:#ff9000;
`}


input{
    flex:1;
    color:#F4EDE8;
    background:transparent;
    border:0;

&::placeholder{
    color:#666360;
 }
}
svg{
     margin-right:16px;
 }
`;