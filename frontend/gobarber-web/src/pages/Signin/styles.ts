import styled from 'styled-components';
import singIBackground from '../../assets/sign-in-background.png';
import { shade } from 'polished';

export const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:stretch;

`;

export const Content = styled.div`
    display:flex;
    justify-content:center;
    flex-direction:column;
    place-content:center;
    align-items:center;
    width:100%;
    max-width:700px;
    form {
        margin: 80px 0;
        width:340px;
        text-align:center;

        h1{
            margin-bottom: 24px;
        }
        

        button{
            background:#ff9000;
            height:50px;
            border-radius:10px;
            border:0;
            padding:0 16px;
            color:#312e38;
            width:100%;
           font-weight:500;
           transition: background-color 0.2s;
           margin-top:16px;
           &:hover{
             background: ${shade(0.2, '#ff9000')};
           }
        }
        a{
            color:#F4EDE8;
            display:block;
            margin-top:24px;
            text-decoration:none;
            transition: color 0.2s;
            &:hover{
             color: ${shade(0.2, '#F4EDE8')};
           }
        }
    }

    > a{
            color:#ff9000;
            display:block;
            margin-top:24px;
            text-decoration:none;
            transition: color 0.2s;
            display:flex;
            align-items:center;
            &:hover{
             color: ${shade(0.2, '#ff9000')};
           }
           svg{
            margin-right:16px;
           }
        }
`;

export const Background = styled.div`

    flex:1;
    background:url(${singIBackground}) no-repeat center;
    background-size:cover;

`;