import React,{ ButtonHTMLAttributes, HtmlHTMLAttributes} from 'react';
import Container from  './styles';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button : React.FC<ButtonProps> = ({ children, ...rest}) => (
<Container {...rest}>
    {children}
</Container>
);


export default Button;