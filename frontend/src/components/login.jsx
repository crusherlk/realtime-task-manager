import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const toast = useToast();
  const navigate = useNavigate();

  async function onSubmit(data) {
    // console.log(data);
    const user = await loginUser(data);
    if (user) {
      toast({
        title: "Login Successful!",
        status: "success",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.email}>
        <FormLabel className="font-semibold">Email</FormLabel>
        <Input
          id="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button colorScheme="facebook" isLoading={isSubmitting} type="submit">
        Login
      </Button>
    </form>
  );
}
export default Login;
