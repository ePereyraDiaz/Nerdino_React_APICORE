import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

import { api } from '../utilities/api'

function countRemainingTasks(todoList) {
    return todoList.tasks.filter(t => !t.done).length;
}

function CreateTodoListModal(props) {
    const { onNewList } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const toggle = () => setIsOpen(!isOpen);

    const { mutate } = useMutation(todoList => {
        return api.post(`todolists`, todoList);
    });

    function addNewTodoList() {
        mutate({ name }, {
            onSuccess: () => {
                onNewList && onNewList();
                toggle();
            }
        });
    }

    return (
        <>
            <button className="btn btn-default float-right" onClick={toggle}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>New ToDo List</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={() => addNewTodoList()}>Create</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

function CreateTodoTaskModal(props) {
    const id = props.id;
    const onNewTask = props.onNewTask;

    const [ isOpen, setIsOpen] = useState(false);
    const [ title, setTitle] = useState('');

    const toggle = () => setIsOpen(!isOpen);

    const { mutate } = useMutation(todoTask => {
        return api.post(`TodoLists/${id}/todotasks`, todoTask);
    });

    function addNewTodoTask() {
        mutate({ title }, {
            onSuccess: () => {
                onNewTask && onNewTask();
                toggle();
            }
        });
    }

    return (
        <>
            <button className="btn btn-default float-right" onClick={toggle}>
                Add <FontAwesomeIcon icon={faPlus} />
            </button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>New Task</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" id="Title" value={title} onChange={e => setTitle(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="default" onClick={toggle}>Cancel</Button>
                    <Button color="primary" onClick={() => addNewTodoTask()}>Create</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

function TodoLists(props) {
    const { todoLists, onNewList, onNewTask } = props;
    const [ selectedTodoList, setSelectedTodoList] = useState(todoLists[0]);

    const objToDo = todoLists.find(obj => {
        return obj.id === selectedTodoList.id;
    });

    if(objToDo && objToDo.tasks.length > selectedTodoList.tasks.length)
    {
        setSelectedTodoList(objToDo);
    }

    const { mutate } = useMutation(todoTask => {
        if (todoTask.done) {
            return api.delete(`todotasks/${todoTask.id}/done`);
        }
        else {
            return api.put(`todotasks/${todoTask.id}/done`);
        }
    });

    function setTaskCompleted(todoTask) {
        mutate(todoTask, {
            onSuccess: () => {
                todoTask.done = !todoTask.done;
            }
        });
    }

    return (
        <div className="row">
            <div className="col-sm-4">
                <div className="clearfix">
                    <h2 className="float-left">Lists</h2>
                    <CreateTodoListModal onNewList={onNewList} />
                </div>
                <ul className="list-group">
                    {todoLists && todoLists.map(todoList =>
                        <li key={todoList.id} className={classNames("list-group-item", { active: selectedTodoList.id === todoList.id })} onClick={() => setSelectedTodoList(todoList)}>
                            <span className="float-left">{todoList.name}</span>
                            <span className="badge badge-light float-right">{countRemainingTasks(todoList)} / {todoList.tasks.length}</span>
                        </li>
                    )}
                </ul>
            </div>
            <div className="col-sm-8">
                <div className="clearfix">
                    <h2 className="float-left">{selectedTodoList.name}</h2>
                    <CreateTodoTaskModal onNewTask={onNewTask} id={selectedTodoList.id}/>
                </div>
                <ul className="list-group">
                    {selectedTodoList && selectedTodoList.tasks && selectedTodoList.tasks.map(todoTask =>
                        <li key={todoTask.id} className="list-group-item">
                            <input type="checkbox" checked={todoTask.done} onChange={() => setTaskCompleted(todoTask)} />
                            <span className={classNames("ml-2", { done: todoTask.done })}>{todoTask.title}</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

function Todos() {
    const { isLoading, isError, isSuccess, data, refetch } = useQuery("todolists", async () => {
        return api.get("todolists");
    });

    return (
        <div>
            <h1>ToDos</h1>
            <>
                {isLoading && <p><em>Loading...</em></p>}
                {isError && <p><em>Unable to retrieve data. Try again later.</em></p>}
                {isSuccess && <TodoLists todoLists={data} 
                onNewList={() => refetch()}
                onNewTask={() => refetch()}/>}
            </>
        </div>
    );
}

export default Todos;
