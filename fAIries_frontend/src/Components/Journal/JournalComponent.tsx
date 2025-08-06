import React, { useState } from 'react'

function JournalComponent() {
    let [journalState, setJournalState] = useState<string | undefined>(undefined);

    function handleInputChange(event: any){
        setJournalState(event.target.value);
    }

  return (
    <>
        <h1>Journal Entry</h1>
        <textarea
            value={journalState}
            onChange={handleInputChange}
            rows={10} // Makes it a large text box
            cols={50}
            placeholder="Enter your journal entry here..."
          />
        <button onClick={() => console.log(journalState)}>Submit</button>
    </>
  )
}

export default JournalComponent