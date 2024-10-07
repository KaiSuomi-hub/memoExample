import { StyleSheet, View, Text, Button } from "react-native";
import React, { useState, memo } from "react";
import { FlatList, TextInput } from "react-native-web";

/**
 * Tasks component for displaying and adding tasks.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Array} props.tasks - The list of tasks to display.
 * @param {Function} props.add - Function to add a new task.
 * @returns {JSX.Element} The rendered Tasks component.
 */
const Tasks = ({ tasks, add }) => {
    const [description, setDescription] = useState("");
    console.log("Rendering Tasks");
    const save = () => {
        add(description);
        setDescription("");
    };

    return (
        <div>
            <View style={styles.form}>
                <TextInput
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    placeholder="Add"
                />

                <Button style={styles.button} title="Save" onPress={save} />

                <FlatList
                    style={styles.list}
                    data={tasks}
                    renderItem={({ item }) => <Text>{item.description}</Text>}
                />
            </View>
        </div>
    );
};

const styles = StyleSheet.create({
    form: {
        flexDirection: "column",
        justifyContent: "space-between",
        margin: 20,
    },
    button: {
        width: 100,
        height: 40,
        backgroundColor: "blue",
        color: "white",
        borderRadius: 15,
        marginTop: 10,
        padding: 40,
    },
    list: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 15,
        padding: 10,
    },
});

export default memo(Tasks);
