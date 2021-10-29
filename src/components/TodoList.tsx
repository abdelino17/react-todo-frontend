import { useEffect, useState, useCallback } from "react"
import { Tabs, Layout, Row, Col, message } from 'antd'
import TodoTab from "./TodoTab"
import TodoForm from "./TodoForm"
import './TodoList.css'
import { createTodo, deleteTodo, loadTodos, updateTodo } from '../services/todoService'
import Todo from "../types/Todo"

const { TabPane } = Tabs
const { Content } = Layout

const TodoList = () => {
    const [refreshing, setRefreshing] = useState(false)
    const [todos, setTodos] = useState([])
    const [activeTodos, setActiveTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])

    const refresh = () => {
        loadTodos()
            .then(json => {
                setTodos(json)
                setActiveTodos(json.filter((todo: Todo) => todo.completed === false))
                setCompletedTodos(json.filter((todo: Todo) => todo.completed === true))
            })
            .then(() => console.log('fetch completed'))
    }

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        let data = await loadTodos()
        setTodos(data)
        setActiveTodos(data.filter((todo: Todo) => todo.completed === false))
        setCompletedTodos(data.filter((todo: Todo) => todo.completed === true))
        console.log("Refresh state", refreshing)
        setRefreshing(false)
    }, [ refreshing ]);

    useEffect(() => {
        refresh()
    }, [ onRefresh ])

    const handleFormSubmit = (todo: Todo) => {
        console.log('Todo to create', todo);
        createTodo(todo).then(onRefresh())
        message.success('Todo added!')
    }

    const handleRemoveTodo = (todo: Todo) => {
        console.log('Todo to remove', todo);
        deleteTodo(todo.id).then(onRefresh())
        message.warn('Todo removed!')
    }

    const handleToggleTodoStatus = (todo: Todo) => {
        todo.completed = !todo.completed
        updateTodo(todo).then(onRefresh())
        message.info('Todo status updated!')
    }

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px'}}>
                <div className="todoList">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>ABTech Todos</h1>
                            <TodoForm onFormSubmit={handleFormSubmit} />
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TodoTab todos={todos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}></TodoTab>
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TodoTab todos={activeTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}></TodoTab>
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TodoTab todos={completedTodos} onTodoToggle={handleToggleTodoStatus} onTodoRemoval={handleRemoveTodo}></TodoTab>
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}

export default TodoList