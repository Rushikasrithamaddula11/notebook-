import React, { useState, useEffect } from 'react';
import './App.css';
import { MdDeleteForever, MdEdit } from "react-icons/md";

function App() {
  const [allNotes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load notes from local storage when the component mounts
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notelist'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Function to add or update a note
  const handleAddOrUpdateNote = () => {
    let now = new Date();
    let dd = String(now.getDate()).padStart(2, '0');
    let mm = String(now.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = now.getFullYear();
    let addedOn = `${dd}-${mm}-${yyyy}`; // Corrected template literal syntax

    let updatedNoteArr = [...allNotes];

    if (editIndex !== null) {
      // Update existing note
      updatedNoteArr[editIndex] = { note: newNote, addedOn: addedOn };
      setEditIndex(null);
    } else {
      // Add new note
      let newNoteItem = { note: newNote, addedOn: addedOn };
      updatedNoteArr.push(newNoteItem);
    }

    setNotes(updatedNoteArr);
    localStorage.setItem('notelist', JSON.stringify(updatedNoteArr));
    setNewNote(""); // Clear input after adding or updating
  };

  // Function to delete a note
  const handleDeleteNote = (index) => {
    let reducedNotes = [...allNotes];
    reducedNotes.splice(index, 1);

    localStorage.setItem('notelist', JSON.stringify(reducedNotes));
    setNotes(reducedNotes);
  };

  // Function to edit a note
  const handleEditNote = (index) => {
    setNewNote(allNotes[index].note);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>MY NOTES</h1>

      <div className="note-wrapper">
        <div className="note-input">
          <div className="note-input-item">
            <label>Note</label>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="What's the note?"
            />
          </div>
          <button type="button" onClick={handleAddOrUpdateNote} className="primaryBtn">
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <div className="note-list">
          {allNotes.map((item, index) => (
            <div className="note-list-item" key={index}>
              <div>
                <h3>{item.note}</h3>
                <p><small>Added on: {item.addedOn}</small></p>
              </div>
              <div className="icons">
                <MdEdit className='icon' onClick={() => handleEditNote(index)} title="Edit?" />
                <MdDeleteForever className='icon' onClick={() => handleDeleteNote(index)} title="Delete?" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
