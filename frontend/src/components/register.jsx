import {
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const toast = useToast();
  const navigate = useNavigate();

  async function onSubmit(data) {
    // console.log(data);
    const user = await registerUser(data);
    if (user) {
      toast({
        title: "Registration Successful!",
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
      <FormControl isInvalid={errors.name}>
        <FormLabel className="font-semibold">Name</FormLabel>
        <Input
          id="name"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
          })}
        />
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
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
        Register
      </Button>
    </form>
  );
}
export default Register;
