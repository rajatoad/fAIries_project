import SkillComponent from './Components/Skills/SkillComponent'
import type { SkillInterface } from './Components/Skills/SkillInterface'
import SkillGalleryComponent from './Components/Skills/SkillGalleryComponent'
import TaskComponent from './Components/Skills/Tasks/TaskComponent'
import type { TaskInterface } from './Components/Skills/Tasks/TaskInterface'
import dummySkills from './Testing/DummyData'
import JournalComponent from './Components/Journal/JournalComponent'

function App() {

  return (
    <>
    {/* <SkillGalleryComponent skills={dummySkills}/> */}
    {/* <TaskComponent task={task}/> */}
    <JournalComponent/>
    </>
  )
}

export default App
