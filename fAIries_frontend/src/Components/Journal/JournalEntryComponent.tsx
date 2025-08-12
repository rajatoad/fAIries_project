import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import type { JournalEntryInterface } from './JournalInterface';
import { UserContext } from '../../Context/UserContext';


function JournalComponent() {

    const userContext = useContext(UserContext);
    const userData = userContext?.userData;


    // let url = `http://localhost:3000/journals/`;
    let [journalState, setJournalState] = useState<JournalEntryInterface>({
        title: '',
        content: '',
        journal_id: undefined,
    });

    useEffect(() => {
      if(journalState.journal_id) return;
      axios.get(`http://localhost:3000/journals/${userData?.user_id}`)
        .then((checkJournalResponse) => { 
              setJournalState({...journalState, journal_id: checkJournalResponse.data.journal_id});
          }
        )
        .catch((error) => {
          console.error('Error checking journal:', error);
          // Handle error (e.g., show error message)
        });
    }, []);

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

    async function submitJournal() {
        try {
          console.log(journalState);
          const response = await axios.put(`http://localhost:3000/journals/entry`, journalState);
            // Optionally, reset the journal state after submission
            setJournalState({
                ...journalState,
                title: '',
                content: ''
            });
        } catch (error) {
            console.error('Error submitting journal entry:', error);
            // Handle error (e.g., show error message)
        }
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