import { List, Tag, Tooltip, Switch, Popconfirm, Button } from 'antd'
import { CheckOutlined, CloseOutlined } from "@ant-design/icons"
import Todo from '../types/Todo'


const TodoItem = ({ todo, onTodoRemoval, onTodoToggle }: { todo: Todo, onTodoRemoval: (todo: Todo) => void,  onTodoToggle: (todo: Todo) => void }) => {
    return (
        <List.Item
            actions={ [
                <Tooltip
                    title={todo.completed ? 'Mark as uncompleted': 'Mark as completed'}
                >
                    <Switch 
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => onTodoToggle(todo)}
                        defaultChecked={todo.completed}
                    />
                </Tooltip>,
                <Popconfirm
                    title={'Are you sure you want to delete?'}
                    onConfirm={() => {
                        onTodoRemoval(todo)
                    }}
                >
                    <Button className="remove-todo-button" type="primary" danger>
                        X
                    </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={todo.id}
        >
            <div className="todo-item">
                <Tag color={ todo.completed ? 'cyan' : 'red' } className="todo-tag">
                    { todo.title }
                </Tag>
            </div>
        </List.Item>
    )
}

export default TodoItem