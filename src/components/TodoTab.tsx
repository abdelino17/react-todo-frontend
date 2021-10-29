import { useEffect } from "react";
import { Tabs, Layout, Row, Col, List } from 'antd'
import TodoItem from './TodoItem'
import Todo from "../types/Todo";

const TodoTab = ({ todos, onTodoRemoval, onTodoToggle }: { todos: Todo[], onTodoRemoval: (todo: Todo) => void,  onTodoToggle: (todo: Todo) => void }) => {
    return(
        <>
            <List 
                locale={{ emptyText: "There's nothing to do :(", }}
                dataSource={todos}
                renderItem={(todo) => (
                    <TodoItem
                        todo={todo}
                        onTodoRemoval={onTodoRemoval}
                        onTodoToggle={onTodoToggle}
                    />
                )}
                pagination={{
                    position: 'bottom',
                    pageSize: 10
                }}
            />
        </>
    )
}

export default TodoTab