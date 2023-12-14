import {
  Button,
  ButtonGroup,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Portal,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa6";
import { deleteTask, getAllTasks } from "../services/taskService";
import { currentUser } from "../services/authService";
import { useState } from "react";
import { TaskState } from "../context/taskContext";
import socket from "../socket/socketManager";

function DeleteTask({ task }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { setTasks } = TaskState();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Popover placement="top" isOpen={isOpen}>
      <PopoverTrigger>
        <Button
          colorScheme="red"
          size="sm"
          isLoading={isLoading}
          onClick={onOpen}
        >
          <FaTrash />
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverBody>Are you sure you want to delete the task?</PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline" onClick={onClose}>
                No
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="red"
                onClick={async () => {
                  setIsLoading(true);
                  const user = currentUser();
                  const res = await deleteTask(task._id, user);
                  setIsLoading(false);
                  if (res) {
                    toast({
                      title: "Task deleted!",
                      status: "error",
                      position: "top-right",
                      duration: 3000,
                      isClosable: true,
                    });
                    onClose();
                    socket.emit("deletedTask", res);
                    const allTasks = await getAllTasks(user);
                    setTasks(allTasks);
                  }
                }}
              >
                Yes
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
export default DeleteTask;
