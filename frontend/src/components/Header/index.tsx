import { FC } from 'react';
import { Logo, HeaderContainer } from "./styles";
import icon from "../../assets/pitu.png";

const Header: FC = ({ children }) => (
    <HeaderContainer>
        <Logo src={icon} alt="Pitu - Encutador de URL" />
        <h1>Pitu</h1>
        <p>{children}</p>
    </HeaderContainer>
);

export default Header;