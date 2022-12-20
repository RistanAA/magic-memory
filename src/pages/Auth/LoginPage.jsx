import styled from "@emotion/styled";
import { Button, Divider, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background-color: white;
  margin: auto;
  border-radius: 1rem;
  width: 450px;
  height: 500px;
`;

const schema = yup
  .object({
    email: yup
      .string()
      .required("Email harus diisi")
      .email("Email tidak valid."),
    password: yup.string().required("Password harus diisi"),
  })
  .required();

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  return (
    <div
      className="d-flex aligns-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <Container className="shadow p-5">
        <h1
          style={{ fontFamily: "Rubik Gemstones" }}
          className="text-center mb-3"
        >
          MAGIC MEMORY
        </h1>
        <div>
          <form>
            <TextField
              {...register("email")}
              className="my-4"
              fullWidth
              id="outlined-basic"
              variant="outlined"
              label="Email"
              error={errors.email?.message ? true : false}
              helperText={errors.email?.message ? errors.email?.message : null}
            />
            <TextField
              {...register("password")}
              fullWidth
              id="outlined-basic"
              variant="outlined"
              type="password"
              label="Password"
              error={errors.password?.message ? true : false}
              helperText={
                errors.password?.message ? errors.password?.message : null
              }
            />
            <Button
              className="mt-4"
              fullWidth
              variant="contained"
              type="submit"
            >
              MASUK
            </Button>
          </form>
        </div>
        <Divider />
        <div className="my-3">
          <div className="text-center">
            <small>Belum punya akun? </small>
          </div>
          <Button
            fullWidth
            className="mt-3"
            variant="outlined"
            onClick={() => navigate("/signup")}
          >
            DAFTAR SEKARANG
          </Button>
        </div>
      </Container>
    </div>
  );
}
