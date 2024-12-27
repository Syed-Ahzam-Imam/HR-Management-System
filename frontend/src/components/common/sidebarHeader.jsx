import React from 'react';
import { IconButton, Avatar, Box, CloseButton, Flex, HStack, VStack, Icon, useColorModeValue, Text, Drawer, DrawerContent, useDisclosure, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Image, useColorMode, Tooltip } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

import {
  FiHome,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiUser,
  FiFile,
  FiUserCheck,
  FiMessageSquare,
  FiDollarSign,
} from "react-icons/fi";

import { BsListTask } from "react-icons/bs";

import { ChatIcon } from "@chakra-ui/icons";
import { BASE_URL, user } from '../../API/constants';

const LogoBlack = require("../../images/FYP Logo sidebar.png");
const LogoWhite = require("../../images/FYP Logo sidebar.png");

let department = ""; // Initialize the department variable

let role = '';
let userId = 0;

const currentUser = JSON.parse(localStorage.getItem("user"));


if (currentUser) {
  role = currentUser.role;
  userId = currentUser.userId
}


let LinkItems = [
  { name: "Dashboard", icon: FiHome, to: "/dashboard" },
  { name: "Employee", icon: FiUser, to: "/employees" },
  { name: "Attendance", icon: FiUserCheck, to: `/attendance/user/${userId}` },
  { name: "Attendances", icon: FiUserCheck, to: "/attendance" },
  { name: "Tasks", icon: BsListTask, to: "/task" },
  { name: "Resumes", icon: FiFile, to: "/resume" },
  { name: "Upload Resume", icon: FiFile, to: "/resumeupload" },
  { name: "Chat", icon: FiMessageSquare, to: "/chat" },
  { name: "Profile", icon: FiUser, to: "/profile" },
];


if (role) {
  if (role !== "admin") {
    LinkItems = LinkItems.filter(
      (item) =>
        item.name === "Dashboard" ||
        item.name === "Attendance" ||
        item.name === "Tasks" ||
        item.name === "Chat" ||
        item.name === "Profile" ||
        item.name === "Settings"
      // item.name === "Payment Mode"
    );
  }
  else {

    const itemsToExclude = ["Attendance"]
    LinkItems = LinkItems.filter(item => !itemsToExclude.includes(item.name));
  }
}


const handleLogout = () => {
  localStorage.clear();
  window.location.href = '/';
};


const SidebarContent = ({ sideBarWidth, handleSidebarWidth, onClose, ...rest }) => {
  const { colorMode } = useColorMode();
  const logo = colorMode === "light" ? LogoBlack : LogoWhite;


  return (
    <Box
      transition=".3s ease-in-out"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={sideBarWidth === "small" ? "60px" : { base: 'full', lg: 60 }}
      pos="fixed"
      h="full"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          display: 'none', // Hide scrollbar for WebKit-based browsers
        },
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        '-ms-overflow-style': 'none', // Hide scrollbar for IE and Edge
      }}
      overflowX="hidden"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx={2} justifyContent="space-between" >
        <IconButton
          icon={sideBarWidth === "small" ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          variant="ghost"
          colorScheme='cyan'
          display={{ base: 'none', lg: 'flex' }}
          onClick={handleSidebarWidth}
        />
        <Image
          src={logo}
          // boxSize="44px"
          w={150}
          loading="lazy"
          display={sideBarWidth === "small" ? "none" : "block"}
        />
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link to={link.to} >

          <NavItem key={link.name} to={link.to} sideBarWidth={sideBarWidth} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, sideBarWidth, ...rest }) => {
  const location = useLocation(); // Get the current location

  // Determine if the current link matches the current route
  const isActive = location.pathname === to;
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        // mx="4"
        ml={2}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? "cyan.400" : "none"}
        color={isActive ? "white" : "inherit"}
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Tooltip
            hasArrow
            shouldWrapChildren
            label={children}
            placement="right"
            bg="cyan.400"
            display={sideBarWidth === "small" ? "flex" : "none"}
          >
            <Icon
              mr="4"
              fontSize="16"
              as={icon}
            />
          </Tooltip>
        )}
        <Box display={sideBarWidth === "small" ? "none" : "block"}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, sideBarWidth, handleColorModeToggle, ...rest }) => {
  const { colorMode } = useColorMode();
  const logo = colorMode === "light" ? LogoBlack : LogoWhite;
  return (
    <Flex
      // ml={{ base: 0, lg: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', lg: 'space-between' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', lg: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex >
        <Image
          src={logo}
          // boxSize="44px"
          w={150}
          loading="lazy"
          ml={sideBarWidth === "large" ? "250px" : "70px"}
          display={{
            base: "none",
            lg: sideBarWidth === "small" ? "flex" : "none",
          }}
          transition={"margin 0.3s ease-in-out"}
        />
      </Flex>



      <HStack spacing={{ base: '0', md: '6' }}>
        <Link to="/chat">
          <IconButton
            icon={<ChatIcon />}
            aria-label="Go to Chat"
            style={{ backgroundColor: "#fff" }}
            fontSize="xl"
          />
        </Link>

        <Flex alignItems={'center'}>

          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={`${BASE_URL}/uploads/profile/${user?.profilePicture}`}
                  name={user?.fname || ""}
                  bg={useColorModeValue("gray.200", "gray.600")}
                  color={useColorModeValue("black", "white")}
                />
                <VStack display={{ base: 'none', md: 'flex' }} alignItems="flex-start" spacing="1px" ml="2">
                  <Text fontSize="sm" fontWeight={'bold'}>{user?.fname}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user?.role}
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>
                <Link to="/profile">Profile</Link>
              </MenuItem>
              <MenuItem><Link to="/settings">Settings</Link></MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SideBar = ({ sideBarWidth, handleSidebarWidth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode(); // Fetch color mode and its toggle function

  const handleColorModeToggle = () => {
    // Toggle color mode based on the current colorMode
    toggleColorMode();
  };

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent sideBarWidth={sideBarWidth} handleSidebarWidth={handleSidebarWidth} onClose={() => onClose} display={{ base: 'none', md: 'none', lg: "block" }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="sm"
      >
        <DrawerContent>
          <SidebarContent sideBarWidth="large" onClose={onClose} onClick={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav sideBarWidth={sideBarWidth} onOpen={onOpen} handleColorModeToggle={handleColorModeToggle} onClose={onClose} />

    </Box>
  );
};

export default SideBar;
