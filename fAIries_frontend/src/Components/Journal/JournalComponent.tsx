import axios from 'axios';
import React, { useState } from 'react'

interface JournalEntryInterface {
  title: string;
  content: string;
}

function JournalComponent() {

    let url = `http://localhost:3000/journal`;

    let [journalState, setJournalState] = useState<JournalEntryInterface>({
        title: '',
        content: ''
    });

    function handleInputChange(event: any){
        setJournalState({
            ...journalState,
            content: event.target.value
        });
    }
    function handleTitleChange(event: any){
        setJournalState({
            ...journalState,
            title: event.target.value
        });
    }

    function submitJournal() {
      axios.post(url, journalState).then((response) => {
        console.log('Journal entry submitted:', response.data);
        setJournalState({ title: '', content: '' }); // Reset the form after submission
      }).catch((error) => {
        console.error('Error submitting journal entry:', error);
      });
    }

  return (
    <>
        <h1>Journal Entry</h1>
        <input type="text" placeholder="Title" value={journalState?.title} onChange={handleTitleChange}/>
        <br />
        <textarea
            value={journalState?.content || ''}
            onChange={handleInputChange}
            rows={10} // Makes it a large text box
            cols={50}
            placeholder="Enter your journal entry here..."
          />
        <button onClick={submitJournal}>Submit</button>
    </>
  )
}

export default JournalComponent