import React, { useEffect, useState } from "react";
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AddTask from "./Add";
import EditTask from "./Edit";
import ShowTask from "./Show";

const Drawers = ({
    isOpen,
    onClose,
    drawerType,
    handleAddUpdateDeleteItem,
    data,
    role
}) => {
    const renderDrawer = () => {
        switch (drawerType) {
            case "addNew":
                return (
                    <AddTask onClose={onClose} handleAddUpdateDeleteItem={handleAddUpdateDeleteItem} />
                )
            case "edit":
                return (
                    <EditTask
                        selectedItem={data}
                        onClose={onClose}
                        handleAddUpdateDeleteItem={handleAddUpdateDeleteItem}
                    />
                );
            case "show":
                return (
                    <ShowTask
                        selectedItem={data}
                        onClose={onClose}
                        handleAddUpdateDeleteItem={handleAddUpdateDeleteItem}
                        role={role}
                    />
                );
            default:
                return null;
        }

    };

    return (
        <Drawer isOpen={isOpen} placement="right" size='lg' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        onClick={onClose}
                        variant="ghost"
                        alignItems="center"
                        justifyContent="center"
                    />
                    {drawerType === "addNew" && "Add New Task"} {/* Updated text */}
                    {drawerType === "edit" && "Edit Task Details"} {/* Updated text */}
                </DrawerHeader>
                <DrawerBody>{renderDrawer()}</DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Drawers;
