import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import API, { graphqlOperation } from "@aws-amplify/api";

// define mutation
const createTask = `
mutation($name: String!, $description: String) {
  createTask(input: {
    name: $name
    description: $description
}) {
  id
  name
  description
}
}`;

// define query
const listTasks = `
  query {
    listTasks {
      items {
        id
        name
        description
      }
    }
 }
`;

class HomeScreen extends React.Component {
  state = { name: "", description: "", tasks: [] };
  async componentDidMount() {
    try {
      const graphqldata = await API.graphql(graphqlOperation(listTasks));
      console.log("graphqldata:", graphqldata);
      this.setState({ tasks: graphqldata.data.listTasks.items });
    } catch (err) {
      console.log("error: ", err);
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  createTask = async () => {
    const task = this.state;
    if (task.name === "" || task.description === "") return;
    const tasks = [...this.state.tasks, task];
    this.setState({ tasks, name: "", description: "" });
    try {
      await API.graphql(graphqlOperation(createTask, task));
      console.log("Task successfully created.");
    } catch (err) {
      console.log("error creating task...", err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText("name", val)}
          placeholder="Task Name"
          value={this.state.name}
        />
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText("description", val)}
          placeholder="Task Description"
          value={this.state.description}
        />
        <Button onPress={this.createTask} title="Add task" />
        {this.state.tasks.map((task, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{task.name}</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>
        ))}
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginVertical: 10
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10
  },
  name: { fontSize: 16 },
  description: { color: "rgba(0, 0, 0, .5)" },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingTop: 50
  }
});
