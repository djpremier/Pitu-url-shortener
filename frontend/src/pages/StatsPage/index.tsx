import { Link, RouteComponentProps } from "react-router-dom";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { parseISO, formatRelative } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import ShortenerService, { ILink } from "../../services/shortenerService";
import { StatsRow, StatsBox, StatsBoxTitle } from "./styles";
import { BlockContainer } from "../../styles/global";
import { FC, useEffect, useState } from "react";

type TParams = {
  code: string;
}

interface ShortenedLink extends ILink {
  relativeDate?: string;
}

const StatsPage: FC<RouteComponentProps<TParams>> = ({ match }) => {
  const [shortenedURL, setShortenedURL] = useState<ShortenedLink | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { code } = match.params

    ShortenerService.getStats(code).then((shortenedURL: ShortenedLink) => {
      // Convertendo data de string para datetime
      const parsedDate = parseISO(shortenedURL.updatedAt);
      const currentDate = new Date();

      // Extrai o resultado do tempo entre as duas datas
      const relativeDate = formatRelative(parsedDate, currentDate, {
        locale: ptBR
      });

      shortenedURL.relativeDate = relativeDate;

      setShortenedURL(shortenedURL);
    }).catch(() => {
      setErrorMessage("Ops! A URL solicitada não existe.");
    });

  }, [match.params]);

  return (
    <Container>
      <Header>Estatísticas:</Header>
      {errorMessage || !shortenedURL ? (
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
      ) : (
          <BlockContainer className="text-center">
            <p>
              <b>http://localhost:3000/{shortenedURL.code}</b>
            </p>
            <p>
              Redireciona para:
              <br />
              <strong>
                <Link to={shortenedURL.url} target="blank_">
                  {shortenedURL.url}
                </Link>
              </strong>
            </p>
            <StatsRow>
              <StatsBox>
                <b>{shortenedURL.hits}</b>
                <StatsBoxTitle>Visitas</StatsBoxTitle>
              </StatsBox>
              <StatsBox>
                <b>{shortenedURL.relativeDate}</b>
                <StatsBoxTitle>Sua última visita</StatsBoxTitle>
              </StatsBox>
            </StatsRow>
            <Link className="btn btn-primary" to="/">
              Encurtar nova URL
            </Link>
          </BlockContainer>
        )}
    </Container>
  );
}

export default StatsPage;
