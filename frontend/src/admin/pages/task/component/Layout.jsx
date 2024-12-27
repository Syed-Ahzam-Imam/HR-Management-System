import {
  Box,
  CircularProgress,
  Flex,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import TaskList from "./TaskTable";
import Loading from "../../../../components/Loading/Loading";
import { getAllTasks, getAllTasksByUserId } from "../../../../API/task";



let role = '';
let userId = 0;

const user = JSON.parse(localStorage.getItem("user"));


if (user) {
  role = user.role;
  userId = user.userId
}


const Layout = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);



  const toast = useToast();

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      let filteredTasks = [];

      if (role === "admin") {
        const data = await getAllTasks();
        console.log("data", data)
        filteredTasks = data.tasks;
      } else {
        const data = await getAllTasksByUserId(userId);
        filteredTasks = data.tasks;
      }

      // Filter tasks based on status
      const inProgressTasks = filteredTasks.filter(task => task.status === 'Pending');
      const pendingTasks = filteredTasks.filter(task => task.status === 'Not started' || task.status === 'Assigned');
      const completedTasks = filteredTasks.filter(task => task.status === 'Completed' || task.status === 'Under review');

      setTasks({ inProgress: inProgressTasks, pending: pendingTasks, completed: completedTasks });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setIsLoading(false);
      // Display error toast if fetching tasks fails
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
    }
  };


  useEffect(() => {
    fetchTasks(); // Fetch tasks when component mounts
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }
  return (
    <Box>
      <Tabs variant="soft-rounded" isFitted colorScheme="blue">
        <TabList gap={2}>
          <Tab _selected={{ bgColor: 'cyan.400' }}>
            <Flex justify="center" align="center" gap={2}>
              <Text>In Progress</Text>
              <CircularProgress isIndeterminate color="green" size="5" />
            </Flex>
          </Tab>
          <Tab _selected={{ bgColor: 'yellow.400' }}>
            <Flex justify="center" align="center" gap={2}>
              <Text>Pending</Text>
              <Icon as={CiClock1} />
            </Flex>
          </Tab>
          <Tab _selected={{ bgColor: 'lightgreen' }}>
            <Flex justify="center" align="center" gap={2}>
              <Text>Completed</Text>
              <Icon as={FaCheck} />
            </Flex>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TaskList tasks={tasks.inProgress} fetchTasks={fetchTasks} inProgress={true} />
          </TabPanel>
          <TabPanel>
            <TaskList tasks={tasks.pending} fetchTasks={fetchTasks} pending={true} />
          </TabPanel>
          <TabPanel>
            <TaskList tasks={tasks.completed} fetchTasks={fetchTasks} completed={true} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Layout;
