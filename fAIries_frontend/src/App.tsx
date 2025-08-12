import SkillComponent from './Components/Skills/SkillComponent'
import type { SkillInterface } from './Components/Skills/SkillInterface'
import SkillGalleryComponent from './Components/Skills/SkillGalleryComponent'
import TaskComponent from './Components/Skills/Tasks/TaskComponent'
import type { TaskInterface } from './Components/Skills/Tasks/TaskInterface'
import dummySkills from './Testing/DummyData'
import JournalComponent from './Components/Journal/JournalEntryComponent'
import HomepageComponent from './Components/Homepage/HomepageComponent'
import { UserProvider } from './Context/UserContext'
import SkillManagerComponent from './Components/Skills/SkillManager/SkillManagerComponent'

function App() {

  return (
    <>
    <UserProvider>
      <HomepageComponent/>
      {/* <SkillManagerComponent/> */}
    </UserProvider>
    </>
  )
}

export default App
