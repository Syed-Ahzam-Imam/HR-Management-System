// src\pages\AdminDashboardPage.js
import AttendanceCard from "./AttendanceCard";
import CircularProgressCard from "./CircularProgress";
import DataTable from "./DataTable";
import React, { useState, useEffect } from "react";
import "../../../styles/global.css";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Center
} from "@chakra-ui/react";
// import { fetchAttendanceData } from "../../../API/api"; // Update the path accordingly




import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Timing from "./Timing";
import UserProfile from "./UserProfile";
import AnnouncementCard from "./AnnouncementCard";
import EmployeeGeneralCard from "./EmployeeGeneralCard";
import Calendar from "./Calendar";
import DashboardCalendar from "./Calendar";
import { getAllTasksByUserId } from "../../../API/task";
import Loading from "../../../components/Loading/Loading";
import { getAllEmployees } from "../../../API/employee";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AttendanceData = [
  {
    title: "Your Attendance",
    value1: "260",
    value2: "15",
    value3: "05",
    text1: "Present",
    text2: "Absent",
    text3: "Late Coming",
  },
  {
    title: "Your Leave",
    value1: "260",
    value2: "15",
    value3: "05",
    text1: "Balance",
    text2: "Used",
    text3: "Remain",
  }

]

const TaskData = [
  {
    projectname: "Project A",
    taskname: "Task 1",
    worklog: "5 hours",
    duedate: "2023-12-01",
  },
  {
    projectname: "Project B",
    taskname: "Task 2",
    worklog: "8 hours",
    duedate: "2023-12-05",
  },
  {
    projectname: "Project C",
    taskname: "Task 3",
    worklog: "3 hours",
    duedate: "2023-12-10",
  },
  {
    projectname: "Project D",
    taskname: "Task 4",
    worklog: "6 hours",
    duedate: "2023-12-15",
  },
];


const employeeData = [
  {
    name: "Employee 1",
    subtext: "Position 1",
    rightext: "26 July, 2023",
    avatarUrl: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80",
  },
  {
    name: "Employee 2",
    subtext: "Position 2",
    rightext: "12 June, 2023",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
  },
  {
    name: "Employee 3",
    subtext: "Position 3",
    rightext: "10 August, 2023",
    avatarUrl: "https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80",
  },
  {
    name: "Employee 4",
    subtext: "Position 4",
    rightext: "26 July, 2023",
    avatarUrl: "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80",
  },
];


let userId = 0;

const user = JSON.parse(localStorage.getItem("user"));


if (user) {
  userId = user.userId
}

const AdminDashboard = ({ sideBarWidth }) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState([]);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tasks data using getAllTaskByUserId
        const data = await getAllTasksByUserId(userId);
        setTasks(data.tasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const fetchEmployees = async () => {
    try {
      const employeeData = await getAllEmployees();
      console.log("employeeData", employeeData)
      setEmployeeData(employeeData.employees);
      // setIsLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  if (loading) {
    return (<Loading />)
  }

  return (
    <Box bg={bgColor} py={8} w="auto" minH="100vh">
      <Container maxW="container.xxl" justifySelf="center">
        <Box
          ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
          transition="margin 0.3s ease-in-out"
        >
          <Heading as="h1" size="xl" mb={4}>
            Dashboard
          </Heading>
          {AttendanceData ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <UserProfile />
              <Box width="100%">
                <DataTable
                  tasks={tasks}
                  title="My Tasks"
                  buttonLabel="View All"
                />
              </Box>
              <SimpleGrid columns={1} spacing={2} width="100%">
                {AttendanceData.map((data, index) => (
                  <AttendanceCard
                    key={index}
                    title={data.title}
                    value1={data.value1}
                    value2={data.value2}
                    value3={data.value3}
                    text1={data.text1}
                    text2={data.text2}
                    text3={data.text3}
                  />
                ))}
              </SimpleGrid>
              <Timing />
              <AnnouncementCard />
              <EmployeeGeneralCard employeeData={employeeData} heading={"Employees"} />
            </SimpleGrid>
          ) : (
            <Center justifyContent="center">
              <div className="loader">
                <div className="cover"></div>
              </div>
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default AdminDashboard;



