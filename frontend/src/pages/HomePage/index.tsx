import { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Alert,
  Spinner
} from "react-bootstrap";
import Header from "../../components/Header";
import { ContentContainer, Form } from "./styles";
import ShortenerService from "../../services/shortenerService";

const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const inputURL = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    if (!url) {
      setIsLoading(false);
      setErrorMessage("Informe uma URL para encurtar!");
    }

    try {
      const result = await ShortenerService.generate({ url });

      setIsLoading(false);
      setCode(result.code);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Ops! Ocorreu um erro ao tentar encurtar a URL, tente novamente.");
    }
  }

  const handleUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }

  const copyToClipboard = () => {
    const element = inputURL.current;
    element?.select();
    document.execCommand("copy");
  }

  return (
    <Container>
      <Header>Seu encurtador de URL</Header>
      <ContentContainer>
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Digite a URL que você deseja encurtar"
              defaultValue=""
              onChange={handleUrl}
              type="url"
              required
            />
            <InputGroup.Append>
              <Button variant="primary" type="submit">
                Encurtar
              </Button>
            </InputGroup.Append>
          </InputGroup>

          {isLoading ? (
            // Carregando os dados
            <Spinner animation="border" />
          ) : (
              code && (
                // Mostra o valor da tela
                <>
                  <InputGroup className="mb-3">
                    <FormControl
                      autoFocus={true}
                      defaultValue={`http://localhost:3000/${code}`}
                      ref={inputURL}
                      type="url"
                    />
                    <InputGroup.Append>
                      <Button
                        variant="outline-secondary"
                        onClick={copyToClipboard}
                      >
                        Copiar
                        </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  <p>
                    Para acompanhar as estatíticas, acesse{" "}
                    <strong>http://localhost:3000/{code}/stats</strong>
                  </p>
                </>
              )
            )}

          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        </Form>
      </ContentContainer>
    </Container>
  );
}

export default HomePage;
