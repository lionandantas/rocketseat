import React, { useCallback, useRef } from "react";
import { Container, Content, Background } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/input";
import Button from "../../components/button";

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handlerSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail valido"),
        password: Yup.string().required("Senha obrigatório."),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      const erros = getValidationErrors(err);
      formRef.current?.setErrors(erros);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={ handlerSubmit }>
          <h1>Faça seu login</h1>

          <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />

          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>
        <a href="forgot">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
