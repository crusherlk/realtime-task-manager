import {
  Badge,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import CreateTask from "../../components/createTask";
import { useEffect, useState } from "react";
import { getAllTasks } from "../../services/taskService";
import { currentUser } from "../../services/authService";
import { FaPenToSquare, FaPlus, FaArrowUp } from "react-icons/fa6";
import DeleteTask from "../../components/deleteTask";
import { TaskState } from "../../context/taskContext";
import socket from "../../socket/socketManager";

function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tasks, setTasks } = TaskState();
  // const [tasks, setTasks] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const user = currentUser();
  const [haveNewTasks, setHaveNewTasks] = useState(false);

  const getTasks = async () => {
    const allTasks = await getAllTasks(user);
    setTasks(allTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    socket.on("recieve_newTask", () => {
      // setHaveNewTasks(true);
      getTasks();
    });
    socket.on("recieve_editedTask", () => {
      getTasks();
    });
    socket.on("recieve_deletedTask", () => {
      getTasks();
    });
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-end">
        <Button
          leftIcon={<FaPlus />}
          colorScheme="facebook"
          variant="solid"
          onClick={() => {
            setIsEdit(false);
            onOpen();
          }}
        >
          Create Task
        </Button>
      </div>
      <CreateTask
        isOpen={isOpen}
        onClose={onClose}
        isEdit={isEdit}
        task={selectedTask}
      />

      <section className="my-4">
        {haveNewTasks && (
          <div className="flex justify-center my-4">
            <Button
              leftIcon={<FaArrowUp />}
              colorScheme="facebook"
              size="sm"
              isDisabled={!haveNewTasks}
              onClick={() => {
                getTasks();
                setHaveNewTasks(false);
              }}
            >
              New Tasks
            </Button>
          </div>
        )}

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Task</Th>
                <Th>Status</Th>
                <Th>Description</Th>
                <Th>Priority</Th>
                {/* <Th>Created by</Th> */}
                <Th isNumeric>Due Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks &&
                tasks.map((task) => (
                  <Tr key={task._id}>
                    <Td>{task.title}</Td>
                    <Td>
                      {task.status === "todo" && (
                        <Badge variant="solid" colorScheme="red">
                          TODO
                        </Badge>
                      )}
                      {task.status === "inprogress" && (
                        <Badge variant="solid" colorScheme="yellow">
                          IN PROGRESS
                        </Badge>
                      )}
                      {task.status === "complete" && (
                        <Badge variant="solid" colorScheme="green">
                          COMPLETED
                        </Badge>
                      )}
                    </Td>
                    <Td>{task.description}</Td>
                    <Td>
                      {task.priority === "low" && (
                        <Badge variant="outline" colorScheme="blue">
                          LOW
                        </Badge>
                      )}
                      {task.priority === "medium" && (
                        <Badge variant="outline" colorScheme="yellow">
                          MEDIUM
                        </Badge>
                      )}
                      {task.priority === "high" && (
                        <Badge variant="outline" colorScheme="red">
                          HIGH
                        </Badge>
                      )}
                    </Td>
                    {/* <Td>{task.user.name}</Td> */}
                    <Td isNumeric>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </Td>
                    <Td className="flex gap-2">
                      <Button
                        colorScheme="yellow"
                        size="sm"
                        onClick={() => {
                          setIsEdit(true);
                          setSelectedTask(task);
                          onOpen();
                        }}
                      >
                        <FaPenToSquare />
                      </Button>
                      <DeleteTask task={task} />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </section>
    </div>
  );
}
export default Home;
