import styled from "@emotion/styled";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Icon,
  IconButton,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Container = styled.div`
  background-color: white;
  margin: auto;
  border-radius: 1rem;
  width: 650px;
  height: auto;
`;

const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1.75fr;
`;

const schema = yup.object({
  fullname: yup.string().required("Nama lengkap harus diisi"),
  email: yup.string().required("Email harus diisi").email("Email tidak valid"),
  password: yup.string().required("Password harus diisi"),
});

export default function SignupPage() {
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
        <HeaderContainer>
          <IconButton
            className="text-black"
            onClick={() => {
              navigate(-1);
            }}
          >
            <Icon fontSize="large">arrow_circle_left</Icon>
          </IconButton>
          <div>
            <h1
              style={{ fontFamily: "Rubik Gemstones" }}
              className="text-center"
            >
              REGISTER
            </h1>
          </div>
        </HeaderContainer>
        <div>
          <form>
            <TextField
              {...register("fullname")}
              className="my-4"
              fullWidth
              id="outlined-basic"
              label="Nama Lengkap"
              variant="outlined"
              error={errors.fullname?.message ? true : false}
              helperText={
                errors.fullname?.message ? errors.fullname?.message : null
              }
            />
            <TextField
              {...register("email")}
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              className="mb-4"
              error={errors.email?.message ? true : false}
              helperText={errors.email?.message ? errors.email?.message : null}
            />
            <TextField
              {...register("password")}
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="mb-4"
              error={errors.password?.message ? true : false}
              helperText={
                errors.password?.message ? errors.password?.message : null
              }
            />
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Dengan menyentang ini, kamu menyetujui syarat dan ketentuan yang ada di aplikasi magic memory."
              />
            </FormGroup>
            <Button className="mt-4" fullWidth variant="contained">
              DAFTAR
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
