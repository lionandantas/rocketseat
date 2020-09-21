import React, { useCallback, useRef } from "react";
import { Container, Content, Background, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo.svg";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import getValidationErrors from "../../utils/getValidationErrors";

import Input from "../../components/input";
import Button from "../../components/button";
interface SignupFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history  = useHistory();

  const handlerSubmit = useCallback(async (data: SignupFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail valido"),
        password: Yup.string().min(6, "No minimo 6 digitos"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post("/users", data);
      history.push('/');
      addToast({
        type: "success",
        title: "Cadastro realizado",
        description: "Voce já pode fazer o seu logon no GoBarber",
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErrors(err);
        formRef.current?.setErrors(erros);
        return;
      }

      addToast({
        type: "error",
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao fazer cadastrado, tente novamente",
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handlerSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" type="text" placeholder="Nome" icon={FiUser} />

            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              icon={FiMail}
            />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
