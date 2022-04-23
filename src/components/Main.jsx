import React, { useState, useEffect } from 'react';
import { MdDelete, MdModeEditOutline, MdPlaylistAdd } from 'react-icons/md';
import './Main.css';

function Main() {
  const [taks, setTaks] = useState('');
  const [listTaks, setListTaks] = useState(() => {
    const saved = localStorage.getItem('list');
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [checkNum, setCheckNum] = useState(-1);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(listTaks));
  }, [listTaks]);
  // componentDiUpdate(prevProps, prevState) {
  //   if(listTaks === prevState.listTaks) return;
  //   localStorage.setItem('tarefas', JSON.stringify(listTaks));
  // }
  const handleSubmit = () => {
    if (listTaks.indexOf(taks) !== -1) return;
    if (checkNum === -1) {
      setListTaks((oldArray) => [...oldArray, taks.trim()]);
      setTaks('');
    } else {
      const copyArray = listTaks;
      copyArray[checkNum] = taks;
      setListTaks(copyArray);
      localStorage.setItem('list', JSON.stringify(listTaks));
      setTaks('');
      setCheckNum(-1);
    }
  };

  function handleEdit(index) {
    setCheckNum(index);
    setTaks(listTaks[index]);
  }

  function handleDelete(indexArray) {
    const auxListTaks = [...listTaks];
    auxListTaks.splice(indexArray, 1);
    setListTaks(auxListTaks);
  }

  return (
    <div className="main">
      <h1>Lista de tarefas</h1>
      <form action="#" className="form">
        <input
          type="text"
          placeholder="Digite a nova tarefa"
          name="tarefas"
          id="input-taks"
          len
          minLength={5}
          maxLength={50}
          value={taks}
          className="form-input"
          onChange={(event) => setTaks(event.target.value)}
        />
        <button type="button" className="form-button" onClick={handleSubmit}>
          <MdPlaylistAdd size={32} />
        </button>
      </form>

      {Object.keys(listTaks).length > 0 && (
        <main className="contents">
          <ul className="contents-list">
            {listTaks.map((array, index) => (
              <li className="contents-list-item" key={array}>
                {array}
                <div className="contents-list-item-icons">
                  <button
                    type="button"
                    className="contents-list-item-icons-edit"
                    onClick={() => handleEdit(index)}
                  >
                    <MdModeEditOutline size={21} />
                  </button>
                  <button
                    type="button"
                    className="contents-list-item-icons-delete"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </main>
      )}
    </div>
  );
}

export default Main;
