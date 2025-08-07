import axios from 'axios';
import React, { useContext, useState } from 'react'
import type { JournalEntryInterface } from './JournalInterface';
import { UserContext } from '../../Context/UserContext';


function JournalComponent() {

    const userContext = useContext(UserContext);
    const userData = userContext?.userData;

    let url = `http://localhost:3000/journals/`;
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

    async function submitJournal() {
        try {

          if(!userData?.journal_id){
            try{
              const createJournalResponse = await axios.post(`http://localhost:3000/journals`, {user_id: userData?.user_id});
              if(userContext?.setUserData){
                userContext.setUserData({
                  user_id: userData?.user_id ?? '',
                  username: userData?.username ?? '',
                  journal_id: createJournalResponse.data.journal_id
                });
              }
            }catch(error){
              console.error('Error creating journal:', error);
              return;
            }
          }
          
          const response = await axios.post(url, journalState);
            
            // Optionally, reset the journal state after submission
            setJournalState({
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