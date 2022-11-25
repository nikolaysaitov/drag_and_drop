import React, { useState } from 'react';
import './App.css';

function App() {
  const [boards, setBoards] = useState([
    {id: 1, title: "Сделать", items: [{id: 1, title: "Пойти в магазин"}, {id: 2, title: "Выкинуть мусор"}, {id: 3, title: "Покушать"}]},
    {id: 2, title: "Рефакторинг", items: [{id: 4, title: "Поработать"}, {id: 5, title: "Погулять"}, {id: 6, title: "Поспать"}]},
    {id: 3, title: "Встреча", items: [{id: 7, title: "Реакт"}, {id: 8, title: "Redux"}, {id: 9, title: "JS"}]},
  ]);






  return (
    <div className="app">
      {boards.map(board => 
        <div className='board'>
          <div className='board__tittle'>{board.title}</div>
         {board.items.map(item => 
          <div className='item'>{item.title}</div>)}
        </div>
        )}
    </div>
  );
}

export default App;
