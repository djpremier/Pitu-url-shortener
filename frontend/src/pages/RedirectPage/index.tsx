import { Link, RouteComponentProps } from "react-router-dom";
import Header from "../../components/Header";
import { Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RedirectParagraph } from "./styles";
import { BlockContainer } from "../../styles/global";

import ShortenerService from "../../services/shortenerService";
import { FC, useEffect, useState } from "react";

type TParams = {
  code: string;
}

const RedirectPage: FC<RouteComponentProps<TParams>> = ({ match }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { code } = match.params

    ShortenerService.getLink(code).then(({ url }) => {
      window.location.href = url;
    }).catch(() => {
      setErrorMessage("Ops! A URL solicitada não existe.");
    });

  }, [match.params]);

  return (
    <Container>
      {errorMessage ? (
        <>
          <Header>Seu encurtador de URL</Header>
          <BlockContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#FF6961"
              icon="exclamation-triangle"
            />
            <p className="m-3">
              <strong>{errorMessage}</strong>
            </p>
            <Link className="btn btn-primary" to="/">
              Encurtar nova URL
            </Link>
          </BlockContainer>
        </>
      ) : (
          <>
            <Header>Seu encurtador de URL</Header>
            <RedirectParagraph>Redirecionando...</RedirectParagraph>
            <BlockContainer className="text-center">
              <Spinner animation="border" />
            </BlockContainer>
          </>
        )}
    </Container>
  );
}

export default RedirectPage;
