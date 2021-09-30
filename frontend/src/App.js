import { useEffect, useState } from 'react'
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import AllPosts from './components/AllPosts'
import NewPost from './components/NewPost'
import Profile from './components/Profile'
import Header from './components/Header'
import Deals from './components/Deals'
import NewThread from './components/NewThread'
import AllThreads from './components/AllThreads'
import NewComment from './components/NewComment'
import AllComments from './components/AllComments'
import TheContext from './TheContext';
import actions from './api';


function App() {

  const [user, setUser] = useState({})

  useEffect(async () => {
    getUser()
  }, [])


  const getUser = async () => {
    let res = await actions.getUser()
    setUser(res?.data)
  }

  return (
    <TheContext.Provider value={{ user, setUser, getUser }}>
      <Header />
      <Switch>
        <Route exact path="/" render={(props) => <Home user={user} {...props} />} />
        <Route exact path="/all-posts" render={(props) => <AllPosts user={user} {...props} />} />
        <Route exact path="/new-post" render={(props) => <NewPost user={user} {...props} />} />
        <Route exact path="/profile" render={(props) => <Profile user={user} {...props} />} />
       
        <Route exact path="/Deals" render={(props) => 
        <Deals user={user} {...props} />} /> 
        <Route exact path="/new-thread" render={(props) => 
        <NewThread user={user} {...props} />} /> 
        <Route exact path="/all-threads" render={(props) => 
        <AllThreads user={user} {...props} />} /> 
        <Route exact path="/thread/:threadId" render={(props) => 
        <AllComments user={user} {...props} />} /> 
        {/* <Route exact path="/comment/:text" render={(props) => 
        <NewComment user={user} {...props} />} />  */}
      </Switch>

    </TheContext.Provider>
  );
}

export default App;
