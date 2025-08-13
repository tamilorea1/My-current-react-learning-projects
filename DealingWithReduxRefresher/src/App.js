import Counter from './components/Counter';
import { Fragment } from 'react/jsx-runtime';
import Header from './components/Header'
import Auth from './components/Auth'
import UserProfile from './components/UserProfile'
import { useSelector } from 'react-redux';

function App() {
  const showAuth = useSelector(state => state.auth.isAuthenticated)

  return (
    <Fragment>
      <Header/>
      {!showAuth && <Auth/>}
       {showAuth && <UserProfile/>}
      <Counter />
    </Fragment>
    
  );
}

export default App;
