import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createTask, getAllTasks, updateTask } from "../services/taskService";
import { currentUser } from "../services/authService";
import { useEffect } from "react";
import { TaskState } from "../context/taskContext";
import socket from "../socket/socketManager";

function CreateTask({ isOpen, onClose, isEdit, task }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();
  const toast = useToast();

  const { setTasks } = TaskState();

  const changeFormValue = (task) => {
    setValue("title", task.title);
    setValue("description", task.description);
    setValue("priority", task.priority);
    setValue("status", task.status);
    setValue("dueDate", formatISOtoDateString(task.dueDate));
  };

  const formatISOtoDateString = (d) => {
    return new Date(d).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (isEdit) {
      // console.log(task);
      changeFormValue(task);
    }
  }, [isEdit, task]);

  async function onSubmit(data) {
    const user = currentUser();
    if (isEdit) {
      // update task
      const editedTask = await updateTask(task._id, data, user);
      if (editedTask) {
        toast({
          title: "Task updated!",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        socket.emit("editedTask", editedTask);
      }
    } else {
      // create task
      const newTask = await createTask(data, user);
      if (newTask) {
        toast({
          title: "Task created!",
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        socket.emit("newTask", newTask);
      }
    }
    reset(); //reset form

    const allTasks = await getAllTasks(user);
    setTasks(allTasks);
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        size={"xl"}
        onClose={() => {
          onClose();
          reset();
        }}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "Edit Task" : "Create Task"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form
              className="flex flex-col gap-2 mb-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl isInvalid={errors.title}>
                <Input
                  id="title"
                  placeholder="Task Title"
                  {...register("title", {
                    required: "Task is required",
                  })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description}>
                <Textarea
                  id="description"
                  placeholder="Task Description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.priority}>
                <Select
                  id="priority"
                  place
                  placeholder="Select Priority"
                  {...register("priority", {
                    required: "Priority is required",
                  })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
                <FormErrorMessage>{errors.priority?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.status}>
                <Select
                  id="status"
                  place
                  placeholder="Select Status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                >
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="complete">Complete</option>
                </Select>
                <FormErrorMessage>{errors.status?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.dueDate}>
                <Input
                  id="dueDate"
                  type="date"
                  placeholder="Due Date"
                  {...register("dueDate", {
                    required: "Due Date is required",
                  })}
                />
                <FormErrorMessage>{errors.dueDate?.message}</FormErrorMessage>
              </FormControl>
              <Button
                colorScheme="facebook"
                isLoading={isSubmitting}
                type="submit"
              >
                {isEdit ? "Edit Task" : "Create Task"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default CreateTask;
