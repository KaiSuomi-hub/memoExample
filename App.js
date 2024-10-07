import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { TextInput } from "react-native-web";
import Tasks from "./components/Tasks";

/**
 * Main application component for managing a todo list.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 *
 * @hooks
 * @useState {Array} tasks - The list of tasks.
 * @useState {string} search - The current search input.
 * @useMemo {Array} items - Filtered tasks based on the search input.
 * @useCallback {Function} add - Function to add a new task to the list.
 *
 * @example
 * // To use the App component:
 * <App />
 */
export default function App() {
    const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

    const items = useMemo(
        () =>
            search.length > 0
                ? tasks.filter((task) => task.description.startsWith(search))
                : tasks,
        [search, tasks]
    );
    //The useMemo hook is used to memoize a value, ensuring that the computation is only performed
    //when one of the dependencies changes.In this case,
    //the dependencies are search and tasks.
    console.log("Rendering App");

    const add = useCallback(
        (description) => {
        const id = tasks.length + 1;
        // tempTasks is a new array that includes the existing tasks and the new task.
        // It's in use for debugging reasons, i.e. if we would have a large path of different variables the temp failing eases the debugging.
            const tempTasks = [...tasks, { key: id, description: description }];
            setTasks(tempTasks);
        },
        [tasks]
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Todo list</Text>
            <TextInput
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder="Search"
            />
            <Tasks tasks={items} add={add} />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
});
