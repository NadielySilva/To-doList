import React, { Component } from 'react';

export default class Todo extends Component {

  state = {
    task:"",
    taskList: []
  };

  //Lida com mudanças acontecidas no evento 'e'. Neste caso, muda o estado de 'task' para que este estado tenha o valor como alvo.
  handleChange = (e) => {
    this.setState({
      task: e.target.value
    })
  };

  //função 'add' primeiramente desestrutura os states 'task' e 'taskList'. Depois, se o state 'task' for estritamente diferente de "", o estado de 'taskList' será alterado para uma concatenação do estado 'task' e uma identidade 'id' dada por Date.now. A condicional 'if' ainda limpa o input 'task'.
  add = (e) => {
    let {task, taskList} = this.state
    if (task !== ""){
      this.setState({
        taskList: taskList.concat({
          task: task,
          id: Date.now()
        }),        
      task: ""
      })
    };
  };

  //função 'remove' tem como parâmetro a identidade ('id') dos itens da 'taskList'. Na primeira linha da arrow function é feita a desestruturação do state 'taskList'. Em seguida o estado é modificado para que taskList seja filtrado para deixar todos os itens, EXCETO os itens extritamente diferentes da id do item.
  remove = (id) => {
    let { taskList } = this.state;
    this.setState({
      taskList: taskList.filter((item) => item.id !== id)
    })
  };

  render(){
    //Desestruturação
    let {add, remove, handleChange} = this;
    let {task, taskList,} = this.state;

    return(

      <GlobalStyle>
        {/* //atributo onSubmit está previnindo um evento padrão. Nesse caso, previne a página de ser recarregada a cada envio ('submit'). */}
        <form onSubmit={(e) => e.preventDefault()}>
          {/* entrada define 'task' como valor e quando há mudança usa essa valor como alvo*/}
          <input value={task} onChange={handleChange} placeholder='Type the task here'  ></input>

          {/* Quando clicado, o botão usa a função 'add' para adicionar tarefas à lista de tarefas */}
          <button onClick={add}>Add task</button>

          {/* 'div' evita bug onde o nome da tarefa é apagado mas não o botão de apagar e o indicador de lista não ordenada  */}
          <div>

            {/* Mapeia os itens e os organiza em uma lista não ordenada seguida de botão de apagar */}
            {taskList.map((item) => 
              <ul>
                <li>
                  {item.task}
                  <button onClick={() => remove(item.id)}>Remove task</button>
                </li>
              </ul>
            )}
          </div>  
        </form>
      </GlobalStyle>
    )
  }
}