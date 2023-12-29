import { Button, TextField } from "@mui/material";
import { Container, Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { H1 } from "../../Home/SignInBox/SignInBox";

const SendEmail = () => {
  const [assunto, setAssunto] = useState<string>();
  const [conteudo, setConteudo] = useState<string>();
  const [conteudoHtml, setConteudoHtml] = useState<string>();

  const htmlPadrao = `<h1></h1>\n<h3></h3>\n<p></p>\n<p></p>\n<p></p>`;

  const sendEmail = async () => {
    await axios
      .post("http://localhost:3000/api/newsletter/send", {
        subject: assunto,
        text: conteudo,
        html: conteudoHtml,
      })
      .then(() => {
        window.alert("Email enviado com sucesso!");
        setAssunto("");
        setConteudo("");
        setConteudoHtml("");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container sx={{ marginTop: "80px" }}>
      <H1
        style={{
          width: "100vw",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        Admin Newsletter
      </H1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
        component="section"
      >
        <TextField
          sx={{ width: "500px" }}
          value={assunto}
          onChange={(e) => {
            setAssunto(e.target.value);
          }}
          label="Assunto"
          variant="filled"
        />
        <TextField
          sx={{ width: "500px" }}
          multiline
          rows={5}
          value={conteudo}
          onChange={(e) => {
            setConteudo(e.target.value);
          }}
          label="Conteúdo texto"
          variant="filled"
        />
        <TextField
          defaultValue={htmlPadrao}
          sx={{ width: "500px" }}
          multiline
          rows={8}
          value={conteudoHtml}
          onChange={(e) => {
            setConteudoHtml(e.target.value);
          }}
          label="Conteúdo html"
          variant="filled"
        />
        <Button onClick={sendEmail} variant="contained">
          Enviar Email
        </Button>
      </Box>
    </Container>
  );
};

export default SendEmail;
