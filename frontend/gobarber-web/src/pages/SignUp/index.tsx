import React,{ useCallback, useRef } from 'react';
import {Container, Content, Background} from './styles';
import logoImg from '../../assets/logo.svg';
import {Form } from '@unform/web';
import {  FormHandles } from '@unform/core';
import {FiMail,FiLock,FiUser, FiArrowLeft} from 'react-icons/fi';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/input';
import Button from '../../components/button';


const SignUp: React.FC = () => {

   const formRef = useRef<FormHandles>(null);

    const handlerSubmit = useCallback(async (data:object) => {
        try{

            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name:Yup.string().required('Nome obrigatório'),
                email:Yup.string().required('E-mail obrigatório').email('Digite um e-mail valido'),
                password:Yup.string().min(6,'No minimo 6 digitos')
            });
            await schema.validate(data,{
                abortEarly:false
            });
            

        }catch(err){
            const erros = getValidationErrors(err);
            formRef.current?.setErrors(erros);
        }
    },[]);

   return (
        <Container>
            <Background/>
            <Content>
             <img src={logoImg} alt="GoBarber"/>
             <Form ref={formRef}  onSubmit={handlerSubmit}>
                 <h1>Faça seu cadastro</h1>
                
                 <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
        
                 <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />
        
                 <Input name="password" type="password" placeholder="Senha" icon={FiLock} />
        
                 <Button type="submit">Cadastrar</Button>
        
                 
             </Form>
             <a href="forgot"><FiArrowLeft/>Voltar para logon</a>
            </Content>
        </Container>
        );
};


export default SignUp;